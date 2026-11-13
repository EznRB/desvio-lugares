# Referências e créditos - Desvio regional

## Litoral Norte

O catálogo atual possui 12 lugares, três por cidade de Caraguatatuba, São Sebastião, Ubatuba e Ilhabela. Fontes primárias e notas editoriais estão em [FONTES-LITORAL.md](FONTES-LITORAL.md); o catálogo está em src/data/coastal-places.ts. Pinos são aproximados e durações são estimativas, sem garantia de acesso preciso, horário atual, gratuidade de todos os serviços ou balneabilidade.

As fotos regionais e hero de Jabaquara, Ilhabela têm créditos em [CREDITOS-LITORAL.md](CREDITOS-LITORAL.md) e src/data/coastal-photos.ts, arquivos em assets/coast. Onze fotos são do lugar exato; Mococa usa fotografia contextual de Caraguatatuba com legenda explícita. Manter autores, licenças e descrição dos recortes. Fotografias são registros de arquivo.

O conteúdo abaixo preserva referências históricas do acervo de São Paulo e benchmark já pesquisado. O acervo fica fora da descoberta regional, mas links/dados pessoais anteriores permanecem disponíveis.

Consulta de benchmark: 13/11/2026. O catálogo usa fontes oficiais ligadas a cada entrada em `src/data/places.ts`; informações editoriais não são serviço em tempo real.

## Fontes do acervo anterior de São Paulo

| Lugar | Fonte oficial |
| --- | --- |
| Vila Itororó | https://vilaitororo.prefeitura.sp.gov.br/contato/ |
| Casa das Rosas | https://casadasrosas.org.br/visite/ |
| Parque Burle Marx | https://parqueburlemarx.com.br/contato/ |
| Sesc Pompeia | https://www.sescsp.org.br/unidades/pompeia/ |
| Jardim Botânico | https://jardimbotanico.com.br/faq/ |
| Museu Lasar Segall | https://www.gov.br/museus/pt-br/museus-ibram/museu-lasar-segall/acesso-a-informacao/perguntas-frequentes-museu-lasar-segall/ |

Endereços e resumos são do catálogo; pins e duração são estimativas. Gratuidade não significa que todos os serviços/atividades sejam gratuitos: jardim da Casa das Rosas e interior possuem condições distintas; cinema do Museu Lasar Segall tem ingresso próprio. Confirmar preços, acessibilidade, horários e programação antes de sair.

## Benchmark oficial e lojas

- Google Maps: https://www.google.com/maps/about/
- Listas salvas: https://support.google.com/maps/answer/3184808?hl=en
- Google Play Google Maps (Google LLC): https://play.google.com/store/apps/details?id=com.google.android.apps.maps&hl=en_US
- Atlas Obscura: https://www.atlasobscura.com/app
- Google Play Atlas Obscura: https://play.google.com/store/apps/details?id=com.atlasobscura.android&hl=en_US
- App Store Atlas Obscura: https://apps.apple.com/us/app/atlas-obscura-travel-guide/id1563250221

A consulta verificou recursos anunciados e avaliações públicas, sem teste comparativo de eficiência. Não transformar uma opinião isolada em consenso; datas e limitações estão no documento de entrega.

## Fotografias reais e imagem de abertura

A antiga hero `assets/hero.png` era composição fictícia produzida com IA; foi substituída na experiência regional pela foto de Jabaquara, Ilhabela. As seis imagens Unsplash de referência foram integralmente substituídas por fotografias dos próprios locais, identificadas no Wikimedia Commons. São registros de arquivo; não garantem aparência, conservação ou acesso atuais.

Consulte [CREDITOS-FOTOS.md](CREDITOS-FOTOS.md) para arquivo original, autoria, data, licença e adaptações. Os mesmos registros são mantidos em `src/data/credits.ts` e na tela Créditos, acessível pelo rodapé. Arquivos foram redimensionados/convertidos para JPEG e a interface pode recortar sua exibição. Manter atribuições e condições de cada licença ao redistribuir.

| Local | Autor registrado | Licença registrada |
| --- | --- | --- |
| Vila Itororó | EricaAzzellini | CC BY-SA 4.0 |
| Casa das Rosas | Wilfredor | CC0 |
| Parque Burle Marx | Semilla Luz | CC BY 2.0 |
| Sesc Pompeia | paulisson miura | CC BY 2.0 |
| Jardim Botânico | Daderot | Domínio público conforme arquivo Commons |
| Museu Lasar Segall | Vagner Carvalheiro | CC BY 2.0 |

## Tecnologia e mapas

[Expo](https://docs.expo.dev/) · [React Native](https://reactnative.dev/) · [Expo Router](https://docs.expo.dev/router/introduction/) · [Leaflet](https://leafletjs.com/) · [OpenStreetMap e atribuição](https://www.openstreetmap.org/copyright).

Leaflet é usado somente na web. O mapa deve exibir atribuição OpenStreetMap; não presumir licença livre de obrigações para tiles ou disponibilidade offline. Google Maps é serviço externo de navegação, não backend do passaporte. Fontes/fontes tipográficas e bibliotecas devem conservar suas licenças de distribuição.

## Evidência de integração regional

Catálogo regional e interface validados em 44 verificações E2E remotas sem erros de página. Publicação HTTPS em https://desvio-lugares.vercel.app; comandos, CI e versão em VERIFICACAO.md. Essa evidência verifica integração, não substitui confirmação de condições atuais dos atrativos nem QA de hardware físico.
