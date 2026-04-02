# 🚀 MarTech Analytics Suite

Uma aplicação web moderna para análise de dados de marketing digital, construída com React, TypeScript e capacidades de SQL no navegador.

## 🎯 Problema de Negócio

Analistas de marketing frequentemente lidam com dados fragmentados e processos de validação manual. O **MarTech Analytics Suite** aborda esses desafios fornecendo:
- **Auditoria Automatizada:** Análise instantânea do desempenho de campanhas com consultas SQL.
- **Integridade de Dados:** Um validador robusto para garantir que os dados CSV estejam consistentes e sem erros antes da análise.
- **Planejamento Estratégico:** Um simulador de desempenho para prever resultados de campanhas com base em métricas históricas ou hipotéticas.

## 🛠️ Stack Tecnológica

- **Frontend:** React (Vite) + TypeScript;
- **Estilização:** Tailwind CSS;
- **Visualização de Dados:** Chart.js + react-chartjs-2;
- **Processamento de Dados:** PapaParse (CSV) + AlaSQL (SQL no navegador)
- **Implantação:** GitHub Pages (via GitHub Actions).

## 📊 Principais Recursos

### 1. Auditoria de Campanha
- Cálculo em tempo real de CTR, CPC e CPA usando SQL.
- Insights automatizados: Detecção de CPA alto, CTR baixo e inconsistências de dados (ex: cliques sem impressões).
- Tendências visuais para custos e conversões.

### 2. Upload & Validação
- Upload de arquivos CSV via arrastar e soltar ou seleção de arquivo.
- Validação baseada em regras (campos ausentes, custos negativos, CTRs impossíveis).
- **Pontuação de Qualidade (Quality Score):** Uma pontuação dinâmica baseada na integridade dos dados.

### 3. Simulador de Desempenho
- Ferramenta de análise "e se" (what-if) para planejamento de orçamento.
- Feedback instantâneo sobre conversões e CPA previstos.
- Sugestões estratégicas baseadas nos resultados da simulação.

## 🚀 Como Executar Localmente

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Inicie o servidor de desenvolvimento: `npm run dev`
4. Gere o build para produção: `npm run build`

## 📘 Exemplos de Insights

- *“CPA alto detectado para a campanha Search_Brand ($55.00). Considere otimizar a segmentação.”*
- *“CTR baixo detectado para a campanha Display_Retargeting (0.50%). O criativo do anúncio pode precisar de ajustes.”*
- *“Pontuação de Qualidade dos Dados: 85 (Atenção) - 3 inconsistências encontradas.”*
