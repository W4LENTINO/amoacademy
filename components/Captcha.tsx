import React, { useState, useEffect } from 'react';

interface SimpleCaptchaProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
}

export const SimpleCaptcha: React.FC<SimpleCaptchaProps> = ({ onVerify, onExpire }) => {
  const [nums, setNums] = useState({ a: 0, b: 0 });
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);
  const [verified, setVerified] = useState(false);

  const generateChallenge = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setNums({ a, b });
    setAnswer('');
    setError(false);
    setVerified(false);
    onExpire?.();
  };

  useEffect(() => {
    generateChallenge();
  }, []);

  const handleVerify = () => {
    const isCorrect = parseInt(answer) === nums.a + nums.b;
    if (isCorrect) {
      setVerified(true);
      setError(false);
      onVerify('captcha-verified-token-' + Date.now());
    } else {
      setError(true);
      onExpire?.();
    }
  };

  if (verified) {
    return (
      <div className="flex items-center space-x-3 p-4 bg-emerald-50 border border-emerald-100 rounded-xl animate-reveal">
        <span className="text-emerald-600 text-sm font-bold">✓ Verificação de segurança concluída</span>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
        Verificação Humana
      </label>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 font-black text-xl text-[#1a1a3a]">
          <span>{nums.a}</span>
          <span className="text-slate-300">+</span>
          <span>{nums.b}</span>
          <span className="text-slate-300">=</span>
        </div>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value.replace(/\D/g, ''))}
          className="w-20 px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-[#e84c5c] outline-none transition-all text-center font-bold"
          placeholder="?"
          maxLength={2}
        />
        <button
          type="button"
          onClick={handleVerify}
          className="bg-[#1a1a3a] text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#e84c5c] transition-all"
        >
          Validar
        </button>
      </div>
      {error && <p className="text-red-500 text-[10px] font-bold uppercase">Resultado incorreto. Tente novamente.</p>}
      <button 
        type="button" 
        onClick={generateChallenge} 
        className="text-[9px] font-bold text-slate-400 uppercase hover:text-[#e84c5c]"
      >
        ↻ Gerar novo desafio
      </button>
    </div>
  );
};

export default SimpleCaptcha;