import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useStudentData } from '../../hooks/useStudentData';

export const StudentSidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { profile, logout } = useAuth();
  const { notificacoesNaoLidas } = useStudentData();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/area-do-aluno', icon: '🏠', label: 'Dashboard', exact: true },
    { path: '/area-do-aluno/cursos', icon: '📚', label: 'Meus Cursos' },
    { path: '/area-do-aluno/certificados', icon: '📜', label: 'Certificados' },
    { path: '/area-do-aluno/pagamentos', icon: '💰', label: 'Pagamentos' },
    { path: '/area-do-aluno/notificacoes', icon: '🔔', label: 'Notificações', badge: notificacoesNaoLidas },
    { path: '/area-do-aluno/perfil', icon: '👤', label: 'Perfil' },
    { path: '/area-do-aluno/configuracoes', icon: '⚙️', label: 'Configurações' }
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside className={`bg-[#1a1a3a] text-white min-h-screen sticky top-0 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="h-20 flex items-center px-4 border-b border-white/10">
        <div className={`flex items-center ${isCollapsed ? 'justify-center w-full' : 'space-x-3'}`}>
          <div className="w-10 h-10 bg-[#e84c5c] rounded-lg flex items-center justify-center font-bold text-lg flex-shrink-0">AMF</div>
          {!isCollapsed && (
            <div>
              <p className="font-bold text-sm">AMOFARMA</p>
              <p className="text-[10px] text-slate-400 uppercase">Área do Aluno</p>
            </div>
          )}
        </div>
      </div>
      <nav className="p-4 space-y-2">
        {menuItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
            className={({ isActive }) =>
              `flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-lg transition-colors relative ${
                isActive ? 'bg-[#e84c5c] text-white shadow-lg shadow-[#e84c5c]/20' : 'text-slate-300 hover:bg-white/10'
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            {!isCollapsed && <span className="flex-1 text-sm font-medium">{item.label}</span>}
            {item.badge ? (
              <span className="bg-[#e84c5c] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {item.badge}
              </span>
            ) : null}
          </NavLink>
        ))}
      </nav>
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <button onClick={handleLogout} className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} w-full px-4 py-3 text-slate-300 hover:bg-white/10 rounded-lg transition-colors`}>
          <span className="text-xl">🚪</span>
          {!isCollapsed && <span className="text-sm font-medium">Sair</span>}
        </button>
      </div>
    </aside>
  );
};