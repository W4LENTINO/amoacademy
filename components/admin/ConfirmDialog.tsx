import React from 'react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirmar', cancelText = 'Cancelar', type = 'info' }) => {
  if (!isOpen) return null;

  const colorClass = type === 'danger' ? 'bg-red-500 hover:bg-red-600' : type === 'warning' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-[#1a1a3a] hover:bg-[#e84c5c]';

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-premium p-10 animate-reveal border border-slate-50">
        <h3 className="text-xl font-black text-[#1a1a3a] uppercase tracking-tight mb-4">{title}</h3>
        <p className="text-sm text-slate-500 font-medium leading-relaxed mb-10">{message}</p>
        <div className="flex gap-4">
          <button onClick={onClose} className="flex-1 px-8 py-4 bg-slate-50 text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-slate-100 transition-all">{cancelText}</button>
          <button onClick={onConfirm} className={`flex-1 px-8 py-4 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all shadow-lg ${colorClass}`}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
};