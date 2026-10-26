/**
 * Local keyword / pattern crisis check.
 * Runs before any model call. Conservative: when unsure, treat as crisis.
 */

/** TODO: Fill with the verified UMES counseling phone when the client provides it. */
export const CAMPUS_COUNSELING_PHONE = "";

/** TODO: Fill with the verified UMES campus security phone when the client provides it. */
export const CAMPUS_SECURITY_PHONE = "";

export type CrisisLine = {
  id: string;
  label: string;
  href: string;
  detail: string;
};

export const CRISIS_MESSAGE = {
  headline: "If you are in crisis, help is available right now.",
  body: "If there is immediate danger or a possible overdose, call 911. You can also call or text 988. For substance use treatment referrals, call the SAMHSA National Helpline at 1-800-662-4357.",
  lines: [
    {
      id: "911",
      label: "911",
      href: "tel:911",
      detail: "Immediate danger or overdose",
    },
    {
      id: "988",
      label: "988",
      href: "tel:988",
      detail: "Call or text 988",
    },
    {
      id: "samhsa",
      label: "SAMHSA National Helpline",
      href: "tel:18006624357",
      detail: "1-800-662-4357",
    },
  ] as const satisfies readonly CrisisLine[],
  campusCounselingPhone: CAMPUS_COUNSELING_PHONE,
  campusSecurityPhone: CAMPUS_SECURITY_PHONE,
} as const;

