import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiX } from 'react-icons/fi';

interface ToastProps {
  show: boolean;
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ show, message, type = 'success', onClose, duration = 5000 }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  const config = {
    success: {
      icon: <FiCheckCircle className="text-emerald-500" size={20} />,
      bg: 'bg-white',
      border: 'border-emerald-100',
      shadow: 'shadow-[0_20px_50px_rgba(16,185,129,0.15)]'
    },
    error: {
      icon: <FiAlertCircle className="text-red-500" size={20} />,
      bg: 'bg-white',
      border: 'border-red-100',
      shadow: 'shadow-[0_20px_50px_rgba(239,68,68,0.15)]'
    },
    info: {
      icon: <FiAlertCircle className="text-blue-500" size={20} />,
      bg: 'bg-white',
      border: 'border-blue-100',
      shadow: 'shadow-[0_20px_50px_rgba(59,130,246,0.15)]'
    }
  };

  const current = config[type];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          className={`fixed bottom-8 right-8 z-[200] flex items-center gap-4 p-5 pr-6 rounded-[1.5rem] border ${current.border} ${current.bg} ${current.shadow} min-w-[320px] max-w-[450px] backdrop-blur-md`}
        >
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
            {current.icon}
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Notificação de Sistema</p>
            <p className="text-sm font-bold text-[#1a1a3a] leading-tight">{message}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-300 hover:text-[#1a1a3a] transition-colors p-1"
          >
            <FiX size={18} />
          </button>
          
          {/* Progress bar effect */}
          <motion.div 
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: duration / 1000, ease: 'linear' }}
            className={`absolute bottom-0 left-6 right-6 h-0.5 rounded-full ${type === 'success' ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;