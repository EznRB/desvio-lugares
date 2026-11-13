import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { coastalPlaces, legacyPlaces, places } from "../src/data/places.ts";
import { coastalPhotos } from "../src/data/coastal-photos.ts";
import { parseData, createEmptyData } from "../src/domain.ts";
test("coastal catalog covers four cities, with unique IDs and valid references", () => {
  assert.equal(coastalPlaces.length, 12);
  assert.equal(new Set(places.map((p) => p.id)).size, places.length);
  for (const city of ["Caraguatatuba", "São Sebastião", "Ubatuba", "Ilhabela"])
    assert.equal(coastalPlaces.filter((p) => p.city === city).length, 3);
  for (const place of coastalPlaces) {
    assert.equal(new URL(place.source).protocol, "https:");
    assert.ok(place.latitude > -24 && place.latitude < -23);
    assert.ok(place.longitude > -46 && place.longitude < -44);
  }
  for (const photo of coastalPhotos)
    assert.ok(
      existsSync(new URL("../" + photo.asset, import.meta.url)),
      photo.asset,
    );
  assert.equal(
    coastalPhotos.find((p) => p.key === "caragua-context")?.place,
    undefined,
  );
});
test("regional specialization retains previous favorites, route and passport alongside new places", () => {
  const old = legacyPlaces[0].id;
  const fresh = coastalPlaces[0].id;
  const data = createEmptyData();
  data.favorites = [old, fresh];
  data.route = [old, fresh];
  data.visits[old] = {
    visitedAt: "2026-11-13T12:00:00Z",
    note: "Lembrança anterior",
    gpsVerified: false,
  };
  const restored = parseData(
    JSON.stringify(data),
    places.map((p) => p.id),
  );
  assert.deepEqual(restored, data);
  assert.equal(
    coastalPlaces.some((p) => p.id === old),
    false,
  );
});
