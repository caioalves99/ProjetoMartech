import Papa from 'papaparse';
import { executeQuery } from '../../utils/sqlEngine';
import * as queries from './auditoriaQueries.sql.ts';

export interface CampaignData {
  date: string;
  campaign: string;
  impressions: number;
  clicks: number;
  cost: number;
  conversions: number;
}

export const parseCSV = (csvString: string): Promise<CampaignData[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(csvString, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results: any) => {
        resolve(results.data as CampaignData[]);
      },
      error: (error: Error) => {
        reject(error);
      },
    });
  });
};

export const runAuditoria = (data: CampaignData[]) => {
  const ctrResults = executeQuery(queries.CTR_QUERY, data);
  const cpcResults = executeQuery(queries.CPC_QUERY, data);
  const cpaResults = executeQuery(queries.CPA_QUERY, data);
  const inconsistencies = executeQuery(queries.INCONSISTENCY_QUERY, data);
  const costByDate = executeQuery(queries.COST_BY_DATE_QUERY, data);
  const conversionsByCampaign = executeQuery(queries.CONVERSIONS_BY_CAMPAIGN_QUERY, data);

  return {
    ctrResults,
    cpcResults,
    cpaResults,
    inconsistencies,
    costByDate,
    conversionsByCampaign,
  };
};

export const generateInsights = (data: any) => {
  const insights: string[] = [];

  // Rules
  data.cpaResults.forEach((row: any) => {
    if (row.cpa > 50) {
      insights.push(`CPA alto detectado para a campanha ${row.campaign} (R$${row.cpa.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}). Considere otimizar a segmentação.`);
    }
  });

  data.ctrResults.forEach((row: any) => {
    if (row.ctr < 1) {
      insights.push(`CTR baixo detectado para a campanha ${row.campaign} (${row.ctr.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%). O criativo do anúncio pode precisar de ajustes.`);
    }
  });

  if (data.inconsistencies.length > 0) {
    insights.push(`${data.inconsistencies.length} inconsistências de dados encontradas: cliques sem impressões.`);
  }

  return insights;
};
