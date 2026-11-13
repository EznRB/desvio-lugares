import { coastalPhotos } from "./coastal-photos";
const legacyCredits = [
  {
    place: "Vila Itororó",
    author: "EricaAzzellini",
    license: "CC BY-SA 4.0",
    url: "https://creativecommons.org/licenses/by-sa/4.0",
    source:
      "https://commons.wikimedia.org/wiki/File:Vila_Itoror%C3%B3_-_S%C3%A3o_Paulo_-_20240914101927.jpg",
  },
  {
    place: "Casa das Rosas",
    author: "Wilfredor",
    license: "CC0",
    url: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    source: "https://commons.wikimedia.org/wiki/File:Casa_das_Rosas_023.jpg",
  },
  {
    place: "Parque Burle Marx",
    author: "Semilla Luz",
    license: "CC BY 2.0",
    url: "https://creativecommons.org/licenses/by/2.0",
    source: "https://commons.wikimedia.org/wiki/File:Parque_Burle_Marx_01.jpg",
  },
  {
    place: "Sesc Pompeia",
    author: "paulisson miura from Cuiabá, Brasil",
    license: "CC BY 2.0",
    url: "https://creativecommons.org/licenses/by/2.0",
    source:
      "https://commons.wikimedia.org/wiki/File:Lina_Bo_Bardi,_SESC_Pomp%C3%A9ia_(5391718290",
  },
  {
    place: "Jardim Botânico",
    author: "Daderot",
    license: "Public domain",
    url: "https://commons.wikimedia.org/wiki/File:Jardim_Bot%C3%A2nico_de_S%C3%A3o_Paulo_-_general_view_IMG_0129.jpg",
    source:
      "https://commons.wikimedia.org/wiki/File:Jardim_Bot%C3%A2nico_de_S%C3%A3o_Paulo_-_general_view_IMG_0129.jpg",
  },
  {
    place: "Museu Lasar Segall",
    author: "Vagner Carvalheiro from São Paulo, Brasil",
    license: "CC BY 2.0",
    url: "https://creativecommons.org/licenses/by/2.0",
    source:
      "https://commons.wikimedia.org/wiki/File:Museu_Lasar_Segall,_jardim_1.jpg",
  },
];

export const credits = [
  ...coastalPhotos.map((photo) => ({
    ...photo,
    place: `${photo.place ?? "Baía de Caraguatatuba (contextual)"} · ${photo.city}`,
  })),
  ...legacyCredits,
];
