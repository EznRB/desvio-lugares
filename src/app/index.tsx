import React, { useMemo, useRef, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { router } from "expo-router";
import { coastalPlaces } from "../data/places";
import { filterPlaces, type Category, type City } from "../domain";
import { hero } from "../images";
import { Page, Button, colors, s } from "../components/ui";
import CityPicker from "../components/city-picker";
import PlaceCard from "../components/place-card";
import PlaceMap from "../components/place-map";
import { useData } from "../store";
export default function Discover() {
  const { width } = useWindowDimensions();
  const small = width < 760;
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "todos">("todos");
  const [city, setCity] = useState<City | "todos">("todos");
  const [onlyFree, setOnlyFree] = useState(false);
  const [map, setMap] = useState(false);
  const [selected, setSelected] = useState<string>();
  const input = useRef<React.ComponentRef<typeof TextInput>>(null);
  const { error } = useData();
  const filtered = useMemo(
    () => filterPlaces(coastalPlaces, { query, category, city, onlyFree }),
    [query, category, city, onlyFree],
  );
  const columns = width > 1100 ? 3 : width > 650 ? 2 : 1;
  return (
    <Page>
      <View
        style={{
          flexDirection: small ? "column" : "row",
          gap: small ? 30 : 48,
          paddingTop: 45,
          paddingBottom: 55,
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: small ? undefined : 1,
            width: small ? "100%" : undefined,
            gap: 25,
          }}
        >
          <View style={{ flexDirection: "row", gap: 9, alignItems: "center" }}>
            <View
              style={{
                width: 7,
                height: 7,
                borderRadius: 8,
                backgroundColor: "#A9BC56",
              }}
            />
            <Text style={s.eyebrow}>PARA QUEM PREFERE DESCOBRIR</Text>
          </View>
          <Text
            accessibilityRole="header"
            style={{
              fontFamily: "Serif",
              fontSize: small ? 66 : 91,
              lineHeight: small ? 64 : 86,
              color: colors.green,
              letterSpacing: -2,
            }}
          >
            O litoral ainda{"\n"}tem{" "}
            <Text style={{ fontFamily: "Italic" }}>segredos.</Text>
          </Text>
          <Text style={[s.body, { maxWidth: 380 }]}>
            A enseada depois da curva. A cultura caiçara. Descubra outros
            caminhos entre a serra e o mar.
          </Text>
          <View style={{ alignItems: "flex-start" }}>
            <Button
              label="Encontre seu próximo desvio  ↗"
              onPress={() => input.current?.focus()}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 16,
              alignItems: "center",
              marginTop: 7,
            }}
          >
            <Text style={{ fontSize: 33, color: colors.green }}>✳</Text>
            <Text style={[s.fine, { maxWidth: 250 }]}>
              Menos lista de pontos turísticos.{"\n"}Mais histórias para levar
              com você.
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: small ? undefined : 1,
            width: small ? "100%" : undefined,
            paddingBottom: 20,
          }}
        >
          <Image
            source={hero}
            style={{
              height: small ? 360 : 505,
              width: "100%",
              borderTopLeftRadius: 140,
              borderTopRightRadius: 12,
              borderBottomRightRadius: 100,
              borderBottomLeftRadius: 12,
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: small ? 12 : -20,
              right: small ? 12 : 65,
              backgroundColor: colors.paper,
              borderWidth: 1,
              borderColor: colors.line,
              borderRadius: 8,
              padding: 19,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
            }}
          >
            <View style={{ gap: 6, flex: 1 }}>
              <Text style={s.eyebrow}>O MELHOR CAMINHO?</Text>
              <Text
                style={{
                  fontFamily: "Serif",
                  fontSize: 27,
                  color: colors.green,
                }}
              >
                Aquele que surpreende.
              </Text>
            </View>
            <Pressable
              accessibilityRole="link"
              accessibilityLabel="Montar meu roteiro"
              onPress={() => router.push("/route")}
              style={{
                width: 45,
                height: 45,
                borderRadius: 50,
                backgroundColor: colors.lime,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 25, color: colors.green }}>↗</Text>
            </Pressable>
          </View>
          <Text
            style={[
              s.fine,
              {
                position: "absolute",
                top: 15,
                right: 15,
                backgroundColor: "#173D33CC",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 20,
                color: "white",
                fontSize: 9,
              },
            ]}
          >
            PRAIA DO JABAQUARA · ILHABELA
          </Text>
        </View>
      </View>
      <View
        style={{
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: colors.line,
          paddingVertical: 21,
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 15,
          flexWrap: "wrap",
        }}
      >
        {[
          "01  Escolha um lugar",
          "02  Monte seu caminho",
          "03  Guarde a descoberta",
        ].map((text) => (
          <Text
            key={text}
            style={{ fontFamily: "DM", fontSize: 12, color: colors.green }}
          >
            {text}
          </Text>
        ))}
      </View>
      <View style={{ marginTop: 55, gap: 12 }}>
        <Text style={s.eyebrow}>LITORAL NORTE, POR OUTRO ÂNGULO</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Text
            accessibilityRole="header"
            style={{
              fontFamily: "Serif",
              fontSize: small ? 40 : 52,
              color: colors.green,
              flex: 1,
            }}
          >
            Seu próximo achado.
          </Text>
          <View
            style={{
              flexDirection: "row",
              borderWidth: 1,
              borderColor: colors.line,
              borderRadius: 30,
              padding: 4,
            }}
          >
            {[false, true].map((value) => (
              <Pressable
                key={String(value)}
                accessibilityRole="button"
                accessibilityState={{ selected: map === value }}
                aria-pressed={map === value}
                onPress={() => setMap(value)}
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  borderRadius: 30,
                  backgroundColor: map === value ? colors.green : "transparent",
                }}
              >
                <Text
                  style={{
                    fontFamily: "DM",
                    fontSize: 12,
                    color: map === value ? colors.white : colors.green,
                  }}
                >
                  {value ? "Mapa" : "Lista"}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
        <Text style={s.body}>
          Praias, natureza e cultura em quatro cidades.
        </Text>
        <CityPicker
          city={city}
          onChange={(value) => {
            setCity(value);
            setSelected(undefined);
          }}
        />
        <View
          style={{
            flexDirection: small ? "column" : "row",
            gap: 12,
            marginTop: 15,
          }}
        >
          <TextInput
            ref={input}
            accessibilityLabel="Buscar lugares"
            placeholder="Busque um lugar, bairro ou interesse..."
            value={query}
            onChangeText={setQuery}
            placeholderTextColor={colors.muted}
            style={{
              flex: 1,
              minHeight: 52,
              borderWidth: 1,
              borderColor: colors.line,
              borderRadius: 30,
              paddingHorizontal: 22,
              fontFamily: "DM",
              fontSize: 14,
              color: colors.green,
              backgroundColor: "#FFFFFF88",
            }}
          />
          <Pressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked: onlyFree }}
            aria-checked={onlyFree}
            onPress={() => setOnlyFree(!onlyFree)}
            style={{
              padding: 16,
              borderRadius: 30,
              borderWidth: 1,
              borderColor: onlyFree ? colors.green : colors.line,
              backgroundColor: onlyFree ? colors.lime : "transparent",
            }}
          >
            <Text
              style={{ fontFamily: "DM", fontSize: 13, color: colors.green }}
            >
              {onlyFree ? "✓" : "○"} Entrada gratuita
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            marginVertical: 12,
          }}
        >
          {(
            [
              ["todos", "Todos os lugares"],
              ["praia", "Praias"],
              ["cultura", "Cultura & arte"],
              ["natureza", "Um pouco de verde"],
              ["arquitetura", "Arquitetura"],
            ] as const
          ).map(([id, label]) => (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: category === id }}
              aria-pressed={category === id}
              key={id}
              onPress={() => setCategory(id)}
              style={{
                paddingVertical: 11,
                paddingHorizontal: 18,
                borderRadius: 25,
                backgroundColor: category === id ? colors.green : "#EEEEE5",
              }}
            >
              <Text
                style={{
                  fontFamily: "DM",
                  fontSize: 12,
                  color: category === id ? "white" : colors.green,
                }}
              >
                {label}
              </Text>
            </Pressable>
          ))}
        </View>
        <Text accessibilityLiveRegion="polite" style={s.fine}>
          {filtered.length}{" "}
          {filtered.length === 1 ? "lugar encontrado" : "lugares encontrados"} ·
          curadoria do Litoral Norte
        </Text>
        {error && (
          <Text accessibilityRole="alert" style={s.body}>
            {error}
          </Text>
        )}
        {filtered.length === 0 ? (
          <View style={{ paddingVertical: 50, gap: 18 }}>
            <Text style={s.body}>
              Nenhum lugar com essa combinação. Que tal abrir o caminho?
            </Text>
            <Button
              label="Limpar filtros"
              secondary
              onPress={() => {
                setQuery("");
                setCategory("todos");
                setCity("todos");
                setOnlyFree(false);
              }}
            />
          </View>
        ) : map ? (
          <View style={{ gap: 20, marginTop: 10 }}>
            <PlaceMap
              places={filtered}
              selectedId={selected}
              onSelect={setSelected}
            />
            {selected && filtered.some((p) => p.id === selected) && (
              <PlaceCard place={filtered.find((p) => p.id === selected)!} />
            )}
          </View>
        ) : (
          <FlatList
            key={columns}
            scrollEnabled={false}
            data={filtered}
            numColumns={columns}
            keyExtractor={(p) => p.id}
            columnWrapperStyle={columns > 1 ? { gap: 26 } : undefined}
            contentContainerStyle={{ gap: 35, paddingTop: 10 }}
            renderItem={({ item }) => <PlaceCard place={item} />}
          />
        )}
      </View>
      <View
        style={{
          marginTop: 70,
          borderRadius: 12,
          backgroundColor: colors.green,
          padding: small ? 28 : 45,
          flexDirection: small ? "column" : "row",
          gap: 25,
          alignItems: small ? "flex-start" : "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 1, gap: 10 }}>
          <Text style={[s.eyebrow, { color: colors.lime }]}>
            SEU PASSAPORTE É A CURIOSIDADE
          </Text>
          <Text
            style={{ fontFamily: "Serif", fontSize: 40, color: colors.paper }}
          >
            Colecione histórias,{"\n"}não só endereços.
          </Text>
          <Text style={[s.body, { color: "#D1D8CB", fontSize: 13 }]}>
            Registre visitas e guarde suas pequenas descobertas.
          </Text>
        </View>
        <View style={{ backgroundColor: colors.paper, borderRadius: 40 }}>
          <Button
            label="Abrir meu passaporte  ↗"
            secondary
            onPress={() => router.push("/passport")}
          />
        </View>
      </View>
    </Page>
  );
}
