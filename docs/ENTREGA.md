# Desvio

## Documento dos quatro pilares

**Disciplina:** Mobile

**Turma/professor:** preencher

**Data:** 13/11/2026

**Equipe:** identificação pendente

Projeto acadêmico original de guia pessoal do Litoral Norte, com Expo e React Native. Campos de equipe e QA físico precisam de fatos fornecidos pelos alunos; não são resultados presumidos. A responsabilidade pelo código, inclusive apoio de IA, é da equipe.

## 1. Motivação do projeto

### Problema e público

Estudantes e moradores querem um passeio cultural ou ao ar livre sem navegar por listas enormes. Reunir história curta, endereço, fonte oficial e uma lista pessoal ajuda a decidir e lembrar o que visitar. A descoberta reúne 12 lugares reais: três em cada cidade de Caraguatatuba, São Sebastião, Ubatuba e Ilhabela. Não pretende representar todos os atrativos nem prometer lugares secretos.

**Persona ilustrativa, não entrevistada:** Júlia, 21 anos, estudante e moradora de Caraguatatuba, quer conhecer a própria cidade e planejar um passeio nas cidades vizinhas de São Sebastião, Ubatuba ou Ilhabela. Deseja guardar opções, ordenar paradas e anotar lembranças sem criar conta. Essa hipótese precisa de validação com usuários; não há ganho de tempo medido.

### Proposta de valor e mobile

“Faça um pequeno desvio na rotina.” Escolha de cidade, busca por nome/bairro/cidade, categoria Praias e descoberta editorial, favoritos, roteiro de até seis paradas e passaporte privado com notas de até 280 caracteres compõem um fluxo individual. O celular acompanha o passeio: GPS oferece proximidade/verificação de posição, câmera registra lembrança e haptics confirma interação. Visita manual tem identificação própria e não simula GPS.

A camada mobile foi criada para este projeto. A versão web tem mapa Leaflet/OSM e layout editorial; não substitui os recursos físicos nativos. Assets são empacotados no aplicativo. Web exige primeira abertura online e não garante hard reload offline; mapas e links externos dependem de conexão. Sem backend, conta ou sincronização: o recorte evita coleta remota desnecessária e simplifica uso individual. Limpar armazenamento/desinstalar pode apagar dados.

## 2. O grupo de desenvolvimento

### Identificação real a preencher

| Nome completo | Matrícula | GitHub | Contribuição comprovada |
| --- | --- | --- | --- |
| Preencher | Preencher | Preencher URL | Preencher |
| Preencher | Preencher | Preencher URL | Preencher |
| Preencher | Preencher | Preencher URL | Preencher |
| Preencher | Preencher | Preencher URL | Preencher |

Ajustar às pessoas reais. Não fabricar autoria ou histórico de commits. Cada integrante deve explicar o fluxo e contribuir de fato no repositório compartilhado.

### Responsabilidades propostas

| Frente | Responsável real | Entrega esperada |
| --- | --- | --- |
| UI/UX e design system | Preencher | Identidade, componentes e adaptação tátil |
| Frontend/navegação | Preencher | Telas, formulários e Expo Router |
| Dados/hooks | Preencher | Catálogo, domínio, Context e AsyncStorage |
| Hardware | Preencher | GPS, câmera, arquivos e permissões |
| QA/documentação | Preencher | Testes, evidências, README e PDF |

Não há API/banco remoto a atribuir; os dados pessoais são locais. A integração de mapas é serviço externo. Gestão proposta: dividir tarefas com aceite, implementar incrementos, revisar, testar e registrar evidências. **Relato real da squad:** preencher datas, ferramenta, decisões e links de commits/PRs após a execução efetiva. A tabela não comprova trabalho já feito.

## 3. Desafios no desenvolvimento

### Obstáculos reais investigados e corrigidos

- A tipagem de instância do TextInput mudou no SDK 58: a referência de foco passou a usar React.ComponentRef<typeof TextInput>.
- O build falhou porque expo-haptics e expo-linking estavam listados como config plugins, mas não exportam app.plugin. Foram removidos da lista de plugins; suas dependências continuam usadas em runtime.
- A declaração de módulos CSS estava ausente e foi corrigida para o mapa web. Leaflet ficou isolado da alternativa nativa, evitando dependência de DOM no mobile.
- Plugins de localização/image picker foram configurados com mensagens em português; a captura de foto não solicita microfone. A persistência lê e valida antes de liberar escrita, preserva conteúdo corrompido e usa fila contra atualizações fora de ordem.

