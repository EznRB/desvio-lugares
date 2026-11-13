import { Stack } from "expo-router/stack";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { DMSans_400Regular } from "@expo-google-fonts/dm-sans/400Regular";
import { CormorantGaramond_500Medium } from "@expo-google-fonts/cormorant-garamond/500Medium";
import { CormorantGaramond_500Medium_Italic } from "@expo-google-fonts/cormorant-garamond/500Medium_Italic";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DataProvider } from "../store";
export default function Layout() {
  const [loaded, error] = useFonts({
    DM: DMSans_400Regular,
    Serif: CormorantGaramond_500Medium,
    Italic: CormorantGaramond_500Medium_Italic,
  });
  if (!loaded && !error) return null;
  return (
    <SafeAreaProvider>
      <DataProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#F8F6F0" },
            animation: "fade",
          }}
        />
      </DataProvider>
    </SafeAreaProvider>
  );
}
