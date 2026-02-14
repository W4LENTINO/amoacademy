import React, { useState } from 'react';
import { useMutation } from '../hooks/useApi.ts';
import { emailService } from '../services/emailService.ts';
import { sanitizer } from '../lib/sanitizer.ts';
import SimpleCaptcha from './Captcha.tsx';
import Toast from './Toast.tsx';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactFormData {
  nome: string;
  email: string;
  telefone: string;
  assunto: string;
  mensagem: string;
}

interface FormErrors {
  [key: string]: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' as 'success' | 'error' });

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.nome.trim()) newErrors.nome = 'Identificação obrigatória';
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail institucional obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Formato de e-mail inválido';
    }
    if (!formData.assunto) newErrors.assunto = 'Selecione o tópico da consulta';
    if (formData.mensagem.length < 10) newErrors.mensagem = 'A mensagem deve conter detalhes técnicos (mín. 10 caracteres)';
    if (!captchaVerified) newErrors.captcha = 'Verificação de segurança necessária';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendMutation = useMutation(
    async (data: ContactFormData) => {
      return await emailService.enviarEmail({
        to: 'cursos@amofarma.ao',
        subject: `[CONTACTO] ${data.assunto} - ${data.nome}`,
        template: 'contacto_site',
        data: { ...data, timestamp: new Date().toISOString() }
      });
    },
    {
      onSuccess: () => {
        setToast({ show: true, message: 'Protocolo de contacto registado com sucesso.', type: 'success' });
        setFormData({ nome: '', email: '', telefone: '', assunto: '', mensagem: '' });
        setCaptchaVerified(false);
        setErrors({});
      },
      onError: (err) => {
        setToast({ show: true, message: err || 'Falha na comunicação com o servidor central.', type: 'error' });
      }
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      sendMutation.mutate(formData);
    } else {
      setToast({ show: true, message: 'Existem campos que requerem a sua atenção.', type: 'error' });
    }
  };

  const inputClass = (name: string) => `w-full bg-slate-50 border ${errors[name] ? 'border-[#e84c5c]' : 'border-slate-100'} px-6 py-4 rounded-2xl focus:border-[#1a1a3a] outline-none transition-all font-bold text-[#1a1a3a] placeholder:text-slate-300`;

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Nome Completo</label>
            <input name="nome" value={formData.nome} onChange={handleChange} className={inputClass('nome')} placeholder="Ex: Dr. Manuel Fernandes" />
            {errors.nome && <p className="text-[9px] text-[#e84c5c] font-bold uppercase ml-2 italic">{errors.nome}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">E-mail Corporativo</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} className={inputClass('email')} placeholder="seu@email.com" />
            {errors.email && <p className="text-[9px] text-[#e84c5c] font-bold uppercase ml-2 italic">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Telefone / WhatsApp</label>
            <input name="telefone" value={formData.telefone} onChange={handleChange} className={inputClass('telefone')} placeholder="+244 9..." />
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Tópico de Consulta</label>
            <select name="assunto" value={formData.assunto} onChange={handleChange} className={inputClass('assunto')}>
              <option value="">Selecione...</option>
              <option value="Admissão em Cursos">Admissão em Cursos</option>
              <option value="Validação de Diplomas">Validação de Diplomas</option>
              <option value="Parcerias Hospitalares">Parcerias Hospitalares</option>
              <option value="Suporte Técnico">Suporte ao Aluno</option>
            </select>
            {errors.assunto && <p className="text-[9px] text-[#e84c5c] font-bold uppercase ml-2 italic">{errors.assunto}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Mensagem Técnica</label>
          <textarea name="mensagem" value={formData.mensagem} onChange={handleChange} rows={4} className={`${inputClass('mensagem')} resize-none`} placeholder="Descreva a sua necessidade..." />
          {errors.mensagem && <p className="text-[9px] text-[#e84c5c] font-bold uppercase ml-2 italic">{errors.mensagem}</p>}
        </div>

        <div className="py-4">
          <SimpleCaptcha onVerify={() => setCaptchaVerified(true)} onExpire={() => setCaptchaVerified(false)} />
          {errors.captcha && <p className="text-[9px] text-[#e84c5c] font-bold uppercase mt-2 italic">{errors.captcha}</p>}
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={sendMutation.isLoading}
          className="w-full bg-[#1a1a3a] hover:bg-[#e84c5c] text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.4em] transition-all shadow-2xl disabled:opacity-50"
        >
          {sendMutation.isLoading ? 'PROCESSANDO PROTOCOLO...' : 'ENCAMINHAR SOLICITAÇÃO'}
        </motion.button>
      </form>

      <Toast 
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(prev => ({ ...prev, show: false }))}
      />
    </div>
  );
};

export default ContactForm;