import React from 'react';

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: { id: string; label: string }[];
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <div className="flex bg-slate-400/10 dark:bg-slate-900/40 backdrop-blur-xl p-2 rounded-[1.25rem] shadow-2xl border border-black/5 dark:border-white/5 mb-10 max-w-fit mx-auto ring-1 ring-black/5 dark:ring-white/5 transition-colors duration-300">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`px-8 py-3.5 text-sm font-black rounded-[0.85rem] transition-all duration-300 ease-out whitespace-nowrap tracking-tight ${
            activeTab === tab.id
              ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl shadow-blue-500/20 ring-1 ring-white/20'
              : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5'
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
