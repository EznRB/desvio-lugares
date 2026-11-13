import React from "react";
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
  return (
    <View style={styles.paper}>
      <Text style={styles.eyebrow}>SEUS PONTOS DE PARTIDA</Text>
      <Text style={styles.title}>O litoral, por outro caminho.</Text>
      <Text style={styles.help}>
        Escolha um lugar para explorar. Abra o mapa para ver a localização e
        traçar seu caminho.
      </Text>
      <ScrollView style={{ maxHeight: 330 }}>
        {places.map((place, index) => (
          <View
            key={place.id}
            style={[styles.row, selectedId === place.id && styles.selected]}
          >
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Explorar ${place.name}`}
              onPress={() => onSelect(place.id)}
              style={styles.place}
            >
              <Text style={styles.number}>
                {String(index + 1).padStart(2, "0")}
              </Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{place.name}</Text>
                <Text style={styles.neighborhood}>
                  {place.city} · {place.neighborhood}
                </Text>
              </View>
            </Pressable>
            <Pressable
              accessibilityRole="link"
              accessibilityLabel={`Abrir ${place.name} no Google Maps`}
              onPress={() => {
                void Linking.openURL(
                  `https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}`,
                );
              }}
              style={styles.open}
            >
              <Text style={styles.openText}>Mapa ↗</Text>
            </Pressable>
          </View>
        ))}
        {!places.length && (
          <Text style={styles.help}>
            Nenhum lugar com estes filtros. Experimente outro caminho.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  paper: { padding: 24, backgroundColor: "#E9ECDD", borderRadius: 16 },
  eyebrow: {
    fontSize: 10,
    letterSpacing: 2,
    color: "#536347",
    fontWeight: "700",
  },
  title: {
    fontSize: 27,
    color: "#233D2B",
    marginTop: 12,
    marginBottom: 10,
    fontWeight: "600",
  },
  help: { fontSize: 14, lineHeight: 22, color: "#606957", marginBottom: 20 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#CED5C3",
    paddingVertical: 12,
  },
  selected: { backgroundColor: "#DAE3CD" },
  place: { flex: 1, flexDirection: "row", gap: 14, alignItems: "center" },
  number: { color: "#3D593C", fontSize: 12 },
  name: { color: "#233D2B", fontSize: 15, fontWeight: "600" },
  neighborhood: { color: "#6A725F", fontSize: 12, marginTop: 4 },
  open: { padding: 10 },
  openText: { color: "#2F5739", fontSize: 12, fontWeight: "700" },
});
