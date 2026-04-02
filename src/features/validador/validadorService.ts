import Papa from 'papaparse';

export interface ValidationError {
  line: number;
  type: string;
  description: string;
}

export const validateCSV = (csvString: string): Promise<{ errors: ValidationError[]; score: number }> => {
  return new Promise((resolve) => {
    Papa.parse(csvString, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results: any) => {
        const errors: ValidationError[] = [];
        const data = results.data as any[];

        data.forEach((row, index) => {
          const lineNumber = index + 2; // +1 for 0-indexed, +1 for header

          // Check required fields
          const requiredFields = ['date', 'campaign', 'impressions', 'clicks', 'cost', 'conversions'];
          requiredFields.forEach(field => {
             if (row[field] === undefined || row[field] === null || row[field] === '') {
                 errors.push({ line: lineNumber, type: 'Campo Ausente', description: `O campo ${field} está vazio` });
             }
          });

          // impressions = 0 and clicks > 0
          if (row.impressions === 0 && row.clicks > 0) {
            errors.push({ line: lineNumber, type: 'Inconsistência', description: 'Cliques registrados com zero impressões' });
          }

          // CTR > 1 (100%)
          if (row.impressions > 0 && (row.clicks / row.impressions) > 1) {
            errors.push({ line: lineNumber, type: 'Inconsistência', description: 'CTR excede 100% (cliques > impressões)' });
          }

          // cost < 0
          if (row.cost < 0) {
            errors.push({ line: lineNumber, type: 'Dados Inválidos', description: 'Custo não pode ser negativo' });
          }
        });

        const score = Math.max(0, 100 - (errors.length > 20 ? 100 : errors.length * 5));
        resolve({ errors, score });
      },
    });
  });
};

export const getStatusFromScore = (score: number): { label: string; color: string } => {
  if (score >= 90) return { label: 'Excelente', color: 'text-emerald-400' };
  if (score >= 70) return { label: 'Regular', color: 'text-amber-400' };
  return { label: 'Crítico', color: 'text-rose-400' };
};
