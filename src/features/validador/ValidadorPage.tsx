import React, { useState } from 'react';
import Card from '../../components/Card';
import Table from '../../components/Table';
import { validateCSV, getStatusFromScore } from './validadorService';
import { parseCSV } from '../auditoria/auditoriaService';
import type { ValidationError } from './validadorService';
import type { UploadedFile } from '../../App';

interface ValidadorPageProps {
  onConfirmUpload: (name: string, data: any[]) => void;
  files: UploadedFile[];
  onDeleteFile: (id: string) => void;
  onSelectFile: (id: string) => void;
  isDark: boolean;
}

const ValidadorPage: React.FC<ValidadorPageProps> = ({ onConfirmUpload, files, onDeleteFile, onSelectFile, isDark }) => {
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [pendingFile, setPendingFile] = useState<{ name: string; data: any[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const text = await file.text();
      const result = await validateCSV(text);
      const parsedData = await parseCSV(text);
      
      setErrors(result.errors);
      setScore(result.score);
      setPendingFile({ name: file.name, data: parsedData });
    } catch (error) {
      console.error('Erro ao processar arquivo:', error);
      alert('Erro ao processar o arquivo CSV.');
    } finally {
      setLoading(false);
    }
  };

  const status = score !== null ? getStatusFromScore(score) : null;

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-700">
      <section className="space-y-6">
        <h3 className="text-xl font-black flex items-center space-x-3">
          <span className="bg-blue-500 w-2 h-8 rounded-full"></span>
          <span>Novo Upload</span>
        </h3>
        
        <Card title="Fonte de Dados">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-black/10 dark:border-white/10 rounded-2xl p-12 bg-slate-100/30 dark:bg-slate-900/30 transition-all hover:border-blue-500/50 hover:bg-slate-100/50 dark:hover:bg-slate-900/50 group">
            <div className="bg-blue-500/10 p-5 rounded-2xl mb-5 group-hover:bg-blue-500/20 transition-all group-hover:scale-110">
              <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-base font-black text-slate-700 dark:text-slate-200 mb-1">Clique para selecionar seu arquivo CSV</p>
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-8 uppercase tracking-widest text-center">Exportações padrão MarTech (.csv)</p>
            
            <label className="cursor-pointer">
              <span className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white px-8 py-3 rounded-xl text-sm font-black shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all active:scale-95">Selecionar Arquivo</span>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            
            {loading && (
              <div className="mt-6 flex items-center space-x-3">
                <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Processando...</span>
              </div>
            )}

            {pendingFile && !loading && (
              <div className="mt-8 flex flex-col items-center space-y-6 w-full max-w-md p-6 bg-white dark:bg-slate-800 rounded-2xl border border-black/5 dark:border-white/5 shadow-inner">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                  <span className="text-sm font-black text-slate-700 dark:text-slate-300 truncate max-w-[200px]">{pendingFile.name}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 w-full">
                  <button 
                    onClick={() => {
                      onConfirmUpload(pendingFile.name, pendingFile.data);
                      setPendingFile(null);
                      setScore(null);
                      setErrors([]);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20"
                  >
                    Confirmar Envio
                  </button>
                  <button 
                    onClick={() => {
                      setPendingFile(null);
                      setScore(null);
                      setErrors([]);
                    }}
                    className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                  >
                    Descartar
                  </button>
                </div>
              </div>
            )}
          </div>
        </Card>
      </section>

      {score !== null && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-500">
          <Card title="Resultado da Validação" className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
            <div className="relative z-10 flex flex-col items-center justify-center py-8">
              <div className={`text-8xl font-black ${status?.color} tracking-tighter drop-shadow-2xl`}>{score}</div>
              <div className={`mt-4 px-5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${status?.color} bg-white/5 border border-current backdrop-blur-md shadow-lg`}>
                Score de Qualidade: {status?.label}
              </div>
            </div>
          </Card>
          <Card title="Resumo de Integridade">
            <div className="py-4 space-y-5 text-slate-700 dark:text-slate-300">
              <div className="flex justify-between items-center p-5 bg-black/5 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5">
                <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Problemas Encontrados</span>
                <span className="text-2xl font-black">{errors.length}</span>
              </div>
              <div className="flex justify-between items-center p-5 bg-rose-500/10 rounded-2xl border border-rose-500/20">
                <span className="text-xs font-black text-rose-600 dark:text-rose-400 uppercase tracking-widest">Penalidade aplicada</span>
                <span className="text-2xl font-black text-rose-600 dark:text-rose-400">-{Math.min(100, errors.length * 5)}</span>
              </div>
            </div>
          </Card>
        </section>
      )}

      {errors.length > 0 && (
        <Card title="Detalhes Técnicos dos Erros">
          <Table
            headers={['Linha', 'Tipo', 'Descrição do Problema']}
            rows={errors.map(e => [e.line, e.type, e.description])}
          />
        </Card>
      )}

      <section className="space-y-6">
        <h3 className="text-xl font-black flex items-center space-x-3">
          <span className="bg-purple-500 w-2 h-8 rounded-full"></span>
          <span>Histórico de Arquivos</span>
        </h3>
        
        <div className="grid grid-cols-1 gap-4">
          {files.length === 0 ? (
            <div className="text-center py-12 bg-black/5 dark:bg-white/5 rounded-3xl border border-dashed border-black/10 dark:border-white/10">
              <p className="text-slate-500 font-bold">Nenhum arquivo no histórico.</p>
            </div>
          ) : (
            files.map((file) => (
              <div 
                key={file.id} 
                className="glass-card p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 group transition-all hover:bg-white/10 dark:hover:bg-slate-800/80"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-slate-200 dark:bg-slate-700 p-3 rounded-xl group-hover:bg-blue-500 transition-colors">
                    <svg className="w-6 h-6 text-slate-600 dark:text-slate-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 dark:text-slate-100">{file.name}</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">
                      Enviado em: {new Date(file.timestamp).toLocaleString('pt-BR')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => onSelectFile(file.id)}
                    className="flex-1 md:flex-none px-6 py-2.5 bg-blue-600/10 hover:bg-blue-600 text-blue-600 dark:text-blue-400 hover:text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all border border-blue-600/20"
                  >
                    Analisar
                  </button>
                  <button 
                    onClick={() => onDeleteFile(file.id)}
                    className="p-2.5 bg-rose-600/10 hover:bg-rose-600 text-rose-600 dark:text-rose-400 hover:text-white rounded-xl transition-all border border-rose-600/20"
                    title="Excluir arquivo"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default ValidadorPage;
