import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, AdminNotification } from '../../types';
import { FiHome, FiBook, FiUsers, FiFileText, FiShield, FiSettings, FiMenu, FiLogOut, FiDollarSign } from 'react-icons/fi';
import { BiNews } from 'react-icons/bi';
import { HiOutlineChartBar } from 'react-icons/hi';

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
    { path: '/acesso-a7f9k2/dashboard', label: 'DASHBOARD', icon: <FiHome /> },
    { path: '/acesso-a7f9k2/cursos', label: 'CURSOS', icon: <FiBook /> },
    { path: '/acesso-a7f9k2/blog', label: 'BLOG', icon: <BiNews /> },
    { path: '/acesso-a7f9k2/alunos', label: 'ALUNOS', icon: <FiUsers /> },
    { path: '/acesso-a7f9k2/certificados', label: 'DIPLOMAS', icon: <FiFileText /> },
    { path: '/acesso-a7f9k2/pagamentos', label: 'FINANÇAS', icon: <FiDollarSign /> },
    { path: '/acesso-a7f9k2/seguranca', label: 'SEGURANÇA', icon: <FiShield /> },
    { path: '/acesso-a7f9k2/relatorios', label: <HiOutlineChartBar />, label_txt: 'RELATÓRIOS' },
    { path: '/acesso-a7f9k2/configuracoes', label: 'SISTEMA', icon: <FiSettings /> },
  ];

  return (
    <div className="flex h-screen bg-[#f1f5f9] overflow-hidden font-sans">
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
              <span className="text-xl group-hover:scale-110 transition-transform">{item.icon || item.label}</span>
              {isSidebarOpen && <span className="ml-4 font-bold text-[10px] tracking-[0.2em] uppercase">{item.label_txt || item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button onClick={onLogout} className="flex items-center w-full px-4 py-4 text-red-400 hover:bg-red-400/10 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest">
            <FiLogOut className="text-xl" />
            {isSidebarOpen && <span className="ml-4">Encerrar Acesso</span>}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-24 bg-white border-b border-slate-200 flex items-center justify-between px-10 z-20 shadow-sm">
          <div className="flex items-center">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-400 hover:text-[#1a1a3a] transition-colors p-2 bg-slate-50 rounded-xl">
              <FiMenu size={24} />
            </button>
            <div className="ml-10">
               <h1 className="text-xl font-black text-[#1a1a3a] uppercase tracking-tight leading-none">Gestão Centralizada</h1>
               <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.4em] mt-2">Protocolo v3.1</p>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-12 bg-[#f8fafc] student-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;