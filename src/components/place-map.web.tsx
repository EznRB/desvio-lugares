import React, { useEffect, useRef, useState } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import type * as Leaflet from "leaflet";
import "./map.css";
import type { Place } from "../domain";

export interface PlaceMapProps {
  places: Place[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

export default function PlaceMap({
  places,
  selectedId,
  onSelect,
}: PlaceMapProps) {
  const { width } = useWindowDimensions();
  const height = width < 720 ? 420 : 520;
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<Leaflet.Map | null>(null);
  const layer = useRef<Leaflet.LayerGroup | null>(null);
  const leaflet = useRef<typeof Leaflet | null>(null);
  const select = useRef(onSelect);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [tilesFailed, setTilesFailed] = useState(false);
  const boundsKey = JSON.stringify(
    places.map((place) => [place.latitude, place.longitude]),
  );
  const selectedPlace = places.find((place) => place.id === selectedId);
  const selectedLatitude = selectedPlace?.latitude;
  const selectedLongitude = selectedPlace?.longitude;

  useEffect(() => {
    select.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    let disposed = false;
    let resize: ResizeObserver | undefined;
    void import("leaflet")
      .then((L) => {
        if (disposed || !container.current) return;
        leaflet.current = L;
        const instance = L.map(container.current, {
          scrollWheelZoom: false,
          zoomControl: true,
        }).setView([-23.553, -46.653], 12);
        map.current = instance;
        const tiles = L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            maxZoom: 19,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          },
        ).addTo(instance);
        tiles.on("tileerror", () => {
          if (!disposed) setTilesFailed(true);
        });
        tiles.on("tileload", () => {
          if (!disposed) setTilesFailed(false);
        });
        layer.current = L.layerGroup().addTo(instance);
        if (typeof ResizeObserver !== "undefined") {
          resize = new ResizeObserver(() =>
            instance.invalidateSize({ pan: false }),
          );
          resize.observe(container.current);
        }
        setReady(true);
      })
      .catch(() => {
        if (!disposed) setFailed(true);
      });
    return () => {
      disposed = true;
      resize?.disconnect();
      map.current?.remove();
      map.current = null;
      layer.current = null;
    };
  }, []);

  useEffect(() => {
    const L = leaflet.current;
    const group = layer.current;
    if (!ready || !L || !group) return;
    group.clearLayers();
    places.forEach((place, index) => {
      const selected = place.id === selectedId;
      const icon = L.divIcon({
        className: "desvio-map-marker",
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        html: `<span style="display:flex;align-items:center;justify-content:center;width:32px;height:32px;border:2px solid ${selected ? "#D6AD68" : "#FAF8ED"};border-radius:50%;background:${selected ? "#243F2D" : "#55744D"};color:#fff;font:600 12px system-ui;box-shadow:0 3px 10px #263d3338;${selected ? "transform:scale(1.18);" : ""}">${index + 1}</span>`,
      });
      const marker = L.marker([place.latitude, place.longitude], {
        icon,
        title: place.name,
        alt: place.name,
        zIndexOffset: selected ? 1000 : 0,
      });
      const label = document.createElement("span");
      label.textContent = place.name;
      marker.bindTooltip(label, { direction: "top", offset: [0, -16] });
      marker.on("click", () => select.current(place.id));
      marker.addTo(group);
    });
  }, [places, selectedId, ready]);

  useEffect(() => {
    const instance = map.current;
    const L = leaflet.current;
    if (!ready || !instance || !L) return;
    const coordinates = JSON.parse(boundsKey) as [number, number][];
    if (coordinates.length)
      instance.fitBounds(L.latLngBounds(coordinates), {
        padding: [48, 48],
        maxZoom: 14,
        animate: false,
      });
    else instance.setView([-23.553, -46.653], 12);
  }, [boundsKey, ready]);

  useEffect(() => {
    if (
      ready &&
      selectedLatitude !== undefined &&
      selectedLongitude !== undefined
    )
      map.current?.panTo([selectedLatitude, selectedLongitude], {
        animate: true,
      });
  }, [selectedLatitude, selectedLongitude, ready]);

  return (
    <View
      style={{
        height,
        borderRadius: 14,
        overflow: "hidden",
        backgroundColor: "#E9ECDD",
      }}
    >
      {React.createElement("div", {
        ref: container,
        role: "region",
        "aria-label": "Mapa interativo dos lugares em São Paulo",
        style: {
          height: "100%",
          width: "100%",
          background: "#E9ECDD",
          zIndex: 0,
        },
      })}
      {ready && tilesFailed && (
        <View
          style={{
            position: "absolute",
            top: 16,
            left: 60,
            right: 16,
            backgroundColor: "#FAF8ED",
            padding: 12,
            borderRadius: 8,
          }}
        >
          <Text
            accessibilityRole="alert"
            style={{ color: "#40563C", fontSize: 12, lineHeight: 18 }}
          >
            O fundo do mapa não carregou. Confira sua conexão. Os marcadores dos
            lugares continuam disponíveis.
          </Text>
        </View>
      )}
      {!ready && (
        <View
          style={{
            position: "absolute",
            inset: 0,
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <Text
            style={{ color: "#40563C", textAlign: "center", lineHeight: 22 }}
          >
            {failed
              ? "O mapa não carregou. Recarregue a página e confira sua conexão."
              : "Preparando outros caminhos por São Paulo…"}
          </Text>
        </View>
      )}
    </View>
  );
}
