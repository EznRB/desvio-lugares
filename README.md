# Desvio

**Pequenas descobertas pelo Litoral Norte.** Guia pessoal de 12 lugares, três por cidade em Caraguatatuba, São Sebastião, Ubatuba e Ilhabela, com curadoria, favoritos, roteiro e passaporte de visitas. Aplicativo original em React Native, Expo SDK 58, TypeScript e Expo Router; experiência web editorial e recursos móveis próprios.

## Executar

Requer Node.js 24, npm e Expo Go compatível com SDK 58 (ou development build compatível).

```powershell
cd "C:\Users\enzo\Desktop\dev mobile\desvio"
npm ci
npm run web
```

Para celular: `npx expo start`, com computador e aparelho na mesma rede. No Windows, `./iniciar.ps1` oferece o iniciador do projeto. Verifique a versão do Expo Go em [expo.dev/go](https://expo.dev/go); exportar um bundle não gera APK nem comprova hardware.

```sh
npm test
npm run typecheck
npm run lint
npx expo-doctor
npx expo export --platform web
npm run preview
```

A prévia local serve o bundle web exportado. Resultados efetivamente executados estão em [VERIFICACAO.md](docs/VERIFICACAO.md); os comandos acima não são declaração de aprovação.

## O que fazer no app

1. Escolher cidade e explorar 12 lugares do Litoral Norte; buscar nome/bairro/cidade e combinar categoria (incluindo Praias) com entrada gratuita.
2. Abrir detalhes, endereço, história e fonte oficial. Tempos são estimativas editoriais; preços/programação precisam de confirmação no local oficial.
3. Guardar favoritos e recuperá-los ao reabrir.
4. Montar roteiro de até seis paradas, alterar ordem e abrir trajeto de carro no Google Maps, observando o aviso de travessia por balsa para Ilhabela. A interface mostra duração estimada de visita; não apresenta distância do roteiro como percurso viário.
5. Registrar visita manual e nota de até 280 caracteres no passaporte. No mobile, usar GPS e câmera conforme permissões; uma visita manual não simula comprovação GPS.

## Galeria e publicação

Capturas reais produzidas pelo QA de navegador; podem ser substituídas pela versão final durante a revisão. Captura web com viewport mobile não comprova execução no Expo Go.

![Desktop - captura de navegador](docs/screenshots/desktop.png)
![Catálogo desktop](docs/screenshots/desktop-catalog.png)
![Mobile - captura de navegador](docs/screenshots/mobile.png)

[Seletor de cidades no mobile](docs/screenshots/mobile-cities.png). A galeria atual possui cinco capturas reais; consulte também os demais arquivos em docs/screenshots.
![Catálogo mobile](docs/screenshots/mobile-catalog.png)

**Publicado:** [Abrir Desvio](https://desvio-lugares.vercel.app) · [GitHub EznRB/desvio-lugares](https://github.com/EznRB/desvio-lugares). HTTPS, rotas diretas e 30 verificações de navegador aprovados na implantação. Evidências e limites em [VERIFICACAO.md](docs/VERIFICACAO.md).

## Arquitetura e dependências

`src/data/coastal-places.ts` concentra a curadoria regional; `src/data/places.ts` mantém o catálogo consolidado e o acervo anterior; `src/domain.ts`, regras puras; `src/store.tsx`, contexto/hook e fila de persistência; `src/app`, navegação Expo Router; componentes de mapa variam por plataforma; `src/native.ts` integra permissões e hardware.

Base: Expo, React, React Native, TypeScript. Navegação: Expo Router, linking, screens e safe-area-context. Dados locais: AsyncStorage. Mobile: expo-location, expo-image-picker, expo-file-system e expo-haptics. Web: react-native-web, react-dom e Leaflet com OpenStreetMap. Visual: Cormorant Garamond, DM Sans, expo-font, lucide-react-native e SVG. Qualidade: ESLint, expo-doctor, runner Node e playwright-core. Versões em package.json/package-lock.json.

Não existe backend nem autenticação: o uso é individual e os dados ficam no aparelho/navegador. Desinstalar ou limpar armazenamento pode perder favoritos, roteiro, notas e fotos. AsyncStorage não é armazenamento criptografado. Assets nativos são empacotados; na web a abertura inicial exige rede, mapas externos dependem de conexão e não há garantia de hard reload offline sem service worker. Não há sincronização, compartilhamento público do passaporte ou diagnóstico por IA.

## Imagens e fontes

A fotografia de abertura regional é Jabaquara, Ilhabela (`assets/coast/ilhabela-jabaquara.jpg`), por RafaelBorgesMundim, CC BY-SA 4.0. As novas fotos ficam em `assets/coast`, com dados de crédito em `src/data/coastal-photos.ts` e [CREDITOS-LITORAL.md](docs/CREDITOS-LITORAL.md). Onze imagens representam o lugar exato; a de Mococa é contextual de Caraguatatuba e deve manter legenda explícita. Registros de arquivo não garantem aparência atual. Fontes editoriais em [FONTES-LITORAL.md](docs/FONTES-LITORAL.md).

O catálogo anterior de São Paulo permanece acessível por links, favoritos, roteiros e passaporte existentes, como acervo fora da descoberta regional. Créditos desse acervo continuam em CREDITOS-FOTOS.md. Pinos são aproximados, não acessos GPS precisos. Não há dados em tempo real de horários, preços, filas de balsa ou balneabilidade.

**Atualização regional validada:** produção HTTPS e 44 verificações E2E remotas aprovadas, sem erros de página. CI aprovada com instalação limpa, nove testes, TypeScript, lint, Expo Doctor e exportações Android/web. Evidências e identificação da versão em [VERIFICACAO.md](docs/VERIFICACAO.md). Hardware físico continua pendente.

## Avaliação e equipe

[Quatro pilares e matriz de entrega](docs/ENTREGA.md) · [PDF](docs/ENTREGA.pdf) · [QA mobile](docs/VALIDACAO-MOBILE.md).

| Nome completo | Matrícula | GitHub | Contribuição real |
| --- | --- | --- | --- |
| Preencher | Preencher | Preencher URL | Preencher |
| Preencher | Preencher | Preencher URL | Preencher |
| Preencher | Preencher | Preencher URL | Preencher |
| Preencher | Preencher | Preencher URL | Preencher |

Ajustar ao grupo real. IA apoiou a implementação/documentação; os alunos precisam revisar, testar e explicar o código. Não fabricar nomes, autoria ou commits. A camada mobile foi concebida para este projeto, sem reaproveitar a do Arena. Antes da entrega, validar aparelho físico, preencher equipe, inserir evidências do aparelho e revisar o PDF.
