import type { City } from "../domain";
export const cities: {
  name: City;
  description: string;
  tip: string;
  source: string;
}[] = [
  {
    name: "Caraguatatuba",
    description:
      "Praias, costões e memória caiçara entre a Serra do Mar e o oceano. Combine uma visita cultural no centro com um trecho da costa norte.",
    tip: "Planeje os deslocamentos entre centro e praias. Na areia, acesso gratuito não inclui estacionamento nem serviços.",
    source: "https://www.caraguatatuba.sp.gov.br/pmc/secretaria-de-turismo/",
  },
  {
    name: "São Sebastião",
    description:
      "Do Centro Histórico às enseadas da costa sul, o passeio aproxima patrimônio, paisagens e a vida junto ao canal.",
    tip: "As praias ficam em diferentes trechos da rodovia. Organize as paradas por região e confira os acessos oficiais.",
    source: "https://www.turismosaosebastiao.com.br/",
  },
  {
    name: "Ubatuba",
    description:
      "Mata Atlântica, praias e conservação marinha. Descubra a costa norte e inclua uma experiência de educação ambiental no Itaguá.",
    tip: "Consulte a balneabilidade e as condições de acesso. Não use rios ou costões como atalhos para chegar às praias.",
    source: "https://turismo.ubatuba.sp.gov.br/",
  },
  {
    name: "Ilhabela",
    description:
      "Uma ilha de praias, cachoeiras e história. A Vila, a costa norte e o sul oferecem passeios com ritmos e acessos diferentes.",
    tip: "A chegada pelo continente envolve travessia. Confira a operação da balsa e reserve tempo para os deslocamentos na ilha.",
    source:
      "https://www.ilhabela.sp.gov.br/portal/servicos/1005/informacoes-uteis",
  },
];
export const ferrySource =
  "https://www.ilhabela.sp.gov.br/portal/noticias/0/3/15400/entenda-como-funciona-a-travessia-da-balsa-entre-ilhabela-e-sao-sebastiao-informacoes-regras-e-dicas/";
export const bathingSource = "https://cetesb.sp.gov.br/praias/";
