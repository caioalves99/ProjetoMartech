import React from 'react';

interface TableProps {
  headers: string[];
  rows: (string | number)[][];
  className?: string;
}

const Table: React.FC<TableProps> = ({ headers, rows, className = '' }) => {
  return (
    <div className={`overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 shadow-xl transition-colors duration-300 ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-black/10 dark:divide-white/10">
          <thead className="bg-slate-200/50 dark:bg-slate-900/50">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-5 text-left text-[11px] font-black text-slate-600 dark:text-slate-500 uppercase tracking-[0.2em] border-b border-black/10 dark:border-white/10"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-transparent divide-y divide-black/5 dark:divide-white/5">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-colors group">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-700 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors"
                  >
                    {typeof cell === 'number' ? 
                      <span className="font-mono text-blue-700 dark:text-blue-400">
                        {cell.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}
                      </span> 
                      : cell
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
