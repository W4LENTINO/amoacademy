
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, AdminNotification } from '../types';

interface AdminLayoutProps {
  user: User;
  onLogout: () => void;
  children: React.ReactNode;
  notifications: AdminNotification[];
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ user, onLogout, children, notifications }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.read).length;

  // Keyboard Shortcuts (PDF 14.2)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        alert('Simulando: Salvar Formulário (Ctrl+S)');
      }
      if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        alert('Simulando: Pesquisar na Lista (Ctrl+F)');
      }
      if (e.key === 'Escape') {
        setShowNotifications(false);
        setShowProfileDropdown(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const menuItems = [
    { path: '/acesso-a7f9k2/dashboard', label: 'DASHBOARD', icon: '🏠' },
    { path: '/acesso-a7f9k2/cursos', label: 'CURSOS', icon: '📚' },
    { path: '/acesso-a7f9k2/blog', label: 'BLOG', icon: '📝' },
    { path: '/acesso-a7f9k2/alunos', label: 'ALUNOS', icon: '👨‍🎓' },
    { path: '/acesso-a7f9k2/certificados', label: 'CERTIFICADOS', icon: '📜' },
    { path: '/acesso-a7f9k2/inscricoes', label: 'INSCRIÇÕES', icon: '📋' },
    { path: '/acesso-a7f9k2/empresas', label: 'EMPRESAS', icon: '💼' },
    { path: '/acesso-a7f9k2/seguranca', label: 'SEGURANÇA', icon: '🔒' },
    { path: '/acesso-a7f9k2/configuracoes', label: 'CONFIGURAÇÕES', icon: '⚙️' },
  ];

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
      {/* Sidebar - PDF 2.1 e 3.1 */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-[#1f2937] text-white transition-all duration-300 flex flex-col z-30 shadow-2xl`}>
        <div className="h-20 flex items-center px-6 bg-[#111827]">
          <div className="bg-[#10b981] p-1 rounded min-w-[32px] flex items-center justify-center font-bold shadow-lg">AMF</div>
          {isSidebarOpen && <span className="ml-3 font-black text-xl tracking-tighter">AMOFARMA</span>}
        </div>
        
        <nav className="flex-1 overflow-y-auto py-8 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-4 transition-all group ${
                location.pathname.startsWith(item.path) 
                  ? 'bg-[#10b981] text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
              {isSidebarOpen && <span className="ml-4 font-bold text-xs tracking-widest">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <button 
          onClick={() => { if(window.confirm('Tem certeza que deseja sair?')) onLogout(); }}
          className="p-8 flex items-center text-red-400 hover:text-red-300 hover:bg-gray-800 transition-colors border-t border-gray-800"
        >
          <span className="text-xl">🚪</span>
          {isSidebarOpen && <span className="ml-4 font-black text-xs tracking-widest">SAIR</span>}
        </button>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - PDF 2.1 */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10 z-20 sticky top-0">
          <div className="flex items-center">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-400 hover:text-[#10b981] transition-colors p-2 bg-gray-50 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <div className="ml-6">
              <h1 className="text-xl font-black text-gray-800 tracking-tight">Painel Administrativo</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Sistema Central v2.1</p>
            </div>
          </div>

          <div className="flex items-center space-x-8">
            {/* Notifications Dropdown */}
            <div className="relative">
              <button 
                onClick={() => { setShowNotifications(!showNotifications); setShowProfileDropdown(false); }}
                className="relative text-gray-400 hover:text-[#10b981] transition-colors p-2"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-4 w-96 bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden ring-1 ring-black/5 animate-fadeIn">
                  <div className="p-6 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                    <span className="font-black text-xs text-gray-800 tracking-widest uppercase">Central de Alertas</span>
                    <button className="text-[10px] text-[#10b981] font-black uppercase tracking-wider hover:underline">Limpar</button>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className={`p-6 border-b border-gray-50 hover:bg-gray-50 transition-colors flex space-x-4 ${!n.read ? 'bg-[#10b981]/5' : ''}`}>
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          n.type === 'critical' ? 'bg-red-500' : 
                          n.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                        }`} />
                        <div>
                          <p className={`text-sm ${n.type === 'critical' ? 'text-red-600 font-black' : 'text-gray-700 font-medium'}`}>{n.message}</p>
                          <span className="text-[10px] text-gray-400 mt-2 block font-bold">{n.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="block w-full text-center p-4 text-[10px] font-black text-[#10b981] bg-gray-50 hover:bg-gray-100 uppercase tracking-widest">Ver Todo o Histórico</button>
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button 
                onClick={() => { setShowProfileDropdown(!showProfileDropdown); setShowNotifications(false); }}
                className="flex items-center space-x-4 group"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-black text-gray-800 leading-none">{user.name}</p>
                  <p className="text-[9px] text-[#10b981] font-black uppercase tracking-[0.2em] mt-1">{user.role}</p>
                </div>
                <div className="w-12 h-12 bg-white rounded-[1rem] shadow-sm flex items-center justify-center border-2 border-gray-50 group-hover:border-[#10b981] transition-all overflow-hidden">
                  {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : <span className="text-2xl">👤</span>}
                </div>
              </button>

              {showProfileDropdown && (
                <div className="absolute right-0 mt-4 w-56 bg-white rounded-[1.5rem] shadow-2xl border border-gray-100 py-3 ring-1 ring-black/5 animate-fadeIn">
                  <Link to="/acesso-a7f9k2/perfil" className="block px-6 py-3 text-xs font-bold text-gray-600 hover:bg-[#10b981]/10 hover:text-[#10b981] transition-colors">MEU PERFIL</Link>
                  <Link to="/acesso-a7f9k2/configuracoes" className="block px-6 py-3 text-xs font-bold text-gray-600 hover:bg-[#10b981]/10 hover:text-[#10b981] transition-colors">AJUSTES</Link>
                  <hr className="my-2 border-gray-50" />
                  <button onClick={onLogout} className="w-full text-left px-6 py-3 text-xs font-black text-red-500 hover:bg-red-50 transition-colors uppercase tracking-widest">Encerrar Sessão</button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-12 bg-[#f8fafc]">
          {children}
        </main>

        {/* Persistent Dashboard Footer - PDF 16.0 */}
        <footer className="bg-white border-t border-gray-100 px-10 py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <div className="flex items-center space-x-8">
            <span className="flex items-center space-x-2"><span className="text-[#10b981]">📧</span> <span>cursos@amofarma.ao</span></span>
            <span className="flex items-center space-x-2"><span className="text-[#10b981]">📞</span> <span>+244 943 574 878 / 951 005 363</span></span>
          </div>
          <div className="flex items-center space-x-2">
             <span className="text-[#10b981]">📍</span>
             <span>AV. PEDRO CASTRO VAN-DUNEM LOY, LUANDA</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
