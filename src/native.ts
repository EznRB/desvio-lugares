import { Platform } from "react-native";

export async function locate(): Promise<{
  latitude: number;
  longitude: number;
}> {
  if (Platform.OS === "web")
    throw new Error(
      "A verificação por GPS está disponível no aplicativo para celular.",
    );
  const Location = await import("expo-location");
  const permission = await Location.requestForegroundPermissionsAsync();
  if (!permission.granted)
    throw new Error(
      "Permita o acesso à localização nas configurações para verificar sua visita.",
    );
  if (!(await Location.hasServicesEnabledAsync()))
    throw new Error(
      "Ative a localização do celular para verificar sua visita.",
    );
  const position = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });
  return {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
}

export async function capture(): Promise<string | null> {
  if (Platform.OS === "web")
    throw new Error(
      "As fotos do diário estão disponíveis no aplicativo para celular.",
    );
  const ImagePicker = await import("expo-image-picker");
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  if (!permission.granted)
    throw new Error(
      "Permita o acesso à câmera nas configurações para registrar sua descoberta.",
    );
  const result = await ImagePicker.launchCameraAsync({
    quality: 0.7,
    allowsEditing: false,
    mediaTypes: ["images"],
  });
  if (result.canceled || !result.assets[0]) return null;
  const { File, Paths } = await import("expo-file-system");
  const source = new File(result.assets[0].uri);
  const extension = source.extension || ".jpg";
  const destination = new File(
    Paths.document,
    `desvio-${Date.now()}-${Math.random().toString(36).slice(2)}${extension}`,
  );
  await source.copy(destination);
  return destination.uri;
}

export function tactile(): void {
  if (Platform.OS === "web") return;
  void import("expo-haptics")
    .then((module) => module.selectionAsync())
    .catch(() => undefined);
}
