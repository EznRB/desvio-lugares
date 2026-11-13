export type City = "Caraguatatuba" | "São Sebastião" | "Ubatuba" | "Ilhabela";
export type Category = "praia" | "natureza" | "cultura" | "arquitetura";
export interface Place {
  id: string;
  name: string;
  category: Category;
  neighborhood: string;
  city: City | "São Paulo";
  description: string;
  story: string;
  address: string;
  latitude: number;
  longitude: number;
  /** Editorial estimate, in minutes. */
  duration: number;
  free: boolean;
  priceLabel: string;
  cover: string;
  tags: string[];
  tip: string;
  source: string;
}
export interface AppData {
  version: 1;
  favorites: string[];
  route: string[];
  visits: Record<
    string,
    { visitedAt: string; note: string; photoUri?: string; gpsVerified: boolean }
  >;
}
const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export function filterPlaces(
  places: readonly Place[],
  filters: {
    query?: string;
    category?: Category | "todos";
    city?: City | "todos";
    onlyFree?: boolean;
  } = {},
): Place[] {
  const query = normalize(filters.query?.trim() ?? "");
  return places.filter(
    (place) =>
      (!filters.category ||
        filters.category === "todos" ||
        place.category === filters.category) &&
      (!filters.city ||
        filters.city === "todos" ||
        place.city === filters.city) &&
      (!filters.onlyFree || place.free) &&
      (!query ||
        normalize(
          [place.name, place.neighborhood, place.city, ...place.tags].join(" "),
        ).includes(query)),
  );
}
function validateCoordinate(latitude: number, longitude: number) {
  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    Math.abs(latitude) > 90 ||
    Math.abs(longitude) > 180
  )
    throw new RangeError("Coordenadas inválidas.");
}
export function distanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  validateCoordinate(lat1, lon1);
  validateCoordinate(lat2, lon2);
  const rad = (degrees: number) => (degrees * Math.PI) / 180;
  const a =
    Math.sin(rad(lat2 - lat1) / 2) ** 2 +
    Math.cos(rad(lat1)) *
      Math.cos(rad(lat2)) *
      Math.sin(rad(lon2 - lon1) / 2) ** 2;
  return 6371.0088 * 2 * Math.asin(Math.sqrt(Math.min(1, Math.max(0, a))));
}
export function buildRouteLink(
  places: readonly Pick<Place, "latitude" | "longitude">[],
): string {
  if (!places.length || places.length > 6)
    throw new RangeError("Escolha de 1 a 6 paradas.");
  const points = places.map((place) => {
    validateCoordinate(place.latitude, place.longitude);
    return `${place.latitude},${place.longitude}`;
  });
  // No origin asks Google Maps to use the visitor's current location.
  let result = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(points.at(-1)!)}&travelmode=driving`;
  if (points.length > 1)
    result += `&waypoints=${encodeURIComponent(points.slice(0, -1).join("|"))}`;
  return result;
}
export function createEmptyData(): AppData {
  return { version: 1, favorites: [], route: [], visits: {} };
}
const object = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);
/** Throws on corrupt data. Removed catalog IDs are intentionally discarded during catalog evolution. */
export function parseData(
  raw: string | null,
  knownIds: readonly string[],
): AppData {
  if (raw === null) return createEmptyData();
  if (raw.length > 1_000_000) throw new Error("Dados locais excedem o limite.");
  const value: unknown = JSON.parse(raw);
  if (
    !object(value) ||
    value.version !== 1 ||
    !Array.isArray(value.favorites) ||
    !Array.isArray(value.route) ||
    !object(value.visits)
  )
    throw new Error("Dados locais inválidos.");
  const known = new Set(knownIds);
  const ids = (values: unknown[], limit: number) => {
    if (
      values.length > 10_000 ||
      values.some((id) => typeof id !== "string" || id.length > 128)
    )
      throw new Error("Lista local inválida.");
    const unique = [...new Set(values as string[])];
    if (unique.length > limit) throw new Error("Limite de paradas excedido.");
    return unique.filter((id) => known.has(id));
  };
  const favorites = ids(value.favorites, 10_000);
  const route = ids(value.route, 6);
  const visits: AppData["visits"] = {};
  if (Object.keys(value.visits).length > 10_000)
    throw new Error("Visitas excedem o limite.");
  for (const [id, visit] of Object.entries(value.visits)) {
    if (
      !object(visit) ||
      typeof visit.visitedAt !== "string" ||
      visit.visitedAt.length > 40 ||
      !Number.isFinite(Date.parse(visit.visitedAt)) ||
      typeof visit.note !== "string" ||
      visit.note.length > 280 ||
      typeof visit.gpsVerified !== "boolean" ||
      (visit.photoUri !== undefined &&
        (typeof visit.photoUri !== "string" || visit.photoUri.length > 8192))
    )
      throw new Error("Visita local inválida.");
    if (known.has(id))
      Object.defineProperty(visits, id, {
        value: {
          visitedAt: visit.visitedAt,
          note: visit.note,
          gpsVerified: visit.gpsVerified,
          ...(visit.photoUri === undefined ? {} : { photoUri: visit.photoUri }),
        },
        enumerable: true,
        configurable: true,
        writable: true,
      });
  }
  return { version: 1, favorites, route, visits };
}