As correções acima foram informadas pela implementação. Evidências finais de typecheck/build e QA devem constar no registro de verificação, sem inferir validação em aparelho físico.

Durante a revisão, foi encontrado risco de salvar nota antiga quando o texto era editado durante GPS/câmera. O campo agora fica bloqueado enquanto a operação está ocupada, evitando divergência entre nota exibida e persistida. Resultados dos gates e cenários de falha em expansão são registrados em VERIFICACAO.md; não inferir QA físico a partir deles.

### Decisões técnicas e riscos identificados

- Separar Leaflet, que depende de DOM, dos componentes nativos por plataforma; não incorporar mapa web como wrapper da experiência mobile.
- Hidratar AsyncStorage antes de gravar, serializar escritas e preservar dados corrompidos; não sobrescrever automaticamente com estado vazio.
- Validar busca combinada, acentos, coordenadas, unicidade/limite do roteiro e evolução dos IDs do catálogo em regras puras.
- Persistir foto capturada na área do app e tratar cancelamento/recusa sem perder notas; URI temporária não comprova persistência.
- Diferenciar distância aproximada em linha reta de navegação real e visita manual de confirmação por GPS.
- Identificar a hero regional real de Jabaquara, Ilhabela e fotos documentais de arquivo, com créditos e licenças; apresentar preços condicionais com honestidade editorial.

Os itens preventivos são critérios de investigação, separados dos obstáculos reais relatados acima. Resultados concretos de implementação/QA devem ser acrescentados pelo responsável com evidência; não há teste físico aprovado nesta versão.

### Registro de incidente real

| Campo | Evidência necessária |
| --- | --- |
| Sintoma e reprodução | Aparelho/plataforma, commit, passos e resultado |
| Investigação | Logs, hipótese e documentação consultada |
| Correção | Decisão, arquivos e commit/PR |
| Reteste | Comando/caso, resultado observado e evidência |

Testes automatizados e exportações devem ser reportados com comandos/códigos de saída no registro de verificação do projeto. Não antecipar números ou aprovações ainda em execução. A equipe deve estudar hooks, estado, listas e navegação gerados com apoio de IA.

## 4. Benchmarking e diferencial competitivo

### Método

Consulta a páginas oficiais e Google Play em 13/11/2026, sem teste comparativo de desempenho. Apps similares reais: Google Maps (Google LLC) e Atlas Obscura Travel Guide (Atlas Obscura). Links completos e créditos em REFERENCIAS.md.

### Recursos anunciados e pontos positivos

