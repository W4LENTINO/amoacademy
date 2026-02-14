import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-[100] border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between h-20 items-center">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-[#e84c5c] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-105 transition-transform">
            AMF
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl text-[#1a1a3a] leading-none tracking-tight">AMOFARMA</span>
            <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mt-1">Academia</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {[
            { name: 'Início', path: '/' },
            { name: 'Cursos', path: '/cursos' },
            { name: 'Insights', path: '/blog' },
            { name: 'Validar', path: '/validar' },
            { name: 'Sobre', path: '/sobre' }
          ].map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              className={`text-[11px] font-black uppercase tracking-widest transition-all ${
                isActive(item.path) ? 'text-[#e84c5c]' : 'text-[#1a1a3a]/60 hover:text-[#e84c5c]'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link to="/login" className="bg-[#1a1a3a] hover:bg-[#e84c5c] text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-md">
            Entrar
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;