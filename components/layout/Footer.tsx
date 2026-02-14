import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1a1a3a] text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
        <div className="space-y-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#e84c5c] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-2xl">AMF</div>
            <span className="font-bold text-2xl tracking-tighter uppercase">AMOFARMA</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed italic">
            "Fazendo a Diferença a Cada Dose". A instituição angolana de referência para a capacitação farmacêutica avançada.
          </p>
        </div>

        <div>
          <h4 className="font-black text-[10px] uppercase tracking-[0.4em] mb-10 text-[#e84c5c]">Academia</h4>
          <ul className="space-y-4 text-slate-400 text-sm font-medium">
            <li><Link to="/cursos" className="hover:text-white transition-colors">Programas</Link></li>
            <li><Link to="/blog" className="hover:text-white transition-colors">Insights</Link></li>
            <li><Link to="/validar" className="hover:text-white transition-colors">Diplomas</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-[10px] uppercase tracking-[0.4em] mb-10 text-[#e84c5c]">Contactos</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li>cursos@amofarma.ao</li>
            <li>+244 943 574 878</li>
            <li>Luanda, Angola</li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-[10px] uppercase tracking-[0.4em] mb-10 text-[#e84c5c]">Conformidade</h4>
          <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
            <span className="text-[10px] font-bold text-emerald-500 uppercase flex items-center">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
              Inscrita na ARMED
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 pt-8 text-center">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">&copy; 2025 Academia AMOFARMA. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;