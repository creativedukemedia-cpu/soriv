import { useCallback, useState } from "react";
import { detectCrisis, CRISIS_MESSAGE } from "./crisis.ts";
import { isTextInputEnabled } from "./flags.ts";
import {
  NO_MATCH_REPLY,
  capTextInput,
  matchQueryToNode,
} from "./match.ts";
import {
  LOCAL_SERVICES_ASK_ID,
  LOCAL_SERVICES_RESULTS_ID,
  filterResourcesByLocation,
  formatLocationResults,
  isValidLocationQuery,
  LOCATION_INVALID_REPLY,
} from "./resources.ts";
import {
  ROOT_ID,
  getNode,
  type ChatNode,
  type ChatOption,
} from "./tree.ts";

/** Shown when the visitor hits a pathway with no client-approved content. */
export const PLACEHOLDER_REPLY =
  "I do not have information on that yet. Please call 988 or SAMHSA at 1-800-662-4357.";

export { NO_MATCH_REPLY };

export type ChatRole = "assistant" | "user";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  /** Tree node that produced this assistant message, if any. */
  nodeId?: string;
  /** True when this assistant turn is the fixed crisis response. */
  isCrisis?: boolean;
};

export type ChatFlowState = {
  history: ChatMessage[];
  currentNodeId: string;
  /** Visited node ids from root through current (for back). */
  path: string[];
  inCrisis: boolean;
};

export type ChatFlowApi = {
  history: ChatMessage[];
  currentNode: ChatNode;
  currentNodeId: string;
  inCrisis: boolean;
  options: ChatOption[];
  /** True when the visitor should enter county or ZIP only. */
  awaitingLocation: boolean;
  /**
   * Optional general typed input (VITE_ENABLE_TEXT_INPUT).
   * Location ask still uses its own field when active.
   */
  textInputEnabled: boolean;
  /**
   * Select a button option. `optionId` is the option's `next` node id
   * from the current node's options.
   */
  select: (optionId: string) => void;
  /**
   * Free text: crisis check runs first; never reaches a model.
   * On the local-services ask node, accepts county or ZIP only.
   * When text input is enabled, unmatched text uses keyword match-and-return.
   */
  submitText: (text: string) => void;
  back: () => void;
  restart: () => void;
};

export type SubmitTextOptions = {
  /** Override env flag (tests). */
  enableTextMatch?: boolean;
};

type IdSeq = { n: number };

function nextId(seq: IdSeq): string {
  seq.n += 1;
  return `msg-${seq.n}`;
}

function requireNode(id: string): ChatNode {
  const node = getNode(id);
  if (!node) {
    throw new Error(`Unknown chat node: ${id}`);
  }
  return node;
}

function displayTextForNode(node: ChatNode): string {
  if (node.kind === "placeholder") {
    return PLACEHOLDER_REPLY;
  }
  return node.text;
}

function formatCrisisText(): string {
  return `${CRISIS_MESSAGE.headline}\n\n${CRISIS_MESSAGE.body}`;
}

export function createInitialState(seq: IdSeq = { n: 0 }): ChatFlowState {
  const root = requireNode(ROOT_ID);
  return {
    history: [
      {
        id: nextId(seq),
        role: "assistant",
        text: displayTextForNode(root),
        nodeId: root.id,
      },
    ],
    currentNodeId: ROOT_ID,
    path: [ROOT_ID],
    inCrisis: false,
  };
}

/**
 * Pure in-memory chat engine (no localStorage, cookies, or network).
 * `useChatFlow` wraps this for React. Prefer these helpers in tests.
 */
export function selectOption(
  state: ChatFlowState,
  optionId: string,
  seq: IdSeq,
): ChatFlowState {
  if (state.inCrisis) return state;

  const current = requireNode(state.currentNodeId);
  const option = current.options.find((o) => o.next === optionId);
  if (!option) return state;

  const nextNode = requireNode(option.next);

  return {
    history: [
      ...state.history,
      { id: nextId(seq), role: "user", text: option.label },
      {
        id: nextId(seq),
        role: "assistant",
        text: displayTextForNode(nextNode),
        nodeId: nextNode.id,
      },
    ],
    currentNodeId: nextNode.id,
    path: [...state.path, nextNode.id],
    inCrisis: false,
  };
}

function submitLocationLookup(
  state: ChatFlowState,
  trimmed: string,
  seq: IdSeq,
): ChatFlowState {
  if (!isValidLocationQuery(trimmed)) {
    return {
      ...state,
      history: [
        ...state.history,
        { id: nextId(seq), role: "user", text: trimmed },
        {
          id: nextId(seq),
          role: "assistant",
          text: LOCATION_INVALID_REPLY,
          nodeId: LOCAL_SERVICES_ASK_ID,
        },
      ],
    };
  }

  const lookup = filterResourcesByLocation(trimmed);
  const resultsNode = requireNode(LOCAL_SERVICES_RESULTS_ID);

  return {
    history: [
      ...state.history,
      { id: nextId(seq), role: "user", text: trimmed },
      {
        id: nextId(seq),
        role: "assistant",
        text: formatLocationResults(lookup),
        nodeId: resultsNode.id,
      },
    ],
    currentNodeId: resultsNode.id,
    path: [...state.path, resultsNode.id],
    inCrisis: false,
  };
}

