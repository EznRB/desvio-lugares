import React, { useState } from "react";
import {
  Image,
  Linking,
  Platform,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { places } from "../../data/places";
import { distanceKm, type Place, type AppData } from "../../domain";
import { cover, photoCaption } from "../../images";
import { useData } from "../../store";
import { Page, Heading, Button, colors, s } from "../../components/ui";
import { capture, locate, tactile } from "../../native";
function VisitForm({
  place,
  visit,
}: {
  place: Place;
  visit: AppData["visits"][string] | undefined;
}) {
  const { update, ready } = useData();
  const [note, setNote] = useState(visit?.note ?? "");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function save(mode: "manual" | "gps" | "photo") {
    setBusy(true);
    setMessage("");
    try {
      let gps = visit?.gpsVerified ?? false;
      let photo = visit?.photoUri;
      if (mode === "gps") {
        const position = await locate();
        const distance = distanceKm(
          position.latitude,
          position.longitude,
          place.latitude,
          place.longitude,
        );
        if (distance > 0.25)
          throw new Error(
            `Você está a aproximadamente ${distance.toFixed(1)} km do ponto. Aproxime-se ou registre a visita manualmente.`,
          );
        gps = true;
      }
      if (mode === "photo") {
        const uri = await capture();
        if (!uri) return;
        photo = uri;
      }
      await update((d) => ({
        ...d,
        visits: {
          ...d.visits,
          [place.id]: {
            visitedAt:
              d.visits[place.id]?.visitedAt ?? new Date().toISOString(),
            note: note.trim(),
            gpsVerified: gps,
            ...(photo ? { photoUri: photo } : {}),
          },
        },
      }));
      tactile();
      setMessage("Descoberta guardada no seu passaporte.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível salvar sua visita. Tente novamente.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <View style={{ gap: 16 }}>
      <Text style={{ fontFamily: "Serif", fontSize: 35, color: colors.green }}>
        Leve uma história daqui.
      </Text>
      <Text style={s.body}>
        Já conhece este lugar? Guarde uma lembrança no seu passaporte pessoal.
      </Text>
      <TextInput
        accessibilityLabel="Sua lembrança da visita"
        editable={!busy && ready}
        multiline
        maxLength={280}
        value={note}
        onChangeText={setNote}
        placeholder="Uma descoberta, um detalhe, uma boa lembrança..."
        placeholderTextColor={colors.muted}
        style={{
          borderWidth: 1,
          borderColor: colors.line,
          borderRadius: 12,
          padding: 18,
          minHeight: 110,
          color: colors.green,
          fontFamily: "DM",
          fontSize: 14,
          textAlignVertical: "top",
        }}
      />
      <Text style={s.fine}>
        {note.length}/280 · salvo somente neste dispositivo
      </Text>
      <Button
        disabled={busy || !ready}
        label={
          busy
            ? "Guardando..."
            : visit
              ? "Salvar lembrança"
              : "Registrar visita"
        }
        onPress={() => void save("manual")}
      />
      {Platform.OS !== "web" ? (
        <>
          <Button
            disabled={busy || !ready}
            secondary
            label="Verificar proximidade com GPS"
            onPress={() => void save("gps")}
          />
          <Button
            disabled={busy || !ready}
            secondary
            label="Fotografar minha descoberta"
            onPress={() => void save("photo")}
          />
          <Text style={s.fine}>
            GPS confere proximidade de até 250 m de um ponto aproximado; não
            comprova entrada no local. Fotos ficam no aplicativo.
          </Text>
        </>
      ) : (
        <Text style={s.fine}>
          No aplicativo para celular, registre também uma foto e confira a
          proximidade por GPS. A visita registrada aqui é manual.
        </Text>
      )}
      {message && (
        <Text accessibilityLiveRegion="polite" style={s.body}>
          {message}
        </Text>
      )}
    </View>
  );
}
export default function PlaceDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const place = places.find((p) => p.id === id);
  const { data, update, ready, error } = useData();
  const [message, setMessage] = useState("");
  const { width } = useWindowDimensions();
  if (!place)
    return (
      <Page>
        <Heading
          title="Esse caminho não existe."
          subtitle="Escolha um dos lugares do nosso guia."
        />
        <Button
          label="Voltar para descobrir"
          onPress={() => router.replace("/")}
        />
      </Page>
    );
  const saved = data.favorites.includes(place.id);
  const inRoute = data.route.includes(place.id);
  async function act(mode: "save" | "route") {
    try {
      await update((d) => {
        if (mode === "save")
          return {
            ...d,
            favorites: d.favorites.includes(place!.id)
              ? d.favorites.filter((x) => x !== place!.id)
              : [...d.favorites, place!.id],
          };
        if (d.route.includes(place!.id))
          return { ...d, route: d.route.filter((x) => x !== place!.id) };
        if (d.route.length >= 6)
          throw new Error(
            "Seu roteiro já tem 6 paradas. Remova uma antes de adicionar outra.",
          );
        return { ...d, route: [...d.route, place!.id] };
      });
      tactile();
      setMessage("");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Não foi possível salvar.");
    }
  }
  const open = (url: string) =>
    void Linking.openURL(url).catch(() =>
      setMessage("Não foi possível abrir o link. Tente novamente."),
    );
  return (
    <Page>
      <View style={{ alignItems: "flex-start", marginTop: 25 }}>
        <Button
          secondary
          label="← Voltar a descobrir"
          onPress={() => router.push("/")}
        />
      </View>
      <Heading
        eyebrow={`${place.city} · ${place.category} · ${place.neighborhood}`}
        title={place.name}
        subtitle={place.description}
      />
      <Image
        source={cover(place.id)}
        style={{
          height: width < 720 ? 300 : 480,
          width: "100%",
          borderRadius: 12,
        }}
      />
      <Text style={[s.fine, { marginTop: 8 }]}>{photoCaption(place.id)}</Text>
      <View
        style={{
          flexDirection: width < 900 ? "column" : "row",
          gap: 50,
          marginTop: 35,
        }}
      >
        <View style={{ flex: 1, gap: 24 }}>
          <Text
            style={{ fontFamily: "Serif", fontSize: 39, color: colors.green }}
          >
            Um motivo para ir.
          </Text>
          <Text style={s.body}>{place.story}</Text>
          <View
            style={{
              backgroundColor: "#ECEEE1",
              padding: 25,
              borderRadius: 10,
              gap: 10,
            }}
          >
            <Text style={s.eyebrow}>ANTES DE SAIR</Text>
            <Text style={s.body}>{place.tip}</Text>
            <Text style={s.body}>◎ {place.address}</Text>
            <Text style={s.fine}>
              {place.priceLabel} · visita estimada: {place.duration} min
            </Text>
            <Button
              secondary
              label="Conferir informações oficiais ↗"
              onPress={() => open(place.source)}
            />
            <Text style={s.fine}>
              Programação e condições de acesso podem mudar. Confirme com o
              local.
            </Text>
          </View>
          <VisitForm
            key={`${place.id}-${ready}`}
            place={place}
            visit={data.visits[place.id]}
          />
        </View>
        <View
          style={{
            width: width < 900 ? "100%" : 310,
            gap: 16,
            padding: 25,
            borderWidth: 1,
            borderColor: colors.line,
            borderRadius: 12,
            alignSelf: "flex-start",
          }}
        >
          <Text
            style={{ fontFamily: "Serif", fontSize: 31, color: colors.green }}
          >
            Vale um desvio.
          </Text>
          <Text style={s.body}>
            Escolha o caminho agora. A descoberta fica por sua conta.
          </Text>
          <Button
            disabled={!ready}
            label={
              inRoute ? "✓ Remover do roteiro" : "Adicionar ao meu roteiro +"
            }
            onPress={() => void act("route")}
          />
          <Button
            disabled={!ready}
            secondary
            label={saved ? "♥ Remover dos favoritos" : "♡ Salvar nos favoritos"}
            onPress={() => void act("save")}
          />
          <Button
            secondary
            label="Ver meu roteiro ↗"
            onPress={() => router.push("/route")}
          />
          {(message || error) && (
            <Text accessibilityRole="alert" style={s.body}>
              {message || error}
            </Text>
          )}
        </View>
      </View>
    </Page>
  );
}
