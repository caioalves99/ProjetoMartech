export const CTR_QUERY = `
SELECT campaign, 
       SUM(clicks) AS total_clicks, 
       SUM(impressions) AS total_impressions,
       CASE WHEN SUM(impressions) = 0 THEN 0 ELSE (SUM(clicks) * 1.0 / SUM(impressions)) * 100 END AS ctr
FROM ? 
GROUP BY campaign
`;

export const CPC_QUERY = `
SELECT campaign, 
       SUM(cost) AS total_cost, 
       SUM(clicks) AS total_clicks,
       CASE WHEN SUM(clicks) = 0 THEN 0 ELSE SUM(cost) / SUM(clicks) END AS cpc
FROM ? 
GROUP BY campaign
`;

export const CPA_QUERY = `
SELECT campaign, 
       SUM(cost) AS total_cost, 
       SUM(conversions) AS total_conversions,
       CASE WHEN SUM(conversions) = 0 THEN 0 ELSE SUM(cost) / SUM(conversions) END AS cpa
FROM ? 
GROUP BY campaign
`;

export const INCONSISTENCY_QUERY = `
SELECT * 
FROM ? 
WHERE impressions = 0 AND clicks > 0
`;

export const COST_BY_DATE_QUERY = `
SELECT date, SUM(cost) as cost
FROM ?
GROUP BY date
ORDER BY date
`;

export const CONVERSIONS_BY_CAMPAIGN_QUERY = `
SELECT campaign, SUM(conversions) as conversions
FROM ?
GROUP BY campaign
`;
