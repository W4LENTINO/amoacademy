
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface AdminLoginProps {
  onLogin: (email: string) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (email === 'admin@amofarma.ao' && password === 'Admin') {
        onLogin(email);
        navigate('/acesso-a7f9k2/dashboard');
      } else {
        setError('Falha na Autenticação Institucional.');
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#064e3b] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-lg bg-white p-16 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] relative">
        <div className="text-center mb-16">
          <div className="w-20 h-20 border-2 border-[#064e3b] flex items-center justify-center mx-auto mb-10">
            <span className="text-[#064e3b] font-black text-2xl tracking-tighter uppercase">AMF</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">Consola de Gestão</h1>
          <p className="text-[10px] text-gray-400 mt-4 font-bold uppercase tracking-[0.4em]">Acesso Administrativo Reservado</p>
        </div>

        {error && <div className="bg-red-50 text-red-700 p-5 text-[10px] font-black mb-10 border-l-4 border-red-500 uppercase tracking-widest text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-10">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Credencial Administrativa</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-b-2 border-gray-100 px-0 py-4 focus:border-[#064e3b] outline-none transition-all font-bold text-gray-800" placeholder="admin@amofarma.ao" />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Senha de Sistema</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border-b-2 border-gray-100 px-0 py-4 focus:border-[#064e3b] outline-none transition-all font-bold text-gray-800" placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-[#064e3b] hover:bg-black text-white py-6 font-black text-[10px] uppercase tracking-[0.3em] transition-all disabled:opacity-50">
            {loading ? 'Validando...' : 'Autenticar Acesso'}
          </button>
        </form>
        <div className="mt-16 pt-10 border-t border-gray-50 text-center">
          <Link to="/" className="text-[10px] font-black text-gray-400 hover:text-emerald-600 transition uppercase tracking-widest">Retornar ao Portal Público</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
