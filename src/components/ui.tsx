import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { router, usePathname } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export const colors = {
  paper: "#F8F6F0",
  green: "#173D33",
  lime: "#DAF46E",
  muted: "#6B746B",
  line: "#DCDDD2",
  white: "#FFFFFF",
};
export function Button({
  label,
  onPress,
  secondary = false,
  disabled = false,
}: {
  label: string;
  onPress: () => void;
  secondary?: boolean;
  disabled?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        s.button,
        secondary && s.secondary,
        { opacity: disabled ? 0.4 : pressed ? 0.75 : 1 },
      ]}
    >
      <Text style={[s.buttonText, secondary && { color: colors.green }]}>
        {label}
      </Text>
    </Pressable>
  );
}
export function Heading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <View style={{ gap: 12, marginVertical: 30 }}>
      {eyebrow && <Text style={s.eyebrow}>{eyebrow.toUpperCase()}</Text>}
      <Text accessibilityRole="header" style={s.title}>
        {title}
      </Text>
      {subtitle && <Text style={s.body}>{subtitle}</Text>}
    </View>
  );
}
export function Page({ children }: { children: React.ReactNode }) {
  const { width } = useWindowDimensions();
  const path = usePathname();
  const insets = useSafeAreaInsets();
  const small = width < 720;
  const nav = [
    ["Descobrir", "/"],
    ["Meu roteiro", "/route"],
    ["Favoritos", "/saved"],
    ["Passaporte", "/passport"],
  ] as const;
  return (
    <View
      style={{ flex: 1, backgroundColor: colors.paper, paddingTop: insets.top }}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: small ? 90 : 0 }}>
        <View style={[s.nav, { paddingHorizontal: small ? 22 : 48 }]}>
          <Pressable
            accessibilityRole="link"
            accessibilityLabel="Desvio, início"
            onPress={() => router.push("/")}
          >
            <Text style={s.logo}>↗ desvio</Text>
          </Pressable>
          {!small && (
            <View style={s.links}>
              {nav.map(([name, url]) => (
                <Pressable
                  accessibilityRole="link"
                  key={url}
                  onPress={() => router.push(url)}
                >
                  <Text
                    style={{
                      fontFamily: "DM",
                      fontSize: 14,
                      color: colors.green,
                      opacity: path === url ? 1 : 0.65,
                      borderBottomWidth: path === url ? 1 : 0,
                      paddingVertical: 8,
                    }}
                  >
                    {name}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
          <Text style={s.location}>◎ LITORAL NORTE, SP</Text>
        </View>
        <View
          style={{
            width: "100%",
            maxWidth: 1376,
            alignSelf: "center",
            paddingHorizontal: small ? 22 : 48,
          }}
        >
          {children}
        </View>
        <View style={s.footer}>
          <Text style={s.logo}>↗ desvio</Text>
          <Text style={s.body}>Outros caminhos entre a serra e o mar.</Text>
          <Pressable
            accessibilityRole="link"
            onPress={() => router.push("/credits")}
          >
            <Text style={[s.fine, { textDecorationLine: "underline" }]}>
              Fotografias e créditos ↗
            </Text>
          </Pressable>
          <Text style={s.fine}>
            Guia editorial independente · Litoral Norte de SP{"\n"}Visite os
            canais oficiais antes de sair. Respeite cada lugar.
          </Text>
        </View>
      </ScrollView>
      {small && (
        <View
          style={[s.bottom, { paddingBottom: Math.max(insets.bottom, 12) }]}
        >
          {nav.map(([name, url]) => (
            <Pressable
              accessibilityRole="link"
              key={url}
              onPress={() => router.push(url)}
            >
              <Text
                style={{
                  fontFamily: "DM",
                  fontSize: 11,
                  color: path === url ? colors.green : colors.muted,
                }}
              >
                {name}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}
export const s = StyleSheet.create({
  nav: {
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: colors.line,
  },
  logo: {
    fontFamily: "DM",
    fontSize: 31,
    letterSpacing: -1.7,
    color: colors.green,
  },
  links: { flexDirection: "row", gap: 30 },
  location: {
    fontFamily: "DM",
    fontSize: 10,
    letterSpacing: 1.6,
    color: colors.green,
  },
  eyebrow: {
    fontFamily: "DM",
    fontSize: 11,
    letterSpacing: 2,
    color: colors.green,
  },
  title: {
    fontFamily: "Serif",
    fontSize: 60,
    lineHeight: 65,
    color: colors.green,
  },
  body: { fontFamily: "DM", fontSize: 15, lineHeight: 25, color: colors.muted },
  fine: { fontFamily: "DM", fontSize: 11, lineHeight: 19, color: colors.muted },
  button: {
    backgroundColor: colors.green,
    paddingVertical: 17,
    paddingHorizontal: 25,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  secondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.line,
  },
  buttonText: { fontFamily: "DM", fontSize: 13, color: colors.white },
  footer: {
    padding: 42,
    marginTop: 80,
    borderTopWidth: 1,
    borderColor: colors.line,
    gap: 14,
    alignItems: "center",
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.paper,
    borderTopWidth: 1,
    borderColor: colors.line,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 19,
  },
});
