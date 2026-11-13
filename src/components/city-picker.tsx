import React, { useState } from "react";
import { Linking, Pressable, Text, View } from "react-native";
import type { City } from "../domain";
import { cities, bathingSource, ferrySource } from "../data/cities";
import { Button, colors, s } from "./ui";
export default function CityPicker({
  city,
  onChange,
}: {
  city: City | "todos";
  onChange: (city: City | "todos") => void;
}) {
  const [error, setError] = useState("");
  const selected = cities.find((item) => item.name === city);
  const open = (url: string) =>
    void Linking.openURL(url).catch(() =>
      setError("Não foi possível abrir o link. Confira sua conexão."),
    );
  return (
    <View style={{ gap: 16, marginVertical: 16 }}>
      <Text style={s.eyebrow}>QUAL É O SEU TRECHO DO LITORAL?</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 9 }}>
        {(["todos", ...cities.map((item) => item.name)] as const).map(
          (name) => (
            <Pressable
              key={name}
              accessibilityRole="button"
              accessibilityLabel={
                name === "todos" ? "Todas as cidades" : `Cidade: ${name}`
              }
              accessibilityState={{ selected: city === name }}
              aria-pressed={city === name}
              onPress={() => onChange(name)}
              style={{
                paddingHorizontal: 18,
                paddingVertical: 13,
                borderWidth: 1,
                borderColor: city === name ? colors.green : colors.line,
                borderRadius: 30,
                backgroundColor: city === name ? colors.lime : "transparent",
              }}
            >
              <Text
                style={{ fontFamily: "DM", fontSize: 13, color: colors.green }}
              >
                {name === "todos" ? "Todo o Litoral Norte" : name}
              </Text>
            </Pressable>
          ),
        )}
      </View>
      <View
        style={{
          padding: 24,
          borderRadius: 12,
          backgroundColor: "#ECEEE1",
          gap: 12,
        }}
      >
        <Text
          accessibilityRole="header"
          style={{ fontFamily: "Serif", fontSize: 32, color: colors.green }}
        >
          {selected?.name ?? "Da serra ao mar."}
        </Text>
        <Text style={s.body}>
          {selected?.description ??
            "Praias, cultura caiçara e natureza. Escolha uma cidade para conhecer seus lugares e planejar as paradas."}
        </Text>
        <Text style={s.fine}>
          {selected?.tip ??
            "Três descobertas por cidade. Durações estimam a visita, sem deslocamento. Confira as condições locais."}
        </Text>
        <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
          {selected && (
            <Button
              secondary
              label="Turismo e informações da cidade ↗"
              onPress={() => open(selected.source)}
            />
          )}
          <Button
            secondary
            label="Consultar balneabilidade · CETESB ↗"
            onPress={() => open(bathingSource)}
          />
          {city === "Ilhabela" && (
            <Button
              secondary
              label="Informações da travessia ↗"
              onPress={() => open(ferrySource)}
            />
          )}
        </View>
        {error && (
          <Text accessibilityRole="alert" style={s.body}>
            {error}
          </Text>
        )}
      </View>
    </View>
  );
}
