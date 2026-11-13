import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { useData } from "../store";
import { places } from "../data/places";
import { cover } from "../images";
import { Button, Heading, Page } from "../components/ui";

export default function SavedScreen() {
  const { data, ready, error } = useData();
  const saved = data.favorites.flatMap((id) => {
    const place = places.find((p) => p.id === id);
    return place ? [place] : [];
  });
  return (
    <Page>
      <Heading
        eyebrow="PARA OUTRO DIA. OU HOJE."
        title="Lugares que ficaram."
        subtitle="Sua coleção particular de boas possibilidades."
      />
      {!ready ? (
        <Text style={s.copy}>{error || "Buscando seus lugares salvos…"}</Text>
      ) : (
        <>
          {!!error && (
            <Text accessibilityRole="alert" style={s.error}>
              {error}
            </Text>
          )}
          {!saved.length ? (
            <View style={s.empty}>
              <Text style={s.title}>Guarde uma vontade de ir.</Text>
              <Text style={s.copy}>
                Toque no coração de um lugar para encontrar sua próxima
                descoberta por aqui.
              </Text>
              <Button
                label="Explorar lugares ↗"
                onPress={() => router.push("/")}
              />
            </View>
          ) : (
            <>
              <Text style={s.count}>
                {saved.length}{" "}
                {saved.length === 1 ? "LUGAR SALVO" : "LUGARES SALVOS"}
              </Text>
              <View style={s.grid}>
                {saved.map((place) => (
                  <Pressable
                    key={place.id}
                    accessibilityRole="link"
                    accessibilityLabel={`Conhecer ${place.name}`}
                    onPress={() => router.push(`/place/${place.id}`)}
                    style={s.card}
                  >
                    <Image
                      source={cover(place.id)}
                      style={s.image}
                      accessibilityLabel={place.name}
                    />
                    <View style={s.content}>
                      <Text style={s.category}>
                        {place.category.toUpperCase()} ·{" "}
                        {place.neighborhood.toUpperCase()}
                      </Text>
                      <Text style={s.title}>{place.name}</Text>
                      <Text numberOfLines={2} style={s.copy}>
                        {place.description}
                      </Text>
                      <View style={s.bottom}>
                        <Text style={s.copy}>
                          {place.duration} min · {place.priceLabel}
                        </Text>
                        <Text style={s.arrow}>↗</Text>
                      </View>
                    </View>
                  </Pressable>
                ))}
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
  empty: { backgroundColor: "#ECEFE4", padding: 30, borderRadius: 16, gap: 22 },
  title: { fontFamily: "Serif", fontSize: 31, color: "#173D33" },
  count: {
    fontFamily: "DM",
    fontSize: 11,
    letterSpacing: 2,
    color: "#6A766B",
    marginBottom: 24,
  },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 24 },
  card: {
    flexGrow: 1,
    flexBasis: 310,
    maxWidth: 470,
    borderWidth: 1,
    borderColor: "#E0E1D6",
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#FBFAF5",
  },
  image: { width: "100%", height: 225 },
  content: { padding: 22, gap: 13 },
  category: {
    fontFamily: "DM",
    letterSpacing: 1.2,
    fontSize: 9,
    color: "#798372",
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  arrow: { fontSize: 25, color: "#173D33" },
});
