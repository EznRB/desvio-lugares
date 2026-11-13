# Verificação — Desvio

Registro de 13/11/2026. Node24; Chrome desktop e viewport390×844. Logs completos locais em logs/ (ignorados no Git).

| Verificação executada | Resultado |
| --- | --- |
| npm test | 5 testes aprovados: filtros/acentos, Haversine, trajetos, persistência/evolução e dados corrompidos |
| npm run typecheck | Aprovado, sem erros |
| npm run lint | Aprovado, sem erros/avisos |
| npx expo-doctor | 20/20 verificações aprovadas |
| Inicialização Expo | Metro iniciado offline na porta8083, sem erros de configuração |
| Expo export web | Bundle gerado em dist |
| Expo export Android | Bundle Hermes gerado em dist-android; não equivale a APK ou teste físico |
| node scripts/e2e.cjs | 30 verificações aprovadas, nenhum pageerror |
| node scripts/visual-check.cjs | 4 capturas reais; revisão visual desktop/mobile; sem overflow horizontal |
| PDF | 6 páginas; extração e renderização verificadas, sem cortes observados |
| Revisão de código | Nota durante GPS/câmera corrigida: campo bloqueado enquanto a operação aguarda |

## Escopo do navegador
Busca combinada com categoria/gratuidade, acentos, vazio e limpar; favorito e visita após recarga; adicionar/remover/reordenar roteiro e abrir Google Maps; seis marcadores Leaflet e seleção; nota manual corretamente identificada; remover visita com confirmação; link inválido; navegação e escrita offline após primeira abertura; dados corrompidos preservados; falha de quota sem falsa confirmação ou gravação parcial e recuperação posterior. Asserções verificam estado persistido e interface, sem depender de fotos ou GPS simulados.

Para reproduzir: Node24, npm ci, npx expo export --platform web --max-workers 2, npm run preview em outro terminal e node scripts/e2e.cjs. Chrome instalado ou CHROME_PATH apontando para executável compatível. BASE_URL permite testar outra implantação.

## Limites e pendências acadêmicas
- Nenhum aparelho físico foi conectado: câmera, GPS, permissões negadas/canceladas, fotos após reinício e haptics exigem o roteiro em VALIDACAO-MOBILE.md. Não declarar esses casos aprovados com uma captura de navegador.
- Preencher integrantes/matrículas/papéis e registrar contribuições reais. O histórico não foi distribuído artificialmente entre autores.
- Web não garante reabertura offline por hard reload; mapa e links externos precisam de rede. Dados são locais, sem sincronização/conta.
- npm audit --omit=dev registrou três entradas moderadas da mesma cadeia Expo → fingerprint → minimatch, sem entradas altas/críticas. O advisory de amplificação de globs afeta ferramenta de build, sem glob fornecido pelo visitante neste app. A sugestão automática de downgrade para Expo52 não foi aplicada por quebrar a base SDK58. Reavaliar quando a cadeia Expo publicar atualização compatível; relatório integral local logs/audit.json.

## Publicação
Site público: https://desvio-lugares.vercel.app. Repositório público: https://github.com/EznRB/desvio-lugares.

Vercel deployment dpl_HxZwXMchmAVUEP3ER7AHvmEuNScw em estado READY. HTTP200 por HTTPS em /, /place/vila-itororo, /route, /passport e /credits sem login. O mesmo scripts/e2e.cjs executado com BASE_URL de produção passou nas 30 verificações, sem pageerror. Testa dados locais do contexto isolado do navegador; não cria dados públicos.

GitHub Actions executou instalação limpa, 5 testes, TypeScript, lint, Doctor e exportações Android/web em Linux: https://github.com/EznRB/desvio-lugares/actions/runs/43483026184.
