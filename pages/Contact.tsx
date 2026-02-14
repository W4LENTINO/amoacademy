import React, { useState } from 'react';
import { useSecurity } from '../hooks/useSecurity';
import { SimpleCaptcha } from '../components/Captcha';

const Contact: React.FC = () => {
  const { sanitizeInput, secureInputProps } = useSecurity();
  const [formData, setFormData] = useState({ nome: '', email: '', mensagem: '' });
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaVerified) return;

    setSending(true);
    // Simulação de envio com dados sanitizados
    const safeData = {
      nome: sanitizeInput(formData.nome),
      email: formData.email.trim().toLowerCase(),
      mensagem: sanitizeInput(formData.mensagem)
    };
    
    console.log('Solicitação enviada:', safeData);
    
    setTimeout(() => {
      setSending(false);
      setSuccess(true);
      setFormData({ nome: '', email: '', mensagem: '' });
      setCaptchaVerified(false);
    }, 1500);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="py-24 bg-[#064e3b] text-center px-6">
        <h1 className="text-5xl font-prestige font-black text-white uppercase tracking-tighter">Canais Institucionais</h1>
        <p className="text-slate-400 text-xs font-black uppercase tracking-[0.4em] mt-6">Apoio ao Aluno e Parcerias Corporativas</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 -mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 pb-32">
        <div className="lg:col-span-8 bg-white shadow-premium p-12 md:p-20 border border-slate-50 relative">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-red-700"></div>
          <h2 className="text-2xl font-prestige font-bold text-slate-900 uppercase mb-12 tracking-tight">Envie sua Consulta</h2>
          
          {success ? (
            <div className="bg-emerald-50 border border-emerald-100 p-10 rounded-2xl text-center animate-reveal">
               <span className="text-4xl mb-4 block">✉️</span>
               <h3 className="text-emerald-900 font-bold uppercase text-sm tracking-widest">Solicitação Encaminhada</h3>
               <p className="text-emerald-600 text-xs mt-2 font-medium">Nossa equipa técnica responderá ao seu email corporativo em breve.</p>
               <button onClick={() => setSuccess(false)} className="mt-8 text-[9px] font-black uppercase tracking-widest text-emerald-800 border-b border-emerald-200 pb-1">Nova Mensagem</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome Completo</label>
                <input 
                  type="text" 
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  className="w-full bg-slate-50 border-b border-slate-200 p-4 focus:border-[#064e3b] outline-none transition font-bold" 
                  {...secureInputProps}
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">E-mail Corporativo</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-slate-50 border-b border-slate-200 p-4 focus:border-[#064e3b] outline-none transition font-bold" 
                  {...secureInputProps}
                />
              </div>
              <div className="md:col-span-2 space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mensagem Académica</label>
                <textarea 
                  required
                  value={formData.mensagem}
                  onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
                  className="w-full bg-slate-50 border-b border-slate-200 p-4 focus:border-[#064e3b] outline-none transition font-bold h-40 resize-none" 
                  {...secureInputProps}
                />
              </div>

              <div className="md:col-span-2">
                {/* Fix: onVerify prop expects a function that takes a string token, so we wrap setCaptchaVerified */}
                <SimpleCaptcha onVerify={() => setCaptchaVerified(true)} />
              </div>

              <button 
                type="submit"
                disabled={sending || !captchaVerified}
                className="md:col-span-2 bg-[#064e3b] text-white py-6 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-black transition-all disabled:opacity-50"
              >
                {sending ? 'A ENVIAR...' : 'Encaminhar Solicitação'}
              </button>
            </form>
          )}
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-slate-50 p-12 border border-slate-100 rounded-sm">
            <h3 className="text-lg font-prestige font-bold text-slate-900 uppercase mb-6">Sede Central</h3>
            <p className="text-sm text-slate-500 leading-relaxed italic mb-8">
              Av. Pedro Castro Van-Dunem Loy,<br/>
              Luanda, República de Angola.
            </p>
            <div className="aspect-square bg-slate-200 overflow-hidden shadow-inner grayscale">
              <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Map Placeholder" />
            </div>
          </div>
          <div className="bg-[#064e3b] p-12 text-white">
            <h3 className="text-lg font-prestige font-bold uppercase mb-6">Atendimento</h3>
            <div className="space-y-4 text-[11px] font-black uppercase tracking-widest text-slate-400">
               <p className="flex justify-between"><span>Secretaria:</span> <span className="text-white">+244 943 574 878</span></p>
               <p className="flex justify-between"><span>Direção:</span> <span className="text-white">direcao@amofarma.ao</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;