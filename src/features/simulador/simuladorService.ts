export interface SimulationInputs {
  budget: number;
  cpc: number;
  ctr: number;
  conversionRate: number;
}

export interface SimulationResults {
  clicks: number;
  impressions: number;
  conversions: number;
  cpa: number;
}

export const runSimulation = (inputs: SimulationInputs): SimulationResults => {
  const clicks = inputs.budget / inputs.cpc;
  const impressions = clicks / (inputs.ctr / 100);
  const conversions = clicks * (inputs.conversionRate / 100);
  const cpa = inputs.budget / (conversions || 1);

  return {
    clicks,
    impressions,
    conversions,
    cpa,
  };
};

export const getSimulationInsights = (results: SimulationResults): string[] => {
  const insights: string[] = [];

  if (results.cpa > 50) {
    insights.push('CPA previsto elevado. Foque em melhorar o CTR ou reduzir o CPC.');
  }
  if (results.conversions < 10) {
    insights.push('Baixo volume de conversão. Considere aumentar o orçamento ou otimizar a página de destino.');
  }

  return insights;
};
