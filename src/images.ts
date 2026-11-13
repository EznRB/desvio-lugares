import type { ImageSourcePropType } from "react-native";
export const hero = require("../assets/hero.png");
const images: Record<string, ImageSourcePropType> = {
  "vila-itororo": require("../assets/architecture.jpg"),
  "casa-das-rosas": require("../assets/house.jpg"),
  "parque-burle-marx": require("../assets/forest.jpg"),
  "sesc-pompeia": require("../assets/concrete.jpg"),
  "jardim-botanico": require("../assets/garden.jpg"),
  "museu-lasar-segall": require("../assets/art.jpg"),
};
export const cover = (id: string): ImageSourcePropType => images[id] ?? hero;
