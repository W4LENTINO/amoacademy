import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, AdminNotification } from '../../types';

interface AdminLayoutProps {
  user: User;
  onLogout: () => void;
  children: React.ReactNode;
  notifications: AdminNotification[];
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ user, onLogout, children, notifications }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { path: '/acesso-a7f9k2/dashboard', label: 'DASHBOARD', icon: '🏛️' },
    { path: '/acesso-a7f9k2/cursos', label: 'CURSOS', icon: '📚' },
    { path: '/acesso-a7f9k2/blog', label: 'BLOG', icon: '📰' },
    { path: '/acesso-a7f9k2/alunos', label: 'ALUNOS', icon: '👨‍🎓' },
    { path: '/acesso-a7f9k2/certificados', label: 'DIPLOMAS', icon: '📜' },
    { path: '/acesso-a7f9k2/inscricoes', label: 'INSCRIÇÕES', icon: '📋' },
    { path: '/acesso-a7f9k2/pagamentos', label: 'FINANÇAS', icon: '💰' },
    { path: '/acesso-a7f9k2/usuarios', label: 'ADMINS', icon: '👥' },
    { path: '/acesso-a7f9k2/seguranca', label: 'SEGURANÇA', icon: '🔒' },
    { path: '/acesso-a7f9k2/relatorios', label: 'RELATÓRIOS', icon: '📈' },
    { path: '/acesso-a7f9k2/configuracoes', label: 'SISTEMA', icon: '⚙️' },
  ];

  return (
    <div className="flex h-screen bg-[#f1f5f9] overflow-hidden font-sans">
      {/* Sidebar de Rigor */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-[#1a1a3a] text-white transition-all duration-500 flex flex-col z-50 shadow-2xl border-r border-white/5`}>
        <div className="h-24 flex items-center px-6 bg-[#13132b] border-b border-white/5">
          <div className="bg-[#10b981] p-1.5 rounded-lg min-w-[36px] flex items-center justify-center font-black text-xs shadow-lg">AMF</div>
          {isSidebarOpen && <span className="ml-4 font-black text-lg tracking-tighter uppercase opacity-90">Console Master</span>}
        </div>
        
        <nav className="flex-1 overflow-y-auto py-8 space-y-1 admin-scrollbar">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-4 transition-all group ${
                location.pathname.startsWith(item.path) 
                  ? 'bg-[#10b981] text-white border-r-4 border-white shadow-xl' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
              {isSidebarOpen && <span className="ml-4 font-bold text-[10px] tracking-[0.2em] uppercase">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button onClick={onLogout} className="flex items-center w-full px-4 py-4 text-red-400 hover:bg-red-400/10 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest">
            <span className="text-xl">🚪</span>
            {isSidebarOpen && <span className="ml-4">Encerrar Acesso</span>}
          </button>
        </div>
      </aside>

      {/* Container Principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-24 bg-white border-b border-slate-200 flex items-center justify-between px-10 z-20 shadow-sm">
          <div className="flex items-center">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-400 hover:text-[#1a1a3a] transition-colors p-2 bg-slate-50 rounded-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <div className="ml-10">
               <h1 className="text-xl font-black text-[#1a1a3a] uppercase tracking-tight leading-none">Gestão Centralizada</h1>
               <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.4em] mt-2">Protocolo de Ensino v3.1 • Luanda Core</p>
            </div>
          </div>
          <div className="flex items-center space-x-8">
             <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-[#1a1a3a] uppercase leading-none">{user.name}</p>
                <p className="text-[9px] text-[#10b981] font-black uppercase tracking-[0.3em] mt-2">Super Administrador</p>
             </div>
             <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-slate-300 shadow-inner group hover:border-[#10b981] transition-colors">
                <span className="group-hover:text-[#10b981]">AMF</span>
             </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-12 bg-[#f8fafc] student-scrollbar">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;