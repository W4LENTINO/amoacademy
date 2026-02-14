import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title, subtitle, children }) => {
  const { profile } = useAuth();
  return (
    <header className="bg-white border-b border-slate-100 px-8 py-6 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#1a1a3a] uppercase tracking-tight leading-none">{title}</h1>
          {subtitle && <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">{subtitle}</p>}
        </div>
        <div className="flex items-center space-x-6">
          {children}
          <div className="w-px h-10 bg-slate-100 hidden md:block"></div>
          <div className="flex items-center space-x-4">
             <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-[#1a1a3a] uppercase">{profile?.nome_completo.split(' ')[0]}</p>
                <p className="text-[9px] text-[#10b981] font-black uppercase tracking-widest mt-0.5">Super Admin</p>
             </div>
             <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center font-black text-slate-400 text-xs">AMF</div>
          </div>
        </div>
      </div>
    </header>
  );
};