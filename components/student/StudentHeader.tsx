import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface StudentHeaderProps {
  title: string;
  subtitle?: string;
  userName?: string;
  notificationCount?: number;
}

export const StudentHeader: React.FC<StudentHeaderProps> = ({ title, subtitle, userName, notificationCount }) => {
  const { profile } = useAuth();
  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-40">
      <div className="px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#1a1a3a] tracking-tight uppercase">{title}</h1>
          {subtitle && (
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
              {subtitle} {userName && <span className="text-[#e84c5c]">{userName}</span>}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/area-do-aluno/notificacoes" className="relative p-2 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {notificationCount ? (
              <span className="absolute -top-1 -right-1 bg-[#e84c5c] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white">
                {notificationCount}
              </span>
            ) : null}
          </Link>
          <div className="flex items-center space-x-3">
            <div className="text-right hidden md:block">
              <p className="text-sm font-black text-[#1a1a3a] leading-none uppercase">{profile?.nome_completo?.split(' ')[0]}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">Aluno</p>
            </div>
            <div className="w-10 h-10 bg-[#1a1a3a] rounded-xl flex items-center justify-center text-white font-black text-lg">
              {profile?.nome_completo?.charAt(0) || 'A'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};