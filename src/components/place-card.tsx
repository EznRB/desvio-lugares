import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { useData } from "../store";
import { cover, contextualCaption } from "../images";
import type { Place } from "../domain";
import { colors, s } from "./ui";
import { tactile } from "../native";
export default function PlaceCard({ place }: { place: Place }) {
  const { data, update, ready } = useData();
  const [error, setError] = useState("");
  const saved = data.favorites.includes(place.id);
  return (
    <View style={{ flex: 1, minWidth: 0, gap: 12 }}>
      <View>
        <Pressable
          accessibilityRole="link"
          accessibilityLabel={`Conhecer ${place.name}`}
          onPress={() => router.push(`/place/${place.id}`)}
        >
          <Image
            source={cover(place.id)}
            style={{ width: "100%", height: 260, borderRadius: 9 }}
          />
          <View
            style={{
              position: "absolute",
              bottom: 15,
              left: 15,
              backgroundColor: colors.paper,
              paddingHorizontal: 12,
              paddingVertical: 7,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                fontFamily: "DM",
                fontSize: 10,
                color: colors.green,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              {place.category}
            </Text>
          </View>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${saved ? "Remover dos" : "Salvar nos"} favoritos: ${place.name}`}
          disabled={!ready}
          onPress={() => {
            void update((d) => ({
              ...d,
              favorites: d.favorites.includes(place.id)
                ? d.favorites.filter((id) => id !== place.id)
                : [...d.favorites, place.id],
            }))
              .then(tactile)
              .catch(() =>
                setError("Não foi possível salvar. Tente novamente."),
              );
          }}
          style={{
            position: "absolute",
            right: 13,
            top: 13,
            width: 38,
            height: 38,
            borderRadius: 30,
            backgroundColor: colors.paper,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 24, color: colors.green }}>
            {saved ? "♥" : "♡"}
          </Text>
        </Pressable>
      </View>
      {contextualCaption(place.id) && (
        <Text style={s.fine}>{contextualCaption(place.id)}</Text>
      )}
      <Pressable
        accessibilityRole="link"
        onPress={() => router.push(`/place/${place.id}`)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <Text
            style={{
              fontFamily: "Serif",
              fontSize: 30,
              color: colors.green,
              flex: 1,
            }}
          >
            {place.name}
          </Text>
          <Text style={{ color: colors.green, fontSize: 25 }}>↗</Text>
        </View>
        <Text style={[s.fine, { marginTop: 5 }]}>
          ◎ {place.city} · {place.neighborhood} · ~{place.duration} min de
          visita
        </Text>
        <Text
          numberOfLines={2}
          style={[s.body, { fontSize: 13, lineHeight: 21, marginTop: 10 }]}
        >
          {place.description}
        </Text>
      </Pressable>
      {error && (
        <Text accessibilityRole="alert" style={s.fine}>
          {error}
        </Text>
      )}
    </View>
  );
}
