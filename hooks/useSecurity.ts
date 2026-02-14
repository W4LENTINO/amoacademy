import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sanitizer } from '../lib/sanitizer';
import { useAuth } from '../contexts/AuthContext';

export function useSecurity() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);

  // Proteção contra Clickjacking
  useEffect(() => {
    if (window.self !== window.top) {
      window.top?.location.replace(window.self.location.href);
    }
  }, []);

  // Timer de Inatividade
  const handleLogout = useCallback(async () => {
    if (isAuthenticated) {
      await logout();
      navigate('/login?timeout=true');
    }
  }, [isAuthenticated, logout, navigate]);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Fix: Replaced NodeJS.Timeout with any to avoid namespace errors in browser environments
    let warningTimer: any;
    let logoutTimer: any;

    const resetTimers = () => {
      setShowTimeoutWarning(false);
      clearTimeout(warningTimer);
      clearTimeout(logoutTimer);

      // Aviso aos 15 minutos
      warningTimer = setTimeout(() => {
        setShowTimeoutWarning(true);
      }, 15 * 60 * 1000);

      // Logout aos 20 minutos
      logoutTimer = setTimeout(() => {
        handleLogout();
      }, 20 * 60 * 1000);
    };

    const events = ['mousedown', 'keydown', 'scroll', 'mousemove', 'touchstart'];
    events.forEach(event => window.addEventListener(event, resetTimers));
    
    resetTimers();

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimers));
      clearTimeout(warningTimer);
      clearTimeout(logoutTimer);
    };
  }, [isAuthenticated, handleLogout]);

  // Proteção contra cópia de dados sensíveis
  useEffect(() => {
    const handleCopy = (e: ClipboardEvent) => {
      const selection = window.getSelection()?.toString() || '';
      // Regex para BI Angolano ou Email
      const sensitivePattern = /(\d{9}[A-Z]{2}\d{3})|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;
      
      if (sensitivePattern.test(selection)) {
        e.preventDefault();
        alert('Por motivos de segurança institucional, não é permitido copiar dados sensíveis desta plataforma.');
      }
    };

    document.addEventListener('copy', handleCopy);
    return () => document.removeEventListener('copy', handleCopy);
  }, []);

  return {
    showTimeoutWarning,
    sanitizeInput: sanitizer.sanitizeString,
    sanitizeObject: sanitizer.sanitizeObject,
    isSecure: window.location.protocol === 'https:' || window.location.hostname === 'localhost',
    secureInputProps: {
      autoComplete: 'off',
      spellCheck: false,
      'data-lpignore': 'true'
    }
  };
}
