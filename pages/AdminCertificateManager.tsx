
import React from 'react';

const AdminCertificateManager: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-gray-800 uppercase tracking-tight">Central de Certificados</h2>
          <p className="text-gray-400 font-medium">Emissão Digital e Gestão de Chaves Hash</p>
        </div>
        <button className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">
          Emitir em Lote (PDF)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Emitidos', val: 4502, color: 'text-emerald-600' },
          { label: 'Verificações QR', val: 12403, color: 'text-blue-600' },
          { label: 'Revogados', val: 3, color: 'text-red-600' }
        ].map((s, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm text-center">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{s.label}</p>
            <p className={`text-4xl font-black ${s.color}`}>{s.val.toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-12 rounded-[3rem] border-2 border-dashed border-gray-200 text-center opacity-40">
        <span className="text-6xl mb-6 block">📂</span>
        <p className="text-sm font-black text-gray-400 uppercase tracking-[0.4em]">Histórico de Emissões Carregando...</p>
      </div>
    </div>
  );
};

export default AdminCertificateManager;
