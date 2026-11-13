import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { useData } from "../store";
import { places } from "../data/places";
import { Button, Heading, Page } from "../components/ui";

export default function PassportScreen() {
  const { data, ready, error, update } = useData();
  const [removing, setRemoving] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const visits = Object.entries(data.visits)
    .flatMap(([id, visit]) => {
      const place = places.find((p) => p.id === id);
      return place ? [{ place, visit }] : [];
    })
    .sort(
      (a, b) => Date.parse(b.visit.visitedAt) - Date.parse(a.visit.visitedAt),
    );
  async function remove(id: string) {
    setRemoving(id);
    setMessage("");
    try {
      await update((current) => {
        const next = { ...current.visits };
        delete next[id];
        return { ...current, visits: next };
      });
      setConfirm(null);
    } catch {
      setMessage("Não foi possível remover a visita. Tente novamente.");
    } finally {
      setRemoving(null);
    }
  }
  return (
    <Page>
      <Heading
        eyebrow="MEMÓRIAS DE QUEM SAIU DO ÓBVIO"
        title="Seu passaporte do litoral."
        subtitle="O litoral também fica guardado em quem passa por ele."
      />
      {!ready ? (
        <Text style={s.copy}>{error || "Abrindo suas memórias…"}</Text>
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
          <View style={s.summary}>
            <Text style={s.total}>
              {String(visits.length).padStart(2, "0")}
            </Text>
            <View>
              <Text style={s.summaryTitle}>
                {visits.length === 1
                  ? "descoberta vivida"
                  : "descobertas vividas"}
              </Text>
              <Text style={s.copy}>
                Seu diário fica salvo neste dispositivo.
              </Text>
            </View>
            <Text style={s.stamp}>LITORAL NORTE{"\n"}EXPLORADOR LOCAL</Text>
          </View>
          {!visits.length ? (
            <View style={s.empty}>
              <Text style={s.title}>A primeira história está lá fora.</Text>
              <Text style={s.copy}>
                Visite um lugar e registre a descoberta na página dele. Uma
                nota, uma foto, uma lembrança sua.
              </Text>
              <Button
                label="Escolher uma descoberta ↗"
                onPress={() => router.push("/")}
              />
            </View>
          ) : (
            visits.map(({ place, visit }) => (
              <View key={place.id} style={s.card}>
                <View style={s.top}>
                  <Text style={s.date}>
                    {new Date(visit.visitedAt).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </Text>
                  <Text style={[s.badge, !visit.gpsVerified && s.manual]}>
                    {visit.gpsVerified
                      ? "✓ PROXIMIDADE VERIFICADA POR GPS"
                      : "REGISTRO MANUAL · SEM GPS"}
                  </Text>
                </View>
                <Pressable
                  accessibilityRole="link"
                  onPress={() => router.push(`/place/${place.id}`)}
                >
                  <Text style={s.title}>{place.name} ↗</Text>
                </Pressable>
                <Text style={s.copy}>
                  {place.neighborhood} · {place.city}
                </Text>
                {visit.photoUri && (
                  <Image
                    source={{ uri: visit.photoUri }}
                    style={s.photo}
                    accessibilityLabel={`Minha foto em ${place.name}`}
                  />
                )}
                <Text style={[s.note, !visit.note && s.muted]}>
                  {visit.note || "Uma descoberta guardada. Ainda sem uma nota."}
                </Text>
                {confirm === place.id ? (
                  <View style={s.confirm}>
                    <Text style={s.copy}>
                      Remover esta visita e sua nota do passaporte?
                    </Text>
                    <View style={s.actions}>
                      <Button
                        label={
                          removing === place.id ? "Removendo…" : "Sim, remover"
                        }
                        disabled={removing !== null}
                        onPress={() => void remove(place.id)}
                      />
                      <Button
                        label="Manter memória"
                        secondary
                        disabled={removing !== null}
                        onPress={() => setConfirm(null)}
                      />
                    </View>
                  </View>
                ) : (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`Remover visita a ${place.name}`}
                    onPress={() => setConfirm(place.id)}
                    style={s.remove}
                  >
                    <Text style={s.removeText}>Remover registro</Text>
                  </Pressable>
                )}
              </View>
            ))
          )}
        </>
      )}
    </Page>
  );
}
const s = StyleSheet.create({
  copy: { fontFamily: "DM", fontSize: 14, lineHeight: 23, color: "#68736A" },
  error: { fontFamily: "DM", color: "#963E32", marginBottom: 16 },
  summary: {
    backgroundColor: "#E9EDDF",
    borderRadius: 14,
    padding: 26,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 24,
    marginBottom: 32,
  },
  total: { fontFamily: "Serif", fontSize: 64, color: "#173D33" },
  summaryTitle: { fontFamily: "Serif", color: "#173D33", fontSize: 27 },
  stamp: {
    fontFamily: "DM",
    color: "#60775B",
    borderWidth: 1,
    borderColor: "#8C9B80",
    borderRadius: 60,
    textAlign: "center",
    padding: 22,
    fontSize: 9,
    lineHeight: 18,
    letterSpacing: 1,
    transform: [{ rotate: "-8deg" }],
  },
  empty: {
    padding: 30,
    gap: 22,
    borderWidth: 1,
    borderColor: "#DEDED2",
    borderRadius: 14,
  },
  title: { fontFamily: "Serif", fontSize: 32, color: "#173D33" },
  card: {
    paddingVertical: 28,
    borderTopWidth: 1,
    borderTopColor: "#DEDED2",
    gap: 12,
  },
  top: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    alignItems: "center",
    justifyContent: "space-between",
  },
  date: { fontFamily: "DM", fontSize: 12, color: "#7E8478" },
  badge: {
    fontFamily: "DM",
    fontSize: 9,
    letterSpacing: 0.7,
    color: "#335D3E",
    backgroundColor: "#E7EDDF",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 4,
  },
  manual: { backgroundColor: "#EFE9DC", color: "#87714D" },
  photo: {
    width: "100%",
    maxWidth: 650,
    height: 280,
    borderRadius: 12,
    marginTop: 10,
  },
  note: {
    fontFamily: "DM",
    fontSize: 16,
    lineHeight: 27,
    color: "#3D5144",
    maxWidth: 700,
    marginTop: 8,
  },
  muted: { color: "#92978A", fontStyle: "italic" },
  remove: { alignSelf: "flex-start", minHeight: 44, justifyContent: "center" },
  removeText: { fontFamily: "DM", fontSize: 12, color: "#916052" },
  confirm: {
    gap: 14,
    backgroundColor: "#EFEADD",
    borderRadius: 10,
    padding: 18,
  },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
});
