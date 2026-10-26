import React, {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { MessageCircle, RotateCcw, Undo2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { CRISIS_MESSAGE, getCrisisMessageLines } from "./crisis.ts";
import { MAX_TEXT_INPUT_LENGTH } from "./match.ts";
import { useChatFlow } from "./useChatFlow.ts";

const DISCLAIMER =
  "I'm an automated assistant, not a counselor or medical professional. I share general information and resources.";

/** Above crisis bar (z-30) and nav (z-20); leaves room for normal page chrome. */
const CHAT_Z = "z-40";

function ChatWidgetApp() {
  const {
    history,
    options,
    select,
    submitText,
    back,
    restart,
    currentNodeId,
    inCrisis,
    awaitingLocation,
    textInputEnabled,
  } = useChatFlow();

  const [open, setOpen] = useState(false);
  const [showCrisisHelp, setShowCrisisHelp] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [locationDraft, setLocationDraft] = useState("");
  const [textDraft, setTextDraft] = useState("");

  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);
  const textInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevHistoryLen = useRef(0);

  const showGeneralTextInput =
    textInputEnabled && !awaitingLocation && !inCrisis && !showCrisisHelp;

  const titleId = useId();
  const liveId = useId();

  // Portal target (#chat-root) is a sibling; wait until after commit.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mount gate for createPortal
    setMounted(true);
  }, []);

  const closePanel = useCallback(() => {
    setOpen(false);
    setShowCrisisHelp(false);
    setLocationDraft("");
    setTextDraft("");
    window.setTimeout(() => launcherRef.current?.focus(), 0);
  }, []);

  useEffect(() => {
    if (!open) {
      prevHistoryLen.current = 0;
      return;
    }
    // Keep the disclaimer visible on first open; scroll after later turns.
    if (prevHistoryLen.current === 0) {
      prevHistoryLen.current = history.length;
      return;
    }
    if (history.length !== prevHistoryLen.current || showCrisisHelp) {
      messagesEndRef.current?.scrollIntoView({ block: "nearest" });
    }
    prevHistoryLen.current = history.length;
  }, [open, history, showCrisisHelp]);

  useEffect(() => {
    if (!awaitingLocation) return;
    const focusInput = window.setTimeout(() => {
      locationInputRef.current?.focus();
    }, 30);
    return () => window.clearTimeout(focusInput);
  }, [awaitingLocation, history.length]);

  useEffect(() => {
    if (!open) return;

    const focusClose = window.setTimeout(() => {
      if (awaitingLocation) {
        locationInputRef.current?.focus();
      } else {
        closeRef.current?.focus();
      }
    }, 20);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closePanel();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusClose);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, closePanel, awaitingLocation]);

  const canGoBack = currentNodeId !== "root" || inCrisis;
  const crisisLines = getCrisisMessageLines();

  const handleLocationSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const value = locationDraft.trim();
    if (!value) return;
    submitText(value);
    setLocationDraft("");
  };

  const handleTextSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const value = textDraft.trim();
    if (!value) return;
    submitText(value);
    setTextDraft("");
  };

  const root = typeof document !== "undefined"
    ? document.getElementById("chat-root")
    : null;

  if (!mounted || !root) return null;

  return createPortal(
    <div className={cn("pointer-events-none fixed inset-0", CHAT_Z)}>
      {/* Launcher */}
      <div className="pointer-events-auto absolute bottom-4 right-4 md:bottom-6 md:right-6">
        <Button
          ref={launcherRef}
          type="button"
          size="lg"
          tabIndex={open ? -1 : 0}
          className={cn(
            "h-14 rounded-full px-5 shadow-lg focus-visible:ring-2 focus-visible:ring-ring",
            "motion-safe:transition-transform motion-reduce:transition-none",
            open && "scale-95",
          )}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={open ? "soriv-chat-panel" : undefined}
          onClick={() => {
            if (open) {
              closePanel();
            } else {
              setOpen(true);
            }
          }}
        >
          {open ? (
            <>
              <X aria-hidden="true" />
              <span>Close chat</span>
            </>
          ) : (
            <>
              <MessageCircle aria-hidden="true" />
              <span>Chat with us</span>
            </>
          )}
        </Button>
      </div>

      {/* Panel */}
      {open ? (
        <div
          ref={panelRef}
          id="soriv-chat-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={cn(
            "pointer-events-auto flex flex-col border border-border bg-background font-brand-serif text-foreground shadow-xl",
            "motion-safe:transition-opacity motion-reduce:transition-none",
            // Mobile: full screen
            "fixed inset-0",
            // Desktop: panel above the launcher
            "md:inset-auto md:bottom-24 md:right-6 md:h-[min(70vh,36rem)] md:w-[24rem] md:rounded-2xl",
          )}
        >
          <header className="flex shrink-0 items-start gap-2 border-b border-border px-3 py-3 md:rounded-t-2xl">
            <div className="min-w-0 flex-1">
              <h2
                id={titleId}
                className="font-brand-sans text-base font-semibold text-foreground"
              >
                SOR-IV assistant
              </h2>
              <p className="font-brand-sans text-xs text-muted-foreground">
                Information and referrals only
              </p>
            </div>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="shrink-0 focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() => setShowCrisisHelp(true)}
            >
              Need help now?
            </Button>
            <Button
              ref={closeRef}
              type="button"
              variant="ghost"
              size="icon"
              className="shrink-0 focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Close chat"
              onClick={closePanel}
            >
              <X aria-hidden="true" />
            </Button>
          </header>

          <ScrollArea className="min-h-0 flex-1">
            <div
              id={liveId}
              aria-live="polite"
              aria-relevant="additions"
              className="space-y-3 px-3 py-4"
            >
              {/* Fixed disclaimer is always first */}
              <div className="max-w-[95%] rounded-2xl rounded-bl-md bg-muted px-3 py-2 text-sm text-foreground">
                <p>{DISCLAIMER}</p>
              </div>

              {history.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "max-w-[95%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap",
                    message.role === "user"
                      ? "ml-auto rounded-br-md bg-primary text-primary-foreground"
                      : "rounded-bl-md bg-card text-card-foreground border border-border",
                    message.isCrisis && "border-destructive/40 bg-destructive/5",
                  )}
                >
                  <p>{message.text}</p>
                </div>
              ))}

              {showCrisisHelp ? (
                <div
                  className="rounded-2xl border border-destructive/30 bg-destructive/5 px-3 py-3 text-sm"
                  role="region"
                  aria-label="Crisis resources"
                >
                  <p className="font-semibold text-foreground">
                    {CRISIS_MESSAGE.headline}
                  </p>
                  <p className="mt-2 text-muted-foreground">
                    {CRISIS_MESSAGE.body}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {crisisLines.map((line) => (
                      <li key={line.id}>
                        <a
                          href={line.href}
                          className="font-semibold text-primary underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                        >
                          {line.label}
                        </a>
                        <span className="text-muted-foreground">
                          {" "}
                          - {line.detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-3 focus-visible:ring-2 focus-visible:ring-ring"
                    onClick={() => setShowCrisisHelp(false)}
                  >
                    Back to chat
                  </Button>
                </div>
              ) : null}

              {!showCrisisHelp && options.length > 0 ? (
                <div
                  className="flex flex-col gap-2 pt-1"
                  role="group"
                  aria-label="Suggested replies"
                >
                  {options.map((option) => (
                    <Button
                      key={option.next}
                      type="button"
                      variant="outline"
                      className="h-auto min-h-9 whitespace-normal px-3 py-2 text-left justify-start focus-visible:ring-2 focus-visible:ring-ring"
                      onClick={() => select(option.next)}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              ) : null}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {!showCrisisHelp ? (
            <div className="flex shrink-0 flex-col gap-2 border-t border-border px-3 py-3 md:rounded-b-2xl">
              {awaitingLocation ? (
                <form
                  className="flex gap-2"
                  onSubmit={handleLocationSubmit}
                  aria-label="County or ZIP lookup"
                >
                  <label className="sr-only" htmlFor="soriv-location-input">
                    County or 5-digit ZIP code
                  </label>
                  <input
                    ref={locationInputRef}
                    id="soriv-location-input"
                    type="text"
                    inputMode="text"
                    autoComplete="off"
                    enterKeyHint="search"
                    maxLength={60}
                    placeholder="County or ZIP"
                    value={locationDraft}
                    onChange={(event) => setLocationDraft(event.target.value)}
                    className={cn(
                      "min-w-0 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm",
                      "placeholder:text-muted-foreground",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    )}
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="shrink-0 focus-visible:ring-2 focus-visible:ring-ring"
                    disabled={!locationDraft.trim()}
                  >
                    Look up
                  </Button>
                </form>
              ) : null}
              {showGeneralTextInput ? (
                <form
                  className="flex gap-2"
                  onSubmit={handleTextSubmit}
                  aria-label="Ask about a topic"
                >
                  <label className="sr-only" htmlFor="soriv-text-input">
                    Type a short question
                  </label>
                  <input
                    ref={textInputRef}
                    id="soriv-text-input"
                    type="text"
                    inputMode="text"
                    autoComplete="off"
                    enterKeyHint="send"
                    maxLength={MAX_TEXT_INPUT_LENGTH}
                    placeholder="Type a short question"
                    value={textDraft}
                    onChange={(event) => setTextDraft(event.target.value)}
                    className={cn(
                      "min-w-0 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm",
                      "placeholder:text-muted-foreground",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    )}
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="shrink-0 focus-visible:ring-2 focus-visible:ring-ring"
                    disabled={!textDraft.trim()}
                  >
                    Send
                  </Button>
                </form>
              ) : null}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="focus-visible:ring-2 focus-visible:ring-ring"
                  disabled={!canGoBack}
                  onClick={() => back()}
                >
                  <Undo2 aria-hidden="true" />
                  Back
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="focus-visible:ring-2 focus-visible:ring-ring"
                  onClick={() => {
                    setShowCrisisHelp(false);
                    setLocationDraft("");
                    setTextDraft("");
                    restart();
                  }}
                >
                  <RotateCcw aria-hidden="true" />
                  Restart
                </Button>
              </div>
              <p className="font-brand-sans text-xs text-muted-foreground">
                This chat does not save your conversation.
              </p>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>,
    root,
  );
}

export default function ChatWidget() {
  return <ChatWidgetApp />;
}
