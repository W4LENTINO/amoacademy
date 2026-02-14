import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, profile, logout } = useAuth();

  // Close mobile menu on route change
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

          {/* Desktop Menu */}
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

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#1a1a3a] p-2 relative w-10 h-10 flex items-center justify-center focus:outline-none"
              aria-expanded={isMobileMenuOpen}
              aria-label="Menu principal"
            >
              <div className="w-6 flex flex-col items-end justify-center space-y-1.5">
                <span className={`block h-0.5 bg-current transition-all duration-300 ease-out ${isMobileMenuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`}></span>
                <span className={`block h-0.5 bg-current transition-all duration-300 ease-out ${isMobileMenuOpen ? 'opacity-0' : 'w-4'}`}></span>
                <span className={`block h-0.5 bg-current transition-all duration-300 ease-out ${isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-5'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 top-20 bg-slate-900/20 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      {/* Mobile Menu Content */}
      <div 
        className={`lg:hidden absolute top-20 left-0 w-full bg-white border-t border-slate-100 shadow-2xl transition-all duration-500 ease-in-out transform ${
          isMobileMenuOpen 
            ? 'translate-y-0 opacity-100 visible' 
            : '-translate-y-4 opacity-0 invisible'
        }`}
      >
        <div className="p-6 space-y-2">
          {navigation.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              className={`block px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${
                isActive(item.path) 
                  ? 'bg-[#e84c5c]/10 text-[#e84c5c] shadow-sm' 
                  : 'text-[#1a1a3a] hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{item.name}</span>
                {isActive(item.path) && (
                  <span className="w-1.5 h-1.5 bg-[#e84c5c] rounded-full"></span>
                )}
              </div>
            </Link>
          ))}
          
          <div className="pt-6 mt-4 border-t border-slate-100">
            {isAuthenticated ? (
              <div className="space-y-3">
                <Link 
                  to="/area-do-aluno" 
                  className="block w-full bg-[#1a1a3a] text-white p-5 rounded-2xl text-center text-xs font-black uppercase tracking-widest shadow-xl active:scale-[0.98] transition-all"
                >
                  Portal do Aluno
                </Link>
                <button 
                  onClick={logout}
                  className="block w-full text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest py-2"
                >
                  Terminar Sessão
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="block bg-[#1a1a3a] hover:bg-[#e84c5c] text-white p-5 rounded-2xl text-center text-xs font-black uppercase tracking-widest shadow-xl active:scale-[0.98] transition-all"
              >
                Entrar na Conta
              </Link>
            )}
          </div>
        </div>
        
        {/* Mobile Menu Footer Info */}
        <div className="bg-slate-50 p-6 flex flex-col items-center space-y-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Apoio Institucional</p>
          <div className="flex space-x-6">
            <a href="tel:+244943574878" className="text-[#1a1a3a] hover:text-[#e84c5c] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            </a>
            <a href="mailto:cursos@amofarma.ao" className="text-[#1a1a3a] hover:text-[#e84c5c] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;