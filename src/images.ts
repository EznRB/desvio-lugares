import type { ImageSourcePropType } from "react-native";
export const hero = require("../assets/coast/ilhabela-jabaquara.jpg");
const images: Record<string, ImageSourcePropType> = {
  "caragua-mococa": require("../assets/coast/caragua-context.jpg"),
  "caragua-macc": require("../assets/coast/caragua-macc.jpg"),
  "caragua-pedra-da-freira": require("../assets/coast/caragua-pedra-da-freira.jpg"),
  "ilhabela-jabaquara": require("../assets/coast/ilhabela-jabaquara.jpg"),
  "ilhabela-tres-tombos": require("../assets/coast/ilhabela-tres-tombos.jpg"),
  "ilhabela-vila": require("../assets/coast/ilhabela-vila.jpg"),
  "saoseb-centro-historico": require("../assets/coast/saoseb-centro-historico.jpg"),
  "saoseb-guaeca": require("../assets/coast/saoseb-guaeca.jpg"),
  "saoseb-toque-toque-pequeno": require("../assets/coast/saoseb-toque-toque-pequeno.jpg"),
  "ubatuba-itamambuca": require("../assets/coast/ubatuba-itamambuca.jpg"),
  "ubatuba-prumirim": require("../assets/coast/ubatuba-prumirim.jpg"),
  "ubatuba-tamar": require("../assets/coast/ubatuba-tamar.jpg"),
  "vila-itororo": require("../assets/architecture.jpg"),
  "casa-das-rosas": require("../assets/house.jpg"),
  "parque-burle-marx": require("../assets/forest.jpg"),
  "sesc-pompeia": require("../assets/concrete.jpg"),
  "jardim-botanico": require("../assets/garden.jpg"),
  "museu-lasar-segall": require("../assets/art.jpg"),
};
export const cover = (id: string): ImageSourcePropType => images[id] ?? hero;

export const contextualCaption = (id: string): string | undefined =>
  id === "caragua-mococa"
    ? "Imagem contextual: Baía de Caraguatatuba vista de Massaguaçu; não retrata a Mococa."
    : undefined;
export const photoCaption = (id: string): string =>
  contextualCaption(id) ??
  (id === "caragua-macc"
    ? "Detalhe do acervo do MACC · fotografia de arquivo; créditos no rodapé."
    : "Fotografia de arquivo do local · créditos no rodapé.");
