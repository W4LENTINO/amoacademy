import React from 'react';
import { Link } from 'react-router-dom';

interface CertificateCardProps {
  certificate: {
    id: string;
    curso_nome: string;
    data_emissao: string;
    codigo_verificacao: string;
    status: string;
  };
}

export const CertificateCard: React.FC<CertificateCardProps> = ({ certificate }) => {
  return (
    <Link
      to={`/area-do-aluno/certificados/${certificate.id}`}
      className="block bg-white rounded-3xl p-6 shadow-sm border border-slate-50 hover:shadow-xl hover:-translate-y-1 transition-all group"
    >
      <div className="flex items-start space-x-5">
        <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-emerald-500 group-hover:text-white transition-all">📜</div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-black text-[#1a1a3a] uppercase tracking-tight truncate mr-4">{certificate.curso_nome}</h4>
            <span className={`text-[8px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest border ${
              certificate.status === 'valido' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'
            }`}>{certificate.status}</span>
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">Emitido: {new Date(certificate.data_emissao).toLocaleDateString('pt-PT')}</p>
          <div className="flex items-center justify-between pt-4 border-t border-slate-50">
             <span className="text-[9px] font-mono text-slate-300">CODE: {certificate.codigo_verificacao}</span>
             <span className="text-[#e84c5c] text-[10px] font-black uppercase tracking-widest group-hover:translate-x-2 transition-transform">Ver Diploma &rarr;</span>
          </div>
        </div>
      </div>
    </Link>
  );
};