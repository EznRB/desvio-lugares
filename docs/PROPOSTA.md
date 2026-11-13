# Desvio — proposta de produto

Guia de pequenas descobertas urbanas. Público: estudantes e moradores que querem um passeio cultural ou ao ar livre sem perder tempo em listas genéricas. Recorte inicial: São Paulo, seis lugares reais com fonte oficial; sem promessas de segredo, avaliações inventadas ou horários supostamente em tempo real.

## Escolhas desta implementação
Expo SDK58, React Native, TypeScript e Expo Router: aplicação mobile criada do zero e uma experiência desktop própria. Comparadas uma landing page somente web, uma comunidade social com backend e um guia local, a escolha é um guia funcional com dados curados e passaporte privado. Essa escolha mantém a avaliação mobile e permite concluir todos os fluxos sem exigir contas ou serviços pagos. Comunidade pública e sincronização poderão ser uma evolução; não são apresentadas como recursos existentes.

Identidade: nome Desvio, papel creme, verde profundo, detalhes lima e terracota; títulos editoriais serifados em Cormorant Garamond, interface DM Sans, fotografia grande e mapa. A imagem de abertura é uma composição ilustrativa; os cartões usam fotografias reais de arquivo dos locais, com autoria e licenças explícitas na tela Créditos.

## Fluxos de ponta a ponta
1. Descobrir: explorar a curadoria, pesquisar por nome/bairro e combinar categoria com entrada gratuita.
2. Investigar: abrir detalhes, endereço, história resumida, estimativa editorial de tempo e link oficial para preços/programação atual.
3. Guardar: favoritar e recuperar favoritos após fechar/reabrir o aplicativo; remover com feedback claro.
4. Planejar: acrescentar até seis paradas ao roteiro, alterar ordem e abrir o trajeto no serviço de mapas. Distâncias locais em linha reta são aproximações, não navegação viária.
5. Registrar: passaporte pessoal com nota de até 280 caracteres e visita manual claramente identificada. No celular: GPS para proximidade, verificação de localização e foto pela câmera, persistida na área do app.
6. Recuperar: dados salvos localmente; corrupção não causa sobrescrita silenciosa. A web precisa da abertura inicial com internet; não prometer hard reload offline sem service worker.

## Critérios de qualidade
Layout revisado em desktop e mobile, estados vazios/erros, nomes acessíveis dos controles, ausência de overflow horizontal, navegação de retorno, testes das regras e roteiro real de navegador. Recursos físicos serão implementados mas identificados como não verificados sem aparelho.

## Avaliação
Componentes nativos, Text, FlatList, useState/useEffect/custom hooks/Context, Expo Router, AsyncStorage, GPS/câmera/haptics no mobile e documentação dos quatro pilares. Nomes/matrículas/participação real do grupo serão preenchidos pelos alunos; nada de autoria fictícia. Não reutilizar a camada mobile do Arena.
