# Verificação — Desvio Litoral Norte

Registro de 13/11/2026. Código regional validado no commit `086b6bd`. Node24; Chrome desktop1440×1000 e viewport mobile390×844. Logs integrais locais em logs/ (ignorados no Git).

| Verificação executada | Resultado |
| --- | --- |
| npm test | 9 testes aprovados: filtros/acentos/cidades, Haversine, trajetos, catálogo/fotos, preservação de dados e corrupção |
| npm run typecheck | Aprovado, sem erros |
| npm run lint | Aprovado, sem erros/avisos |
| Expo Doctor | Aprovado no CI da versão regional |
| Expo export web | Bundle regional gerado em dist |
| Expo export Android | Bundle Hermes regional gerado; não equivale a APK ou teste físico |
| E2E local | 44 verificações aprovadas, sem pageerror |
| E2E produção HTTPS | Mesmas 44 verificações aprovadas, sem pageerror |
| Revisão visual | 5 capturas reais desktop/mobile; sem overflow horizontal observado |
| Revisão de código | Sem achados acionáveis em filtro, continuidade de dados e roteiro |

## Cenários de navegador
- Cada uma das quatro cidades retorna três lugares; busca por `sao sebastiao` funciona sem acentos e combina com categoria, cidade e gratuidade. Limpar filtros recupera os12 lugares.
- Favoritos e visitas persistem após recarga; nota manual não simula GPS; remoção de visita exige confirmação.
- Adicionar/remover/reordenar roteiro; Google Maps recebe as paradas. Ilhabela mostra aviso de travessia; deslocamentos são de carro, não um passeio a pé entre municípios.
- Mapa com12 marcadores e seleção do lugar; navegação em viewport mobile sem rolagem horizontal da página.
- Navegação e escrita offline depois da abertura; sem promessa de reabertura web por hard reload sem rede.
- Dados locais corrompidos não são sobrescritos; falha de quota não publica estado não persistido e permite nova tentativa.
- Um contexto isolado com favoritos, roteiro e visita da capital foi carregado na versão regional; depois de salvar um novo favorito do litoral, todos os registros anteriores permaneceram intactos. Os seis locais antigos continuam acessíveis por links/salvos, fora da descoberta principal.
- Estados dos filtros expostos com aria-pressed/aria-checked no navegador, preservando accessibilityState nativo.

## Publicação e CI

Site: https://desvio-lugares.vercel.app
Repositório: https://github.com/EznRB/desvio-lugares
Implantação regional: https://desvio-lugares-mm054oz75-eznrbs-projects.vercel.app — READY.

HTTPS200 observado no início e em links diretos para /place/caragua-mococa, /place/saoseb-centro-historico, /place/ubatuba-tamar e /place/ilhabela-vila. O script E2E executado com BASE_URL público passou nas44 verificações. As escritas acontecem apenas no armazenamento dos contextos isolados de teste, sem dados públicos.

CI Linux aprovado: https://github.com/EznRB/desvio-lugares/actions/runs/43529913243. Instalação limpa, testes, TypeScript, lint, Doctor e exportações Android/web concluídos com sucesso. Deploy automático do GitHub para a Vercel confirmado no push regional.

## Reprodução

Node24, npm ci, npx expo export --platform web --max-workers 2, npm run preview em outro terminal e node scripts/e2e.cjs. Chrome instalado ou CHROME_PATH apontando para executável compatível. BASE_URL permite verificar outra implantação. node scripts/visual-check.cjs produz as cinco capturas; esta prévia deve servir o bundle atualizado.

## Limites mantidos

- Câmera, GPS, recusa/cancelamento de permissões, haptics e fotos após reinício ainda precisam de aparelho físico conforme VALIDACAO-MOBILE.md. A exportação Android e a viewport mobile não comprovam esses casos.
- Preencher equipe, matrículas, papéis e contribuições reais antes da submissão; não há autores ou histórico artificialmente distribuídos.
- Dados são locais, sem conta/sincronização. Web e mapas externos não têm garantia de reabertura offline.
- Pinos e durações são referências editoriais. Horários, valores, balneabilidade e operação da balsa não são dados em tempo real. Fontes em FONTES-LITORAL.md.
- Onze fotos regionais representam o lugar exato; a de Mococa é contextual da Baía de Caraguatatuba vista de Massaguaçu, com legenda explícita. Autoria/licenças em CREDITOS-LITORAL.md e no app.
- A auditoria de dependências anterior, com o mesmo package-lock, registrou três entradas moderadas na cadeia Expo → fingerprint → minimatch, sem altas/críticas no recorte de produção. Não foi repetida sem alteração de dependências. A sugestão automática de downgrade para SDK52 não foi aplicada por incompatibilidade. Relatório original local logs/audit.json.
