import alasql from 'alasql';

export const executeQuery = (query: string, data: any[]): any[] => {
  try {
    return alasql(query, [data]);
  } catch (error) {
    console.error('SQL Execution Error:', error);
    return [];
  }
};
