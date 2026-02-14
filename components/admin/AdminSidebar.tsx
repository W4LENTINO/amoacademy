import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const AdminSidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/acesso-a7f9k2/dashboard', icon: '🏠', label: 'Dashboard' },
    { path: '/acesso-a7f9k2/cursos', icon: '📚', label: 'Cursos' },
    { path: '/acesso-a7f9k2/alunos', icon: '👨‍🎓', label: 'Alunos' },
    { path: '/acesso-a7f9k2/certificados', icon: '📜', label: 'Certificados' },
    { path: '/acesso-a7f9k2/inscricoes', icon: '📋', label: 'Inscrições' },
    { path: '/acesso-a7f9k2/pagamentos', icon: '💰', label: 'Pagamentos' },
    { path: '/acesso-a7f9k2/blog', icon: '📰', label: 'Blog' },
    { path: '/acesso-a7f9k2/usuarios', icon: '👥', label: 'Administradores' },
    { path: '/acesso-a7f9k2/seguranca', icon: '🔒', label: 'Segurança' },
    { path: '/acesso-a7f9k2/relatorios', icon: '📊', label: 'Relatórios' },
    { path: '/acesso-a7f9k2/configuracoes', icon: '⚙️', label: 'Ajustes' }
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/acesso-a7f9k2');
  };

  return (
    <aside 
      className={`bg-[#1a1a3a] text-white h-screen sticky top-0 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      } flex flex-col z-50`}
    >
      <div className="h-20 flex items-center px-4 border-b border-white/10 shrink-0">
        <div className={`flex items-center ${isCollapsed ? 'justify-center w-full' : 'space-x-3'}`}>
          <div className="w-10 h-10 bg-[#10b981] rounded-lg flex items-center justify-center font-black text-xs shrink-0 shadow-lg">
            AMF
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className="font-black text-sm tracking-tighter uppercase">Console Central</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Academia</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto admin-scrollbar">
        {menuItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest ${
                isActive 
                  ? 'bg-[#10b981] text-white shadow-lg' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {!isCollapsed && <span className="flex-1">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} w-full px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest`}
        >
          <span className="text-lg">🚪</span>
          {!isCollapsed && <span>Encerrar Sessão</span>}
        </button>
      </div>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 bg-[#1a1a3a] border border-white/10 rounded-full p-1 text-white hover:bg-[#10b981] transition-colors"
      >
        <svg
          className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </aside>
  );
};
