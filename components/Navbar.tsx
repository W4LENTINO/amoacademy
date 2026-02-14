import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, profile, logout } = useAuth();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navigation = [
    { name: 'Início', path: '/' },
    { name: 'Programas', path: '/cursos' },
    { name: 'Insights', path: '/blog' },
    { name: 'Validar', path: '/validar' },
    { name: 'FAQ', path: '/faq' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-[100] border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-[#e84c5c] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-105 transition-transform">
              AMF
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-[#1a1a3a] leading-none tracking-tight">AMOFARMA</span>
              <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mt-1">Academia</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                className={`text-[11px] font-black uppercase tracking-widest transition-all relative py-2 group ${
                  isActive(item.path) ? 'text-[#e84c5c]' : 'text-[#1a1a3a]/60 hover:text-[#e84c5c]'
                }`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#e84c5c] transition-transform duration-300 origin-left ${isActive(item.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </Link>
            ))}
            
            <div className="w-px h-6 bg-slate-200"></div>

            {isAuthenticated ? (
              <div className="flex items-center space-x-6">
                <Link to="/area-do-aluno" className="text-xs font-black text-[#1a1a3a] hover:text-[#e84c5c] transition-colors uppercase tracking-widest">
                  {profile?.nome_completo.split(' ')[0]}
                </Link>
                <button onClick={logout} className="text-xs font-black text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest cursor-pointer">
                  Sair
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-[#1a1a3a] hover:bg-[#e84c5c] text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-md active:scale-95">
                Entrar
              </Link>
            )}
          </div>

          <div className="lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#1a1a3a] p-2 focus:outline-none"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div 
        className={`lg:hidden fixed inset-0 top-20 bg-slate-900/20 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      <div 
        className={`lg:hidden absolute top-20 left-0 w-full bg-white border-t border-slate-100 shadow-2xl transition-all duration-500 ease-in-out transform ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-4 opacity-0 invisible'
        }`}
      >
        <div className="p-6 space-y-2">
          {navigation.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              className={`block px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${
                isActive(item.path) ? 'bg-[#e84c5c]/10 text-[#e84c5c] shadow-sm' : 'text-[#1a1a3a] hover:bg-slate-50'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;