/** Lines to show in the UI. Campus numbers appear only when filled. */
export function getCrisisMessageLines(): CrisisLine[] {
  const lines: CrisisLine[] = [...CRISIS_MESSAGE.lines];
  if (CAMPUS_COUNSELING_PHONE.trim()) {
    lines.push({
      id: "campus-counseling",
      label: "Campus counseling",
      href: `tel:${CAMPUS_COUNSELING_PHONE.replace(/\D/g, "")}`,
      detail: CAMPUS_COUNSELING_PHONE,
    });
  }
  if (CAMPUS_SECURITY_PHONE.trim()) {
    lines.push({
      id: "campus-security",
      label: "Campus security",
      href: `tel:${CAMPUS_SECURITY_PHONE.replace(/\D/g, "")}`,
      detail: CAMPUS_SECURITY_PHONE,
    });
  }
  return lines;
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['']/g, "'")
    .replace(/[^\w\s'/+-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Patterns that strongly indicate crisis. */
const STRONG_PATTERNS: RegExp[] = [
  // Suicide / ending life
  /\b(suicid(e|al|ing)?)\b/,
  /\b(kill(ing)?|end(ing)?|take)\s+(my(self)?|me)\s*(own\s+)?life\b/,
  /\b(kill|end)\s+myself\b/,
  /\bkms\b/,
  /\b(want|wanna|going|gonna|about)\s+to\s+die\b/,
  /\bi\s+(want|wanna|wish)\s+(to\s+)?die\b/,
  /\b(better|rather)\s+off\s+dead\b/,
  /\bi\s+don'?t\s+want\s+to\s+(be\s+)?alive\b/,
  /\bno\s+reason\s+to\s+live\b/,
  /\b(end|ending)\s+it\s+all\b/,
  /\b(can'?t|cannot)\s+go\s+on\b/,
  /\bi\s+won'?t\s+be\s+here\s+(tomorrow|tonight|much\s+longer)\b/,
  /\b(plan(ning)?|thinking)\s+(about\s+)?(suicide|killing\s+myself)\b/,
  /\bsuicide\s+note\b/,
  /\b(hang|hanging)\s+myself\b/,
  /\b(shoot|shooting)\s+myself\b/,
  /\b(jump(ing)?)\s+off\b/,

  // Self-harm
  /\bself[-\s]?harm(ing)?\b/,
  /\b(cut|cutting|burn|burning|hurt|hurting)\s+myself\b/,
  /\bi\s+(cut|burned|hurt)\s+myself\b/,
  /\b(slash(ed|ing)?)\s+my\s+wrists?\b/,
  /\bbleed(ing)?\s+out\b/,

  // Overdose / poisoning
  /\bover\s*dos(e|ed|ing)\b/,
  /\b\bod(ed|ing)?\b/,
  /\btook\s+too\s+many\s+(pills?|meds|medications?|tablets?)\b/,
  /\b(swallow(ed|ing)?)\s+(a\s+)?(bottle|handful)\s+of\s+(pills?|meds)\b/,
  /\bmix(ed|ing)?\s+(pills?|meds|drugs?).{0,40}\b(alcohol|booze|liquor)\b/,
  /\b(poison(ed|ing)?)\s+myself\b/,
  /\bfentanyl\b.{0,30}\b(took|taking|used|using|over)\b/,
  /\b(nodding|passed)\s+out\b.{0,40}\b(opioid|heroin|fentanyl|pills?|drugs?)\b/,

  // Abuse / violence toward the person
  /\b(being\s+)?(abused|beaten|assaulted)\b/,
  /\b(domestic|partner|boyfriend|girlfriend|spouse|husband|wife)\s+(violence|abuse)\b/,
  /\b(he|she|they|someone|my\s+partner)\s+(is\s+)?(hitting|hurting|beating|choking|threatening)\s+me\b/,
  /\bafraid\s+(he|she|they|someone)\s+will\s+(hurt|kill)\s+me\b/,
  /\bsexual(ly)?\s+(abuse|assault|violence)\b/,
  /\brap(e|ed|ing)\b/,
  /\btraffick(ing|ed)?\b/,

  // Immediate danger / active emergency
  /\b(right\s+now|tonight|this\s+moment|currently)\b.{0,40}\b(kill|suicide|hurt|overdose|danger|unsafe)\b/,
  /\bi\s+(have|got)\s+(a\s+)?(gun|weapon|knife|razor|rope|pills?).{0,40}\b(kill|hurt|end|suicide|die)\b/,
  /\bimmediate(ly)?\s+(danger|threat|harm)\b/,
  /\bin\s+(immediate\s+)?danger\b/,
  /\bneed\s+(help|someone)\s+(right\s+now|now|tonight)\b.{0,30}\b(hurt|die|kill|unsafe|scared)\b/,
  /\bsomeone\s+(is\s+)?(going\s+to|about\s+to)\s+(hurt|kill)\s+(me|us)\b/,
  /\bactive\s+(shooter|attacker)\b/,
];

/**
 * Softer signals. Alone they may be ambiguous; combined with self-reference
 * or urgency we treat as crisis (conservative).
 */
const SOFT_SELF_CRISIS: RegExp[] = [
  /\bi\s+(feel\s+)?(hopeless|worthless|empty)\b/,
  /\bi\s+can'?t\s+(take|handle)\s+(this|it)\s+anymore\b/,
  /\bi\s+(hate|hating)\s+myself\b/,
  /\beveryone\s+would\s+be\s+better\s+without\s+me\b/,
  /\bi\s+wish\s+i\s+(was|were)\s+dead\b/,
  /\bi\s+don'?t\s+want\s+to\s+wake\s+up\b/,
  /\bthinking\s+about\s+(dying|death|not\s+waking\s+up)\b/,
  /\bi\s+(bought|have)\s+(pills?|a\s+gun|rope)\s+(for|to)\b/,
];

/** Clear non-crisis idioms / slang we should not flag. */
const FALSE_POSITIVE_GUARDS: RegExp[] = [
  /\bkilled\s+it\b/,
  /\bkillin(g)?\s+it\b/,
  /\bslayed\s+it\b/,
  /\bdied\s+(laughing|of\s+laughter|of\s+boredom)\b/,
  /\bdead\s+(tired|serious|ass|wrong|on)\b/,
  /\bto\s+die\s+for\b/,
  /\bdrop\s+dead\s+(gorgeous|funny)\b/,
  /\bkilling\s+me\s+(softly|with\s+(this|that)|right\s+now\s+with)\b/,
  /\bthis\s+(class|exam|homework|assignment|game)\s+is\s+killing\s+me\b/,
  /\bmy\s+(phone|battery|laptop)\s+(is\s+)?dead\b/,
  /\bstabbed\s+(me\s+)?in\s+the\s+back\b/,
  /\boverdose\s+of\s+(cuteness|homework|caffeine\s+jokes?)\b/,
];

export function detectCrisis(text: string): boolean {
  if (!text || !text.trim()) return false;

  const n = normalize(text);

  for (const guard of FALSE_POSITIVE_GUARDS) {
    if (guard.test(n)) {
      // Idiom matched: only flag if a strong non-idiom crisis pattern also matches.
      const withoutIdiom = n.replace(guard, " ");
      return STRONG_PATTERNS.some((re) => re.test(withoutIdiom));
    }
  }

  for (const re of STRONG_PATTERNS) {
    if (re.test(n)) return true;
  }

  for (const re of SOFT_SELF_CRISIS) {
    if (re.test(n)) return true;
  }

  // Conservative catch-alls for compressed slang / typos near known stems
  if (
    /\b(suicid|suicde|sucide|suicalde)\w*\b/.test(n) ||
    /\b(selfharm|selfharming)\b/.test(n) ||
    /\b(overdoes|overdoe|overdoesd)\b/.test(n) ||
    /\bi\s+want\s+out\s+of\s+(this\s+)?life\b/.test(n)
  ) {
    return true;
  }

  return false;
}
