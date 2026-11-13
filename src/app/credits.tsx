import React, { useState } from "react";
import { Linking, Text, View } from "react-native";
import { Page, Heading, Button, s, colors } from "../components/ui";
import { credits } from "../data/credits";
export default function Credits() {
  const [error, setError] = useState("");
  function open(url: string) {
    void Linking.openURL(url).catch(() =>
      setError("Não foi possível abrir o link. Confira sua conexão."),
    );
  }
  return (
    <Page>
      <Heading
        eyebrow="QUEM NOS AJUDOU A VER"
        title="Um olhar, muitos autores."
        subtitle="Fotografias reais dos locais, com autoria e licenças abertas. São registros de arquivo; o espaço pode ter mudado."
      />
      {credits.map((item) => (
        <View
          key={item.place}
          style={{
            gap: 12,
            paddingVertical: 25,
            borderBottomWidth: 1,
            borderColor: colors.line,
          }}
        >
          <Text
            style={{ fontFamily: "Serif", fontSize: 32, color: colors.green }}
          >
            {item.place}
          </Text>
          <Text style={s.body}>
            {item.author} · {item.license}
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
            <Button
              secondary
              label="Ver fotografia original ↗"
              onPress={() => open(item.source)}
            />
            <Button
              secondary
              label="Ver licença ↗"
              onPress={() => open(item.url)}
            />
          </View>
        </View>
      ))}
      <View style={{ gap: 12, marginTop: 30 }}>
        <Text style={s.body}>
          Fotografias redimensionadas e convertidas para JPEG; a interface
          recorta a exibição. A imagem da Vila Itororó e suas adaptações
          conservam a licença CC BY-SA 4.0.
        </Text>
        <Text style={s.body}>
          A imagem de abertura é uma cena fictícia gerada por IA com OpenAI
          ImageGen. Não representa um dos locais do catálogo. Mapas:
          OpenStreetMap contributors e Leaflet (BSD-2-Clause). Fontes: DM Sans e
          Cormorant Garamond (SIL Open Font License).
        </Text>
        <Text style={s.fine}>
          Conteúdo editorial com fontes oficiais em cada lugar. Este é um guia
          independente, sem vínculo com os estabelecimentos.
        </Text>
        {error && (
          <Text accessibilityRole="alert" style={s.body}>
            {error}
          </Text>
        )}
      </View>
    </Page>
  );
}