function submitMatchedText(
  state: ChatFlowState,
  capped: string,
  seq: IdSeq,
): ChatFlowState {
  const match = matchQueryToNode(capped);

  if (match.nodeId) {
    const matched = requireNode(match.nodeId);
    return {
      history: [
        ...state.history,
        { id: nextId(seq), role: "user", text: capped },
        {
          id: nextId(seq),
          role: "assistant",
          text: displayTextForNode(matched),
          nodeId: matched.id,
        },
      ],
      currentNodeId: matched.id,
      path: [...state.path, matched.id],
      inCrisis: false,
    };
  }

  const root = requireNode(ROOT_ID);
  return {
    history: [
      ...state.history,
      { id: nextId(seq), role: "user", text: capped },
      {
        id: nextId(seq),
        role: "assistant",
        text: NO_MATCH_REPLY,
        nodeId: root.id,
      },
    ],
    currentNodeId: ROOT_ID,
    // Root buttons for "pick a topic below"; reset path so Back stays sane.
    path: [ROOT_ID],
    inCrisis: false,
  };
}

export function submitFreeText(
  state: ChatFlowState,
  text: string,
  seq: IdSeq,
  options: SubmitTextOptions = {},
): ChatFlowState {
  const capped = capTextInput(text);
  if (!capped || state.inCrisis) return state;

  // Crisis check always runs before any other free-text handling.
  if (detectCrisis(capped)) {
    return {
      ...state,
      history: [
        ...state.history,
        { id: nextId(seq), role: "user", text: capped },
        {
          id: nextId(seq),
          role: "assistant",
          text: formatCrisisText(),
          isCrisis: true,
        },
      ],
      inCrisis: true,
    };
  }

  if (state.currentNodeId === LOCAL_SERVICES_ASK_ID) {
    return submitLocationLookup(state, capped, seq);
  }

  const enableMatch =
    options.enableTextMatch !== undefined
      ? options.enableTextMatch
      : isTextInputEnabled();
  if (enableMatch) {
    return submitMatchedText(state, capped, seq);
  }

  // General typed input off: ignore non-location free text.
  return state;
}

export function goBack(state: ChatFlowState, seq: IdSeq): ChatFlowState {
  if (state.inCrisis) {
    const history = state.history.slice(0, -2);
    return {
      ...state,
      history,
      inCrisis: false,
    };
  }

  // Invalid location attempts stay on the ask node; undo only that exchange.
  if (
    state.currentNodeId === LOCAL_SERVICES_ASK_ID &&
    state.history.at(-1)?.text === LOCATION_INVALID_REPLY
  ) {
    return {
      ...state,
      history: state.history.slice(0, -2),
    };
  }

  if (state.path.length <= 1) return state;

  const path = state.path.slice(0, -1);
  const currentNodeId = path[path.length - 1]!;
  void seq;

  return {
    history: state.history.slice(0, -2),
    currentNodeId,
    path,
    inCrisis: false,
  };
}

export function restartFlow(seq: IdSeq): ChatFlowState {
  return createInitialState(seq);
}

export function useChatFlow(): ChatFlowApi {
  const [seq] = useState<IdSeq>(() => ({ n: 0 }));
  const [state, setState] = useState<ChatFlowState>(() =>
    createInitialState(seq),
  );

  const select = useCallback(
    (optionId: string) => {
      setState((prev) => selectOption(prev, optionId, seq));
    },
    [seq],
  );

  const textInputEnabled = isTextInputEnabled();

  const submitText = useCallback(
    (text: string) => {
      setState((prev) =>
        submitFreeText(prev, text, seq, { enableTextMatch: textInputEnabled }),
      );
    },
    [seq, textInputEnabled],
  );

  const back = useCallback(() => {
    setState((prev) => goBack(prev, seq));
  }, [seq]);

  const restart = useCallback(() => {
    setState(restartFlow(seq));
  }, [seq]);

  const currentNode = requireNode(state.currentNodeId);
  const awaitingLocation =
    !state.inCrisis && state.currentNodeId === LOCAL_SERVICES_ASK_ID;

  return {
    history: state.history,
    currentNode,
    currentNodeId: state.currentNodeId,
    inCrisis: state.inCrisis,
    options: state.inCrisis ? [] : currentNode.options,
    awaitingLocation,
    textInputEnabled,
    select,
    submitText,
    back,
    restart,
  };
}
