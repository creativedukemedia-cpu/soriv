/**
 * Verified resource directory for the chatbot.
 * Never invent listings. Local entries are supplied by the client only.
 */

export type ResourceType =
  | "treatment"
  | "counseling"
  | "peer"
  | "family"
  | "crisis";

export type Resource = {
  name: string;
  type: ResourceType;
  phone: string | null;
  url: string;
  /** County name for local entries; null for national resources. */
  county: string | null;
  notes: string;
  /** ISO date (YYYY-MM-DD). */
  lastVerified: string;
  verifiedBy: string;
};

/** Tree node that asks for county or ZIP only. */
export const LOCAL_SERVICES_ASK_ID = "faq7-local-services";

/** Shown after a location lookup (reached via free-text, not a button). */
export const LOCAL_SERVICES_RESULTS_ID = "faq7-local-results";

export const NATIONAL_RESOURCES: Resource[] = [
  {
    name: "988 Suicide & Crisis Lifeline",
    type: "crisis",
    phone: "988",
    url: "https://988lifeline.org/",
    county: null,
    notes: "Call or text 988. Free, confidential support, 24/7.",
    lastVerified: "2026-10-24",
    verifiedBy: "SOR-IV draft seed",
  },
  {
    name: "SAMHSA National Helpline",
    type: "treatment",
    phone: "1-800-662-4357",
    url: "https://www.samhsa.gov/find-help/helplines/national-helpline",
    county: null,
    notes:
      "Free, confidential treatment referral and information, 24/7 (1-800-662-HELP).",
    lastVerified: "2026-10-24",
    verifiedBy: "SOR-IV draft seed",
  },
  {
    name: "FindTreatment.gov",
    type: "treatment",
    phone: null,
    url: "https://findtreatment.gov/",
    county: null,
    notes:
      "Official U.S. locator for mental health and substance use treatment facilities.",
    lastVerified: "2026-10-24",
    verifiedBy: "SOR-IV draft seed",
  },
];

/*
 * Local / regional listings stay empty until the client supplies verified
 * entries (name, type, phone, url, county, notes, lastVerified, verifiedBy).
 * Do not invent phone numbers, URLs, or service names. ZIP search will not
 * reverse-geocode; without a matching county entry, the chatbot shows the
 * national resources above.
 */
export const LOCAL_RESOURCES: Resource[] = [];

export const ALL_RESOURCES: Resource[] = [
  ...NATIONAL_RESOURCES,
  ...LOCAL_RESOURCES,
];

export type LocationQueryKind = "zip" | "county";

export type LocationLookupResult = {
  matches: Resource[];
  usedNationalFallback: boolean;
  queryKind: LocationQueryKind;
  locationLabel: string;
};

const ZIP_RE = /^\d{5}$/;
/** Place names only: letters, spaces, hyphen, apostrophe, period (e.g. St. Mary's). */
const COUNTY_RE = /^[A-Za-z][A-Za-z\s.'-]*$/;

export function isZipQuery(query: string): boolean {
  return ZIP_RE.test(query.trim());
}

export function isCountyQuery(query: string): boolean {
  const trimmed = query.trim();
  if (!trimmed || isZipQuery(trimmed)) return false;
  if (!COUNTY_RE.test(trimmed)) return false;
  // Reject free-form sentences; county names are short (e.g. "Prince George's County").
  const words = trimmed.split(/\s+/);
  if (words.length > 3 || trimmed.length > 40) return false;
  return true;
}

/** True when the string is only a county name or a 5-digit ZIP. */
export function isValidLocationQuery(query: string): boolean {
  return isZipQuery(query) || isCountyQuery(query);
}

export function normalizeCounty(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+county$/i, "")
    .replace(/\s+/g, " ");
}

/**
 * Filter local listings by county. ZIP codes are accepted as input but are
 * never mapped to a county (no guessing). If nothing local matches, return
 * the national seed list.
 */
export function filterResourcesByLocation(query: string): LocationLookupResult {
  const trimmed = query.trim();

  if (isZipQuery(trimmed)) {
    // Schema has county only; do not invent a county from a ZIP.
    return {
      matches: [...NATIONAL_RESOURCES],
      usedNationalFallback: true,
      queryKind: "zip",
      locationLabel: trimmed,
    };
  }

  const needle = normalizeCounty(trimmed);
  const matches = LOCAL_RESOURCES.filter(
    (resource) =>
      resource.county != null && normalizeCounty(resource.county) === needle,
  );

  if (matches.length === 0) {
    return {
      matches: [...NATIONAL_RESOURCES],
      usedNationalFallback: true,
      queryKind: "county",
      locationLabel: trimmed,
    };
  }

  return {
    matches,
    usedNationalFallback: false,
    queryKind: "county",
    locationLabel: trimmed,
  };
}

function formatOne(resource: Resource): string {
  const lines = [`• ${resource.name}`, `  Type: ${resource.type}`];
  if (resource.phone) {
    lines.push(`  Phone: ${resource.phone}`);
  }
  lines.push(`  Website: ${resource.url}`);
  if (resource.county) {
    lines.push(`  County: ${resource.county}`);
  }
  if (resource.notes) {
    lines.push(`  ${resource.notes}`);
  }
  lines.push(`  Last verified: ${resource.lastVerified}`);
  return lines.join("\n");
}

/** Build the assistant reply for a location lookup. Always includes lastVerified. */
export function formatLocationResults(result: LocationLookupResult): string {
  const intro = result.usedNationalFallback
    ? `I do not have verified local listings for "${result.locationLabel}" yet. Here are national resources you can use:`
    : `Here are verified resources for "${result.locationLabel}":`;

  const body = result.matches.map(formatOne).join("\n\n");
  return `${intro}\n\n${body}`;
}

export const LOCATION_PROMPT =
  "What county or ZIP code should I use to look up services? Enter only a county name or a 5-digit ZIP. If this is an emergency or someone may be overdosing, call 911.";

export const LOCATION_INVALID_REPLY =
  "Please enter only a county name or a 5-digit ZIP code. I do not need any other personal details.";
