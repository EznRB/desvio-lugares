import React, { useState } from "react";
import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import { useData } from "../store";
import { places } from "../data/places";
import { buildRouteLink } from "../domain";
import { cover } from "../images";
import { Button, Heading, Page } from "../components/ui";

export default function RouteScreen() {
  const { data, ready, error, update } = useData();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const stops = data.route.flatMap((id) => {
    const place = places.find((p) => p.id === id);
    return place ? [place] : [];
  });
  async function change(id: string, direction: number | null) {
    setBusy(true);
    setMessage("");
    try {
      await update((current) => {
        const route = [...current.route];
        const index = route.indexOf(id);
        if (index < 0) return current;
        if (direction === null) route.splice(index, 1);
        else {
          const target = index + direction;
          if (target < 0 || target >= route.length) return current;
          [route[index], route[target]] = [route[target], route[index]];
        }
        return { ...current, route };
      });
    } catch {
      setMessage("Não foi possível salvar seu roteiro. Tente novamente.");
    } finally {
      setBusy(false);
    }
  }
  async function open() {
    setMessage("");
    try {
      await Linking.openURL(buildRouteLink(stops));
    } catch {
      setMessage(
        "Não foi possível abrir o Google Maps. Confira sua conexão e tente novamente.",
      );
    }
  }
  return (
    <Page>
      <Heading
        eyebrow="UM DIA SEM PRESSA"
        title="Seu próximo desvio."
        subtitle="Escolha a ordem. Deixe espaço para o inesperado."
      />
      {!ready ? (
        <Text style={s.copy}>{error || "Preparando seu roteiro…"}</Text>
      ) : (
        <>
          {!!error && (
            <Text accessibilityRole="alert" style={s.error}>
              {error}
            </Text>
          )}
          {!!message && (
            <Text accessibilityRole="alert" style={s.error}>
              {message}
            </Text>
          )}
          {!stops.length ? (
            <View style={s.empty}>
              <Text style={s.emptyTitle}>
                Todo caminho começa com uma escolha.
              </Text>
              <Text style={s.copy}>
                Adicione até 6 lugares ao roteiro na página de cada descoberta.
              </Text>
              <Button
                label="Encontrar meu primeiro lugar ↗"
                onPress={() => router.push("/")}
              />
            </View>
          ) : (
            <>
              <View style={s.summary}>
                <Text style={s.count}>
                  {stops.length.toString().padStart(2, "0")} PARADAS
                </Text>
                <Text style={s.copy}>
                  {stops.reduce((total, place) => total + place.duration, 0)}{" "}
                  min de visita · deslocamento à parte
                </Text>
              </View>
              {stops.map((place, index) => (
                <View key={place.id} style={s.card}>
                  <Text style={s.number}>
                    {String(index + 1).padStart(2, "0")}
                  </Text>
                  <Image
                    source={cover(place.id)}
                    style={s.image}
                    accessibilityLabel={place.name}
                  />
                  <View style={s.info}>
                    <Pressable
                      accessibilityRole="link"
                      onPress={() => router.push(`/place/${place.id}`)}
                    >
                      <Text style={s.name}>{place.name}</Text>
                    </Pressable>
                    <Text style={s.copy}>
                      {place.neighborhood} · {place.duration} min
                    </Text>
                    <View style={s.actions}>
                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={`Subir ${place.name}`}
                        disabled={busy || index === 0}
                        onPress={() => void change(place.id, -1)}
                        style={[s.control, index === 0 && s.disabled]}
                      >
                        <Text style={s.controlText}>↑ Subir</Text>
                      </Pressable>
                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={`Descer ${place.name}`}
                        disabled={busy || index === stops.length - 1}
                        onPress={() => void change(place.id, 1)}
                        style={[
                          s.control,
                          index === stops.length - 1 && s.disabled,
                        ]}
                      >
                        <Text style={s.controlText}>↓ Descer</Text>
                      </Pressable>
                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={`Remover ${place.name} do roteiro`}
                        disabled={busy}
                        onPress={() => void change(place.id, null)}
                        style={s.control}
                      >
                        <Text style={s.remove}>Remover</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              ))}
              <View style={s.footer}>
                <Text style={s.copy}>
                  O Google Maps calcula o caminho a pé a partir da sua
                  localização. Confira horários e condições antes de sair.
                </Text>
                <Button
                  label="Abrir roteiro no Google Maps ↗"
                  disabled={busy || stops.length > 6}
                  onPress={() => void open()}
                />
              </View>
            </>
          )}
        </>
      )}
    </Page>
  );
}
const s = StyleSheet.create({
  copy: { fontFamily: "DM", fontSize: 14, lineHeight: 23, color: "#68736A" },
  error: { fontFamily: "DM", color: "#963E32", marginBottom: 16 },
  empty: { backgroundColor: "#ECEFE4", padding: 30, borderRadius: 16, gap: 20 },
  emptyTitle: { fontFamily: "Serif", color: "#173D33", fontSize: 34 },
  summary: { gap: 7, marginBottom: 24 },
  count: { fontFamily: "DM", letterSpacing: 2, fontSize: 11, color: "#173D33" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: "#DEDED2",
    paddingVertical: 22,
  },
  number: { fontFamily: "Serif", fontSize: 28, color: "#8C977F", width: 34 },
  image: { width: 86, height: 100, borderRadius: 8 },
  info: { flex: 1, minWidth: 170, gap: 8 },
  name: { fontFamily: "Serif", color: "#173D33", fontSize: 26 },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  control: { minHeight: 44, justifyContent: "center", paddingHorizontal: 10 },
  controlText: { fontFamily: "DM", color: "#173D33", fontSize: 12 },
  remove: { fontFamily: "DM", fontSize: 12, color: "#916052" },
  disabled: { opacity: 0.3 },
  footer: { gap: 22, marginTop: 28, maxWidth: 650 },
});
