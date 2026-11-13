import test from "node:test";
import assert from "node:assert/strict";
import {
  buildRouteLink,
  createEmptyData,
  distanceKm,
  filterPlaces,
  parseData,
} from "../src/domain.ts";
import { legacyPlaces as places } from "../src/data/places.ts";

test("search ignores accents/case and combines category and free filters without reordering", () => {
  assert.equal(
    filterPlaces(places, { query: "ITÓRORO" })[0]?.id,
    "vila-itororo",
  );
  assert.equal(
    filterPlaces(places, { query: "agua funda" })[0]?.id,
    "jardim-botanico",
  );
  assert.equal(
    filterPlaces(places, {
      query: "atelie",
      category: "cultura",
      onlyFree: true,
    })[0]?.id,
    "museu-lasar-segall",
  );
  assert.deepEqual(
    filterPlaces(places, { category: "natureza", onlyFree: true }),
    [],
  );
  assert.deepEqual(filterPlaces(places), places);
});
test("Haversine returns kilometers and validates coordinates", () => {
  assert.equal(distanceKm(0, 0, 0, 0), 0);
  assert.ok(Math.abs(distanceKm(0, 0, 0, 1) - 111.195) < 0.01);
  for (const coords of [
    [NaN, 0, 0, 0],
    [91, 0, 0, 0],
    [0, 181, 0, 0],
    [0, 0, Infinity, 0],
  ])
    assert.throws(
      () => distanceKm(...(coords as [number, number, number, number])),
      RangeError,
    );
  assert.ok(Number.isFinite(distanceKm(90, 180, -90, -180)));
});
test("route supports one through six stops with encoded coordinates", () => {
  const one = new URL(buildRouteLink(places.slice(0, 1)));
  assert.equal(
    one.searchParams.get("destination"),
    `${places[0].latitude},${places[0].longitude}`,
  );
  assert.equal(one.searchParams.has("waypoints"), false);
  const six = buildRouteLink(places);
  assert.ok(six.includes("%2C"));
  assert.ok(six.includes("%7C"));
  assert.equal(
    new URL(six).searchParams.get("waypoints")?.split("|").length,
    5,
  );
  assert.throws(() => buildRouteLink([]));
  assert.throws(() => buildRouteLink([...places, places[0]]));
});
const known = places.map((place) => place.id);
test("storage round trips visits and handles catalog evolution and duplicates", () => {
  const data = createEmptyData();
  data.favorites = [known[0], known[0], "retired"];
  data.route = [known[1]];
  data.visits[known[0]] = {
    visitedAt: "2026-11-13T12:00:00.000Z",
    note: "Meu passeio",
    gpsVerified: false,
  };
  const parsed = parseData(JSON.stringify(data), known);
  assert.deepEqual(parsed.favorites, [known[0]]);
  assert.equal(parsed.visits[known[0]].gpsVerified, false);
  assert.deepEqual(parseData(null, known), createEmptyData());
});
test("corrupt storage is rejected rather than silently replaced", () => {
  for (const raw of [
    "",
    "{",
    "{}",
    "null",
    JSON.stringify({ ...createEmptyData(), route: [...known, "extra"] }),
    " ".repeat(1_000_001),
  ])
    assert.throws(() => parseData(raw, known));
  const visit = {
    visitedAt: "2026-11-13T12:00:00Z",
    note: "",
    gpsVerified: true,
  };
  for (const bad of [
    { ...visit, gpsVerified: "true" },
    { ...visit, note: "x".repeat(281) },
    { ...visit, visitedAt: "bad" },
    { ...visit, photoUri: 3 },
  ])
    assert.throws(() =>
      parseData(
        JSON.stringify({ ...createEmptyData(), visits: { [known[0]]: bad } }),
        known,
      ),
    );
  assert.equal(
    parseData(
      JSON.stringify({
        ...createEmptyData(),
        visits: { [known[0]]: { ...visit, note: "x".repeat(280) } },
      }),
      known,
    ).visits[known[0]].note.length,
    280,
  );
});
