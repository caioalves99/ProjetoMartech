# 🚀 MarTech Analytics Suite

A modern web application for digital marketing data analysis, built with React, TypeScript, and SQL-in-browser capabilities.

## 🎯 Business Problem

Marketing analysts often deal with fragmented data and manual validation processes. The **MarTech Analytics Suite** addresses these challenges by providing:
- **Automated Auditing:** Instant analysis of campaign performance with SQL-powered queries.
- **Data Integrity:** A robust validator to ensure CSV data is consistent and error-free before analysis.
- **Strategic Planning:** A performance simulator to predict campaign outcomes based on historical or hypothetical metrics.

## 🛠️ Technology Stack

- **Frontend:** React (Vite) + TypeScript
- **Styling:** Tailwind CSS
- **Data Visualization:** Chart.js + react-chartjs-2
- **Data Processing:** PapaParse (CSV) + AlaSQL (In-browser SQL)
- **Deployment:** GitHub Pages (via GitHub Actions)

## 📊 Key Features

### 1. Campaign Audit
- Real-time calculation of CTR, CPC, and CPA using SQL.
- Automated insights: Detection of high CPA, low CTR, and data inconsistencies (e.g., clicks without impressions).
- Visual trends for costs and conversions.

### 2. Upload & Validation
- Drag-and-drop/File upload for CSV files.
- Rule-based validation (missing fields, negative costs, impossible CTRs).
- **Quality Score:** A dynamic score based on data integrity.

### 3. Performance Simulator
- What-if analysis tool for budget planning.
- Instant feedback on predicted conversions and CPA.
- Strategic suggestions based on simulation results.

## 🚀 How to Run Locally

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Build for production: `npm run build`

## 📘 Examples of Insights

- *“High CPA detected for campaign Search_Brand ($55.00). Consider optimizing targeting.”*
- *“Low CTR detected for campaign Display_Retargeting (0.50%). Ad creative may need adjustment.”*
- *“Data Quality Score: 85 (Atenção) - 3 inconsistencies found.”*
