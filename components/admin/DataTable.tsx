import React from 'react';

interface Column {
  header: string;
  accessor: string | ((row: any) => React.ReactNode);
  cell?: (value: any, row: any) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  emptyMessage?: string;
}

export const DataTable: React.FC<DataTableProps> = ({ columns, data, emptyMessage = 'Nenhum dado localizado.' }) => {
  return (
    <div className="bg-white rounded-[2rem] border border-slate-50 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-50">
              {columns.map((col, i) => (
                <th key={i} className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.length > 0 ? data.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50/30 transition-colors group">
                {columns.map((col, j) => {
                  const value = typeof col.accessor === 'function' ? col.accessor(row) : row[col.accessor];
                  return (
                    <td key={j} className="px-8 py-5">
                      <div className="text-sm font-bold text-[#1a1a3a]">
                        {col.cell ? col.cell(value, row) : value}
                      </div>
                    </td>
                  );
                })}
              </tr>
            )) : (
              <tr>
                <td colSpan={columns.length} className="py-24 text-center">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] italic">"{emptyMessage}"</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};