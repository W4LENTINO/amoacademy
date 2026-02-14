
import React from 'react';

const AdminCompanyList: React.FC = () => {
  const companies = [
    { name: 'Mecofarma', type: 'Rede de Farmácias', students: 142 },
    { name: 'Angofarma', type: 'Distribuidora', students: 85 },
    { name: 'Ministério da Saúde', type: 'Governo', students: 502 }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-gray-800 uppercase tracking-tight">Gestão de Parceiros</h2>
          <p className="text-gray-400 font-medium">Controlo de Protocolos e Empresas Conveniadas</p>
        </div>
        <button className="bg-gray-800 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">
          + Novo Protocolo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {companies.map((c, i) => (
          <div key={i} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl mb-6">🏢</div>
            <h3 className="text-xl font-black text-gray-800 uppercase tracking-tight">{c.name}</h3>
            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-6">{c.type}</p>
            <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
              <span className="text-xs font-bold text-gray-400 uppercase">Formandos</span>
              <span className="text-lg font-black text-gray-800">{c.students}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCompanyList;