Google Maps reúne navegação, descoberta e listas salvas. O benefício de sua oferta é amplitude de informação e deslocamento. [Página oficial](https://www.google.com/maps/about/) e [Google Play](https://play.google.com/store/apps/details?id=com.google.android.apps.maps&hl=en_US).

Atlas Obscura combina mapa, histórias, listas e registro de lugares visitados. Seu ponto positivo é a proposta de descoberta por interesses. [Página oficial](https://www.atlasobscura.com/app) e [Google Play](https://play.google.com/store/apps/details?id=com.atlasobscura.android&hl=en_US).

| Dimensão | Google Maps | Atlas Obscura | Desvio |
| --- | --- | --- | --- |
| Recorte | Navegação/descoberta ampla | Descobertas e histórias | 12 lugares do Litoral Norte |
| Guardar | Listas | Listas e visitados | Favoritos/roteiro/passaporte |
| Navegação | Serviço próprio anunciado | Mapa anunciado | Google Maps em modo carro |
| Dados pessoais | Serviço de conta | Recursos de comunidade | Locais, sem conta/backend |

### Críticas públicas e limites

**Atlas Obscura, Ashley Arnold, 02/09/2026:** uma avaliação na Google Play relata insatisfação com a cobertura de seu bairro parisiense. É opinião individual, não prova da cobertura atual no Litoral Norte. Consequência para o Desvio: comunicar claramente a dimensão reduzida e regional do catálogo, sem prometer completude. [Avaliação exibida na loja](https://play.google.com/store/apps/details?id=com.atlasobscura.android&hl=en_US).

**Atlas Obscura, Jeffrey Carpenter, 29/10/2022:** critica a busca por cidade. O desenvolvedor responde em 27/01/2023 que adicionou busca por localização. O relato é histórico e não demonstra falha atual. Consequência: testar busca e clareza do recorte. [Avaliação e resposta na loja](https://play.google.com/store/apps/details?id=com.atlasobscura.android&hl=en_US).

Para Google Maps, críticas específicas não foram coletadas nesta etapa; completar com avaliações datadas e fonte antes da apresentação se necessário para comparação simétrica. Não inventar problemas de anúncios, offline ou lentidão. As críticas do Atlas são amostra pequena, sem representatividade estatística.

### Diferencial e validação

O diferencial pretendido é um fluxo pessoal curto, em português, com curadoria explícita, passaporte local e captura móvel de lembranças. Favoritos, mapas e visitas não são exclusivos do Desvio. Não há evidência de superioridade geral sobre concorrentes. Convidar colegas a encontrar lugar, guardar, ordenar roteiro e registrar visita; medir conclusão, erros e entendimento antes de afirmar que o recorte é mais fácil.

## Matriz da rubrica e entrega

| Critério do professor | Peso | Evidência necessária |
| --- | --- | --- |
| Funcionalidade/usabilidade | 30% | Fluxo completo, retorno, formulários e Expo Go sem crash |
| Código/hooks | 25% | Componentes modulares, hooks corretos, FlatList, Text e regras verificadas |
| Quatro pilares | 20% | Este documento, equipe real e evidências honestas |
| Recursos nativos | 15% | GPS, câmera, haptics e persistência demonstrados em aparelho |
| GitHub/README | 10% | Instruções, galeria real, .gitignore e commits reais do grupo |

Prazo do enunciado: 07/12 às 23h59; confirmar o ano com o professor. Entregar link de repositório acessível e PDF. Publicação confirmada: [aplicação HTTPS](https://desvio-lugares.vercel.app) e [repositório público](https://github.com/EznRB/desvio-lugares). Rotas de início, lugar, roteiro, passaporte e créditos responderam HTTP 200; o fluxo regional remoto aprovou 44 verificações, sem erros de página. Evidências e versão verificada em VERIFICACAO.md. Participação real da equipe e hardware físico continuam pendentes.

- [ ] Preencher integrantes, matrículas, GitHub e responsabilidades reais.
- [ ] Validar aparelho físico conforme VALIDACAO-MOBILE.md.
- [ ] Completar desafios/retestes com evidências reais.
- [ ] Confirmar gates técnicos e capturas de navegador.
- [ ] Confirmar repositório acessível e autoria real de todos.
- [ ] Revisar README, créditos e PDF antes de submeter.

## Honestidade visual e fontes

A abertura regional usa fotografia real de Jabaquara, Ilhabela. Das 12 imagens regionais, onze mostram o lugar exato; Mococa usa imagem contextual de Caraguatatuba, identificada por legenda. Créditos, autores, licenças e adaptações ficam em CREDITOS-LITORAL.md e src/data/coastal-photos.ts. São registros de arquivo, sem garantia de estado atual. Créditos do acervo anterior continuam em CREDITOS-FOTOS.md. Fontes oficiais e limites de preços/acesso estão em REFERENCIAS.md. Fotografias de terceiros não comprovam uma visita do usuário. Não inventar entrevistas, reviews ou resultados de hardware.


## Especialização regional e continuidade

O seletor de cidade delimita a descoberta e a busca inclui município. Roteiros abrem Google Maps em modo carro, com aviso de balsa quando incluem Ilhabela; o aplicativo não calcula filas, tarifas ou condições atuais da travessia. Pinos editoriais aproximados não representam entrada de trilha nem acesso GPS preciso. O passaporte verifica proximidade com essas limitações, sem certificar identidade ou segurança do local.

As seis entradas anteriores de São Paulo continuam no acervo por compatibilidade com links e dados pessoais, mas ficam fora do Descobrir regional. Preservar favoritos, roteiros e passaporte evita perda de histórico na evolução do catálogo. FONTES-LITORAL.md documenta as fontes e condições variáveis: gratuidades de praias referem-se somente à areia; serviços/transporte são independentes. Não são informados horários ou balneabilidade em tempo real.

A versão regional aprovou 44 verificações E2E remotas sem erros, incluindo detalhes das quatro cidades. Deploy 086b6bd Ready: [implantação](https://desvio-lugares-mm054oz75-eznrbs-projects.vercel.app). [CI aprovada](https://github.com/EznRB/desvio-lugares/actions/runs/43529913243): instalação limpa, nove testes, TypeScript, lint, Expo Doctor e exportações Android/web. Evidências em VERIFICACAO.md. Equipe e hardware físico permanecem pendentes. O benchmark mantém a pesquisa anterior, sem superioridade regional comprovada.
