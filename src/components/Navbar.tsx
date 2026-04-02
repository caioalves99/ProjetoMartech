import React from 'react';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDark, toggleTheme }) => {
  return (
    <nav className={`${isDark ? 'bg-slate-900/80 border-white/5' : 'bg-white/80 border-slate-200'} backdrop-blur-xl sticky top-0 z-50 shadow-2xl transition-colors duration-300 border-b`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h1 className={`text-xl font-black tracking-tight flex items-center ${isDark ? 'text-white' : 'text-slate-900'}`}>
              MarTech <span className="ml-1.5 px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-md text-sm border border-blue-500/20">Analytics Suite</span>
            </h1>
            <p className={`text-[10px] uppercase font-bold tracking-[0.2em] mt-0.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Plataforma de Inteligência</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl border transition-all duration-300 hover:scale-110 active:scale-95 ${
              isDark 
                ? 'bg-white/5 border-white/10 text-yellow-400 hover:bg-white/10' 
                : 'bg-slate-100 border-slate-200 text-indigo-600 hover:bg-slate-200'
            }`}
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.243 17.657l.707.707M7.757 6.343l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          <span className={`px-3 py-1.5 rounded-lg border text-xs font-bold tracking-wider transition-colors duration-300 ${
            isDark ? 'bg-white/5 border-white/10 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-500'
          }`}>v1.0.0</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
