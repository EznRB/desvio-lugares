# Desvio

**Pequenas descobertas, outro jeito de ver São Paulo.** Guia pessoal de seis lugares com curadoria, favoritos, roteiro e passaporte de visitas. Aplicativo original em React Native, Expo SDK 58, TypeScript e Expo Router; experiência web editorial e recursos móveis próprios.

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

1. Explorar seis lugares de São Paulo; buscar nome/bairro e combinar categoria com entrada gratuita.
2. Abrir detalhes, endereço, história e fonte oficial. Tempos são estimativas editoriais; preços/programação precisam de confirmação no local oficial.
3. Guardar favoritos e recuperá-los ao reabrir.
4. Montar roteiro de até seis paradas, alterar ordem e abrir trajeto no Google Maps. A interface mostra duração estimada de visita; não apresenta distância do roteiro como percurso viário.
5. Registrar visita manual e nota de até 280 caracteres no passaporte. No mobile, usar GPS e câmera conforme permissões; uma visita manual não simula comprovação GPS.

## Galeria e publicação

Capturas reais produzidas pelo QA de navegador; podem ser substituídas pela versão final durante a revisão. Captura web com viewport mobile não comprova execução no Expo Go.

![Desktop - captura de navegador](docs/screenshots/desktop.png)
![Catálogo desktop](docs/screenshots/desktop-catalog.png)
![Mobile - captura de navegador](docs/screenshots/mobile.png)
![Catálogo mobile](docs/screenshots/mobile-catalog.png)

**Destinos previstos, sem aprovação de publicação neste documento:** [GitHub EznRB/desvio-lugares](https://github.com/EznRB/desvio-lugares) e [desvio-lugares.vercel.app](https://desvio-lugares.vercel.app). Conferir acesso, HTTPS e fluxo na implantação final antes de anunciar publicação.

## Arquitetura e dependências

`src/data/places.ts` concentra catálogo e fontes; `src/domain.ts`, regras puras; `src/store.tsx`, contexto/hook e fila de persistência; `src/app`, navegação Expo Router; componentes de mapa variam por plataforma; `src/native.ts` integra permissões e hardware.

Base: Expo, React, React Native, TypeScript. Navegação: Expo Router, linking, screens e safe-area-context. Dados locais: AsyncStorage. Mobile: expo-location, expo-image-picker, expo-file-system e expo-haptics. Web: react-native-web, react-dom e Leaflet com OpenStreetMap. Visual: Cormorant Garamond, DM Sans, expo-font, lucide-react-native e SVG. Qualidade: ESLint, expo-doctor, runner Node e playwright-core. Versões em package.json/package-lock.json.

Não existe backend nem autenticação: o uso é individual e os dados ficam no aparelho/navegador. Desinstalar ou limpar armazenamento pode perder favoritos, roteiro, notas e fotos. AsyncStorage não é armazenamento criptografado. Assets nativos são empacotados; na web a abertura inicial exige rede, mapas externos dependem de conexão e não há garantia de hard reload offline sem service worker. Não há sincronização, compartilhamento público do passaporte ou diagnóstico por IA.

## Imagens e fontes

`assets/hero.png` é uma cena fictícia gerada por IA. As seis fotografias Wikimedia Commons retratam os locais identificados nas fontes. São registros de arquivo, sem garantia do estado atual. Autoria, licença, data e adaptações em [CREDITOS-FOTOS.md](docs/CREDITOS-FOTOS.md), também acessíveis na tela Créditos pelo rodapé. Fontes dos lugares em [REFERENCIAS.md](docs/REFERENCIAS.md).

## Avaliação e equipe

[Quatro pilares e matriz de entrega](docs/ENTREGA.md) · [PDF](docs/ENTREGA.pdf) · [QA mobile](docs/VALIDACAO-MOBILE.md).

| Nome completo | Matrícula | GitHub | Contribuição real |
| --- | --- | --- | --- |
| Preencher | Preencher | Preencher URL | Preencher |
| Preencher | Preencher | Preencher URL | Preencher |
| Preencher | Preencher | Preencher URL | Preencher |
| Preencher | Preencher | Preencher URL | Preencher |

Ajustar ao grupo real. IA apoiou a implementação/documentação; os alunos precisam revisar, testar e explicar o código. Não fabricar nomes, autoria ou commits. A camada mobile foi concebida para este projeto, sem reaproveitar a do Arena. Antes da entrega, validar aparelho físico, preencher equipe, confirmar publicação, inserir evidências e revisar o PDF.
