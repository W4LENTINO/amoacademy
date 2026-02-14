import React from 'react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'sm' }) => {
  const getStyle = (s: string) => {
    switch (s.toLowerCase()) {
      case 'active':
      case 'activo':
      case 'valid':
      case 'valido':
      case 'confirmada':
      case 'concluido':
      case 'success':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'pending':
      case 'pendente':
      case 'warning':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'blocked':
      case 'bloqueado':
      case 'inactive':
      case 'cancelled':
      case 'cancelado':
      case 'danger':
        return 'bg-red-50 text-red-600 border-red-100';
      case 'info':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      default:
        return 'bg-slate-50 text-slate-400 border-slate-100';
    }
  };

  const getText = (s: string) => {
    const map: Record<string, string> = {
      'active': 'ACTIVO',
      'activo': 'ACTIVO',
      'valid': 'VÁLIDO',
      'valido': 'VÁLIDO',
      'confirmada': 'CONFIRMADA',
      'concluido': 'CONCLUÍDO',
      'pending': 'PENDENTE',
      'pendente': 'PENDENTE',
      'blocked': 'BLOQUEADO',
      'bloqueado': 'BLOQUEADO',
      'inactive': 'INACTIVO',
      'cancelled': 'CANCELADO',
      'cancelado': 'CANCELADO'
    };
    return map[s.toLowerCase()] || s.toUpperCase();
  };

  return (
    <span className={`inline-block font-black uppercase tracking-widest border rounded-lg ${
      size === 'sm' ? 'text-[8px] px-2 py-1' : 'text-[10px] px-4 py-2'
    } ${getStyle(status)}`}>
      {getText(status)}
    </span>
  );
};