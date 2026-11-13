import test from "node:test";
import assert from "node:assert/strict";
import { filterPlaces, buildRouteLink, type Place } from "../src/domain.ts";
import { places } from "../src/data/places.ts";
const sample: Place[] = [
  {
    ...places[0],
    id: "beach-one",
    name: "Praia pequena",
    city: "São Sebastião",
    category: "praia",
    free: true,
  },
  {
    ...places[0],
    id: "museum-two",
    name: "Museu caiçara",
    city: "Caraguatatuba",
    category: "cultura",
    free: false,
  },
  {
    ...places[0],
    id: "beach-three",
    name: "Praia do norte",
    city: "Ubatuba",
    category: "praia",
    free: true,
  },
];
test("city search ignores accents and combines city, category, text and free access", () => {
  assert.deepEqual(
    filterPlaces(sample, { query: "sao sebastiao" }).map((p) => p.id),
    ["beach-one"],
  );
  assert.deepEqual(
    filterPlaces(sample, {
      city: "Ubatuba",
      category: "praia",
      onlyFree: true,
      query: "norte",
    }).map((p) => p.id),
    ["beach-three"],
  );
  assert.deepEqual(filterPlaces(sample, { city: "Ilhabela" }), []);
  assert.deepEqual(
    filterPlaces(sample, { city: "Caraguatatuba", onlyFree: true }),
    [],
  );
  assert.deepEqual(filterPlaces(sample, { city: "todos" }), sample);
});
test("coastal directions use driving, retain stop order and encode waypoints", () => {
  const url = new URL(buildRouteLink(sample));
  assert.equal(url.searchParams.get("travelmode"), "driving");
  assert.equal(
    url.searchParams.get("destination"),
    `${sample[2].latitude},${sample[2].longitude}`,
  );
  assert.equal(
    url.searchParams.get("waypoints"),
    sample
      .slice(0, 2)
      .map((p) => `${p.latitude},${p.longitude}`)
      .join("|"),
  );
});
