# Validação mobile - Desvio

**QA físico: pendente.** Não há evidência de execução em aparelho nesta documentação. Testes de domínio, TypeScript, exportações e navegador verificam camadas distintas; não comprovam câmera, GPS real, haptics ou persistência de foto no aparelho.

Registrar por execução: data, responsável, commit, modelo, sistema, versão Expo Go/build, passos, resultado e evidência. Marcar passou/falhou somente após observar; repetir Android/iOS quando disponíveis e declarar plataforma não testada.

| Caso | Ação | Resultado esperado |
| --- | --- | --- |
| M01 | Instalar de clone limpo; iniciar Expo; abrir em aparelho | Sem crash/erro de dependência; retorno entre telas funciona |
| M02 | Buscar nome/bairro com acentos; combinar categoria e gratuito | Resultados corretos; vazio compreensível; limpar filtros recupera lista |
| M03 | Abrir local e fonte oficial; voltar | Dados do local certo, link válido e retorno preservado |
| M04 | Favoritar/remover; encerrar e reabrir | Estado persistido sem duplicação |
| M05 | Montar seis paradas, repetir lugar, remover e reordenar | Limite e unicidade respeitados; ordem mantém após reinício |
| M06 | Abrir trajeto externo | Google Maps recebe paradas; cancelamento/indisponibilidade não corrompe roteiro |
| M07 | Registrar visita manual e nota; testar limite 280 | Registro identificado como manual; nota persiste e não excede limite |
| M08 | Permitir localização e obter posição perto/longe; negar permissão | Proximidade coerente; recusa clara; sem marcar GPS manualmente |
| M09 | Simular coordenada inválida/imprecisão em ambiente controlado | Validação evita distância falsa; mensagem recuperável |
| M10 | Capturar foto, cancelar e negar câmera | Foto salva na área do app; cancelamento não perde nota; recusa sem crash |
| M11 | Reiniciar aparelho/app e consultar foto | Arquivo continua disponível; URI não depende de cache temporário |
| M12 | Acionar feedback tátil | Haptics percebido se suportado; ausência não bloqueia ação |
| M13 | Abrir app nativo sem rede após instalação e salvar dados | Catálogo/assets empacotados disponíveis; links externos/mapa não prometidos offline |
| M14 | Fonte ampliada, leitor de tela, teclado e tela pequena | Rótulos e ações legíveis, alvos táteis adequados e sem overflow impeditivo |
| M15 | Simular escrita falha/corrupção em cópia de desenvolvimento | Erro visível, conteúdo original preservado e recuperação explícita |

## Limites da evidência web

Abrir a página inicialmente online; depois verificar favoritos, roteiro e passaporte locais. Sem service worker não se garante hard reload offline. Tiles OSM e navegação Google Maps dependem de serviço/rede. Viewport mobile e geolocalização simulada não equivalem a GPS físico. Usar somente dados de teste para simular corrupção, sem apagar conteúdo real.

## Evidências para a entrega

- [ ] Android físico verificado.
- [ ] iOS físico verificado ou limitação declarada.
- [ ] Recusas/cancelamentos de câmera e GPS verificados.
- [ ] Foto persistida após reinício e nota preservada.
- [ ] Fluxo nativo offline verificado.
- [ ] Acessibilidade e teclado verificados.
- [ ] Screenshots reais identificados por plataforma.
- [ ] Problemas encontrados documentados com reprodução, correção e reteste.


## Casos adicionais da especialização Litoral Norte

A versão regional aprovou 44 verificações E2E remotas sem erros de página; instalação limpa, nove testes, TypeScript, lint, Expo Doctor e exportações Android/web passaram na CI. Evidências em VERIFICACAO.md. Isso não marca os casos físicos como aprovados; viewport mobile continua sendo navegador.

| Caso | Ação | Resultado esperado |
| --- | --- | --- |
| R01 | Alternar as quatro cidades e combinar busca/categoria/Praias/gratuito | Três entradas por cidade sem filtro; combinação coerente; resumo da cidade correto |
| R02 | Buscar nome de município com/sem acento e voltar ao catálogo | Busca inclui cidade; não mantém filtro invisível incoerente |
| R03 | Abrir favorito, roteiro, passaporte e link antigos de São Paulo | Dados preservados como acervo; entradas antigas fora do Descobrir regional |
| R04 | Montar roteiro regional com Ilhabela e abrir mapas | Modo carro; aviso de balsa claro; sem promessa de fila/horário/rota precisa |
| R05 | Conferir fotos e créditos dos 12 lugares e hero | Jabaquara, Ilhabela, na abertura; Mococa contextual explicitamente legendada; fontes/licenças acessíveis |
| R06 | Usar GPS perto de pin editorial aproximado | Proximidade não tratada como acesso exato, comprovação de identidade ou garantia de segurança |

Balneabilidade, condições de trilhas, chuva, travessia e ingresso exigem consulta às fontes responsáveis. Não inferir segurança de banho a partir de categoria gratuita ou fotografia. Registros de arquivo não garantem acesso atual.
