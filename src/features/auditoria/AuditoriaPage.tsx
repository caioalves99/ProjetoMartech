import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { runAuditoria, generateInsights } from './auditoriaService';
import Card from '../../components/Card';
import Table from '../../components/Table';
import type { UploadedFile } from '../../App';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface AuditoriaPageProps {
  currentFile: UploadedFile | null;
  files: UploadedFile[];
  onSelectFile: (id: string) => void;
  isDark: boolean;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const [year, month, day] = parts;
  return `${day}/${month}/${year}`;
};

const AuditoriaPage: React.FC<AuditoriaPageProps> = ({ currentFile, files, onSelectFile, isDark }) => {
  const [data, setData] = useState<any>(null);
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentFile) {
      setLoading(true);
      // Pequeno delay para efeito visual de transição
      const timer = setTimeout(() => {
        const results = runAuditoria(currentFile.data);
        setData(results);
        setInsights(generateInsights(results));
        setLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentFile]);

  if (!currentFile) {
    return (
      <div className="p-20 text-center glass-card rounded-3xl border-dashed">
        <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Nenhum arquivo selecionado para análise.</p>
        <p className="text-xs text-slate-400 mt-2">Vá até a aba "Upload & Validação" para enviar um arquivo.</p>
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className="p-20 text-center">
        <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-blue-500 rounded-full mb-4" role="status" aria-label="loading"></div>
        <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">Analisando dados: {currentFile.name}...</div>
      </div>
    );
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: isDark ? '#94a3b8' : '#475569',
          font: { weight: 'bold' as const, family: 'Inter', size: 10 }
        }
      },
      tooltip: {
        backgroundColor: isDark ? '#1e293b' : '#ffffff',
        titleColor: isDark ? '#f8fafc' : '#0f172a',
        bodyColor: isDark ? '#94a3b8' : '#475569',
        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
      }
    },
    scales: {
      x: {
        grid: { color: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)' },
        ticks: { color: isDark ? '#64748b' : '#94a3b8', font: { size: 10 } }
      },
      y: {
        grid: { color: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)' },
        ticks: { color: isDark ? '#64748b' : '#94a3b8', font: { size: 10 } }
      }
    }
  };

  const costChartData = {
    labels: data.costByDate.map((row: any) => formatDate(row.date)),
    datasets: [
      {
        label: 'Custo por Data (R$)',
        data: data.costByDate.map((row: any) => row.cost),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: isDark ? '#0f172a' : '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
      },
    ],
  };

  const conversionsChartData = {
    labels: data.conversionsByCampaign.map((row: any) => row.campaign),
    datasets: [
      {
        label: 'Conversões por Campanha',
        data: data.conversionsByCampaign.map((row: any) => row.conversions),
        backgroundColor: 'rgba(139, 92, 246, 0.5)',
        borderColor: 'rgba(139, 92, 246, 0.8)',
        borderWidth: 1,
        borderRadius: 6,
        hoverBackgroundColor: 'rgba(139, 92, 246, 0.8)',
      },
    ],
  };

  const aggregateRows = data.ctrResults.map((row: any) => {
    const cpc = data.cpcResults.find((r: any) => r.campaign === row.campaign)?.cpc || 0;
    const cpa = data.cpaResults.find((r: any) => r.campaign === row.campaign)?.cpa || 0;
    return [row.campaign, row.total_impressions, row.total_clicks, row.ctr, cpc, cpa];
  });

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-black tracking-tight">{currentFile.name}</h3>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Análise detalhada de performance</p>
        </div>
        
        <div className="flex items-center space-x-3 bg-black/5 dark:bg-white/5 p-1.5 rounded-2xl border border-black/5 dark:border-white/5">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-3">Arquivo:</span>
          <select 
            value={currentFile.id}
            onChange={(e) => onSelectFile(e.target.value)}
            className="bg-transparent border-none text-sm font-black text-blue-600 dark:text-blue-400 focus:ring-0 cursor-pointer pr-8"
          >
            {files.map(f => (
              <option key={f.id} value={f.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                {f.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Tendência de Custo no Tempo">
          <div className="h-[300px]">
            <Line data={costChartData} options={chartOptions} />
          </div>
        </Card>
        <Card title="Conversões por Campanha">
          <div className="h-[300px]">
            <Bar data={conversionsChartData} options={chartOptions} />
          </div>
        </Card>
      </div>

      <Card title="Insights Automáticos 🔍" className="border-l-4 border-l-blue-500 bg-blue-500/5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.length > 0 ? (
            insights.map((insight, idx) => {
              const isAlert = insight.includes('alto') || insight.includes('inconsistências');
              return (
                <div key={idx} className="flex items-start space-x-4 p-5 bg-black/5 dark:bg-slate-900/50 rounded-2xl border border-black/5 dark:border-white/5 shadow-inner transition-all hover:-translate-y-1 hover:bg-black/10 dark:hover:bg-slate-800/80">
                  <div className={`p-2.5 rounded-xl shrink-0 ${isAlert ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400' : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'}`}>
                    {isAlert ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    )}
                  </div>
                  <p className="text-sm font-bold leading-snug">{insight}</p>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-6 text-center text-slate-500 italic font-bold uppercase tracking-widest text-xs">Nenhum insight crítico encontrado para este conjunto de dados.</div>
          )}
        </div>
      </Card>

      <Card title="Entenda as Métricas 💡" className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-2">
          <div className="space-y-3">
            <h4 className="text-sm font-black text-blue-600 dark:text-blue-500 uppercase tracking-wider">CTR (Taxa de Cliques)</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              É a porcentagem de pessoas que viram seu anúncio e clicaram nele. 
              <span className="block mt-2 font-bold text-slate-800 dark:text-slate-200">Por que importa?</span> 
              Indica se o seu anúncio é interessante e relevante para o público que o está vendo.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-black text-indigo-600 dark:text-indigo-500 uppercase tracking-wider">CPC (Custo por Clique)</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              É o valor médio que você paga cada vez que alguém clica no seu anúncio.
              <span className="block mt-2 font-bold text-slate-800 dark:text-slate-200">Por que importa?</span> 
              Ajuda a controlar o orçamento e entender quanto está custando atrair cada visitante para o seu site.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-wider">CPA (Custo por Aquisição)</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              É o valor médio gasto para conseguir uma "conversão" (como uma venda ou um cadastro).
              <span className="block mt-2 font-bold text-slate-800 dark:text-slate-200">Por que importa?</span> 
              É a métrica de ouro: ela diz se o seu investimento está trazendo retorno financeiro real.
            </p>
          </div>
        </div>
      </Card>

      <Card title="Métricas de Desempenho de Campanha">
        <Table
          headers={['Campanha', 'Impressões', 'Cliques', 'CTR (%)', 'CPC (R$)', 'CPA (R$)']}
          rows={aggregateRows}
        />
      </Card>
      
      {data.inconsistencies.length > 0 && (
        <Card title="Inconsistências de Dados (Impressões = 0 e Cliques > 0)" className="border-l-4 border-l-rose-500 bg-rose-500/5">
          <Table
            headers={['Data', 'Campanha', 'Impressões', 'Cliques', 'Custo']}
            rows={data.inconsistencies.map((row: any) => [formatDate(row.date), row.campaign, row.impressions, row.clicks, row.cost])}
          />
        </Card>
      )}
    </div>
  );
};

export default AuditoriaPage;
