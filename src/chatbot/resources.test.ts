import assert from "node:assert/strict";
import { test } from "node:test";
import {
  ALL_RESOURCES,
  LOCAL_RESOURCES,
  NATIONAL_RESOURCES,
  filterResourcesByLocation,
  formatLocationResults,
  isCountyQuery,
  isValidLocationQuery,
  isZipQuery,
} from "./resources.ts";

test("seeds exactly three national resources with official URLs", () => {
  assert.equal(NATIONAL_RESOURCES.length, 3);
  assert.equal(LOCAL_RESOURCES.length, 0);
  assert.equal(ALL_RESOURCES.length, 3);

  const urls = NATIONAL_RESOURCES.map((r) => r.url);
  assert.ok(urls.includes("https://988lifeline.org/"));
  assert.ok(
    urls.includes(
      "https://www.samhsa.gov/find-help/helplines/national-helpline",
    ),
  );
  assert.ok(urls.includes("https://findtreatment.gov/"));

  const samhsa = NATIONAL_RESOURCES.find((r) =>
    r.name.includes("SAMHSA"),
  );
  assert.equal(samhsa?.phone, "1-800-662-4357");

  const lifeline = NATIONAL_RESOURCES.find((r) => r.name.includes("988"));
  assert.equal(lifeline?.phone, "988");
  assert.equal(lifeline?.type, "crisis");
});

test("every resource includes lastVerified ISO date and required fields", () => {
  for (const resource of ALL_RESOURCES) {
    assert.ok(resource.name);
    assert.ok(resource.type);
    assert.ok(resource.url.startsWith("https://"));
    assert.match(resource.lastVerified, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(resource.verifiedBy);
    assert.equal(resource.county, null);
  }
});

test("location query validation accepts county or ZIP only", () => {
  assert.equal(isZipQuery("21801"), true);
  assert.equal(isZipQuery("2180"), false);
  assert.equal(isCountyQuery("Wicomico"), true);
  assert.equal(isCountyQuery("St. Mary's"), true);
  assert.equal(isCountyQuery("Prince George's County"), true);
  assert.equal(isCountyQuery("21801"), false);
  assert.equal(isValidLocationQuery("Somerset County"), true);
  assert.equal(isValidLocationQuery("help me find treatment"), false);
  assert.equal(isValidLocationQuery("please find me a clinic nearby"), false);
});

test("empty local directory falls back to national for county or ZIP", () => {
  const byCounty = filterResourcesByLocation("Wicomico");
  assert.equal(byCounty.usedNationalFallback, true);
  assert.equal(byCounty.queryKind, "county");
  assert.deepEqual(byCounty.matches, NATIONAL_RESOURCES);

  const byZip = filterResourcesByLocation("21801");
  assert.equal(byZip.usedNationalFallback, true);
  assert.equal(byZip.queryKind, "zip");
  assert.deepEqual(byZip.matches, NATIONAL_RESOURCES);
});

test("formatted results include lastVerified on every listing", () => {
  const result = filterResourcesByLocation("21801");
  const text = formatLocationResults(result);
  assert.ok(text.includes("national resources"));
  for (const resource of NATIONAL_RESOURCES) {
    assert.ok(text.includes(resource.name));
    assert.ok(text.includes(`Last verified: ${resource.lastVerified}`));
    assert.ok(text.includes(resource.url));
  }
});
