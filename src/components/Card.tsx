import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`glass-card rounded-2xl p-6 transition-all duration-300 flex flex-col h-full group ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h3>
      </div>
      <div className="flex-1 text-slate-700 dark:text-slate-300 leading-relaxed font-medium transition-colors duration-300">{children}</div>
    </div>
  );
};

export default Card;
