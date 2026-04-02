import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Tabs from './components/Tabs';
import AuditoriaPage from './features/auditoria/AuditoriaPage';
import ValidadorPage from './features/validador/ValidadorPage';
import SimuladorPage from './features/simulador/SimuladorPage';
import sampleCSV from './data/sampleCampaignData.csv?raw';
import { parseCSV } from './features/auditoria/auditoriaService';

export interface UploadedFile {
  id: string;
  name: string;
  data: any[];
  timestamp: number;
}

function App() {
  const [activeTab, setActiveTab] = useState('auditoria');
  const [isDark, setIsDark] = useState(true);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Carregar arquivo inicial de exemplo
  useEffect(() => {
    const loadInitialData = async () => {
      const parsed = await parseCSV(sampleCSV);
      const initialFile: UploadedFile = {
        id: 'sample-default',
        name: 'Dados de Exemplo.csv',
        data: parsed,
        timestamp: Date.now()
      };
      setFiles([initialFile]);
      setSelectedFileId(initialFile.id);
    };
    loadInitialData();
  }, []);

  const toggleTheme = () => setIsDark(!isDark);

  const addFile = (name: string, data: any[]) => {
    const newFile: UploadedFile = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      data,
      timestamp: Date.now()
    };
    setFiles(prev => [...prev, newFile]);
    setSelectedFileId(newFile.id);
    setActiveTab('auditoria'); // Redireciona para auditoria após enviar
  };

  const deleteFile = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este arquivo e todas as suas análises?')) {
      const newFiles = files.filter(f => f.id !== id);
      setFiles(newFiles);
      if (selectedFileId === id) {
        setSelectedFileId(newFiles.length > 0 ? newFiles[0].id : null);
      }
    }
  };

  const tabs = [
    { id: 'auditoria', label: 'Auditoria de Campanhas' },
    { id: 'validador', label: 'Upload & Validação' },
    { id: 'simulador', label: 'Simulador' },
  ];

  const currentFile = files.find(f => f.id === selectedFileId) || null;

  return (
    <div className={`min-h-screen flex flex-col selection:bg-blue-500/30 transition-colors duration-300 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <main className="container mx-auto px-6 py-8 flex-1">
        <header className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Inteligência em <span className="gradient-text">Marketing Digital</span>
          </h2>
          <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'} font-medium text-lg max-w-2xl mx-auto leading-relaxed`}>
            Analise, valide e simule suas campanhas de marketing com insights baseados em SQL e monitoramento de desempenho em tempo real.
          </p>
        </header>

        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
        
        <div className="mt-10">
          {activeTab === 'auditoria' && (
            <AuditoriaPage 
              currentFile={currentFile} 
              files={files} 
              onSelectFile={setSelectedFileId} 
              isDark={isDark}
            />
          )}
          {activeTab === 'validador' && (
            <ValidadorPage 
              onConfirmUpload={addFile} 
              files={files} 
              onDeleteFile={deleteFile}
              onSelectFile={(id) => {
                setSelectedFileId(id);
                setActiveTab('auditoria');
              }}
              />          )}
          {activeTab === 'simulador' && <SimuladorPage />}
        </div>
      </main>
      <footer className={`${isDark ? 'bg-slate-900/50 border-slate-800/50' : 'bg-white/50 border-slate-200'} backdrop-blur-md border-t py-8 mt-16 transition-colors duration-300`}>
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm font-medium">
          &copy; 2026 MarTech Analytics Suite - Análise Avançada de Marketing Digital
        </div>
      </footer>
    </div>
  );
}

export default App;
