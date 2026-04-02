import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import { runSimulation, getSimulationInsights } from './simuladorService';
import type { SimulationInputs, SimulationResults } from './simuladorService';

const SimuladorPage: React.FC = () => {
  const [inputs, setInputs] = useState<SimulationInputs>({
    budget: 1000,
    cpc: 0.5,
    ctr: 2.5,
    conversionRate: 5,
  });

  const [results, setResults] = useState<SimulationResults | null>(null);
  const [insights, setInsights] = useState<string[]>([]);

  useEffect(() => {
    const res = runSimulation(inputs);
    setResults(res);
    setInsights(getSimulationInsights(res));
  }, [inputs]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-700">
      <Card title="Controles de Simulação">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-3">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Orçamento (R$)</label>
            <input
              type="number"
              name="budget"
              value={inputs.budget}
              onChange={handleChange}
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3.5 text-slate-100 font-bold focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div className="space-y-3">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">CPC (R$)</label>
            <input
              type="number"
              name="cpc"
              step="0.01"
              value={inputs.cpc}
              onChange={handleChange}
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3.5 text-slate-100 font-bold focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div className="space-y-3">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">CTR (%)</label>
            <input
              type="number"
              name="ctr"
              step="0.1"
              value={inputs.ctr}
              onChange={handleChange}
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3.5 text-slate-100 font-bold focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div className="space-y-3">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Taxa de Conversão (%)</label>
            <input
              type="number"
              name="conversionRate"
              step="0.1"
              value={inputs.conversionRate}
              onChange={handleChange}
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3.5 text-slate-100 font-bold focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>
      </Card>

      {results && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card title="Cliques Previstos" className="text-center border-l-4 border-l-blue-500 bg-blue-500/5">
            <div className="py-6">
              <span className="text-5xl font-black text-blue-400 tracking-tighter">{Math.round(results.clicks).toLocaleString('pt-BR')}</span>
              <p className="text-[10px] font-black text-slate-500 mt-3 uppercase tracking-[0.2em]">Tráfego Total</p>
            </div>
          </Card>
          <Card title="Impressões Previstas" className="text-center border-l-4 border-l-indigo-500 bg-indigo-500/5">
            <div className="py-6">
              <span className="text-5xl font-black text-indigo-400 tracking-tighter">{Math.round(results.impressions).toLocaleString('pt-BR')}</span>
              <p className="text-[10px] font-black text-slate-500 mt-3 uppercase tracking-[0.2em]">Alcance Potencial</p>
            </div>
          </Card>
          <Card title="Conversões Previstas" className="text-center border-l-4 border-l-emerald-500 bg-emerald-500/5">
            <div className="py-6">
              <span className="text-5xl font-black text-emerald-400 tracking-tighter">{Math.round(results.conversions).toLocaleString('pt-BR')}</span>
              <p className="text-[10px] font-black text-slate-500 mt-3 uppercase tracking-[0.2em]">Metas Esperadas</p>
            </div>
          </Card>
          <Card title="CPA Previsto" className="text-center border-l-4 border-l-amber-500 bg-amber-500/5">
            <div className="py-6">
              <span className="text-5xl font-black text-amber-400 tracking-tighter">R${results.cpa.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              <p className="text-[10px] font-black text-slate-500 mt-3 uppercase tracking-[0.2em]">Custo por Ação</p>
            </div>
          </Card>
        </div>
      )}

      <Card title="Insights da Simulação 🧠" className="bg-slate-900/40 border border-white/5">
        <ul className="space-y-4 py-2">
          {insights.length > 0 ? (
            insights.map((insight, idx) => (
              <li key={idx} className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-sm font-bold text-slate-300">{insight}</span>
              </li>
            ))
          ) : (
            <li className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl border border-white/5 italic">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-sm font-bold text-slate-400">As configurações parecem ideais para os parâmetros fornecidos.</span>
            </li>
          )}
        </ul>
      </Card>
    </div>
  );
};

export default SimuladorPage;
