import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '../hooks/useApi';
import { emailService } from '../services/emailService';
import { sanitizer } from '../lib/sanitizer';
import Captcha from './Captcha';

interface ContactFormData {
  nome: string;
  email: string;
  telefone: string;
  assunto: string;
  mensagem: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: ''
  });

  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [success, setSuccess] = useState(false);

  const sendMutation = useMutation(
    async (data: ContactFormData) => {
      return await emailService.enviarEmail({
        to: 'cursos@amofarma.ao',
        subject: `Contacto: ${data.assunto}`,
        template: 'contacto',
        data: {
          ...data,
          data_envio: new Date().toLocaleString('pt-PT')
        }
      });
    },
    {
      onSuccess: () => {
        setSuccess(true);
        setFormData({
          nome: '',
          email: '',
          telefone: '',
          assunto: '',
          mensagem: ''
        });
        setTimeout(() => setSuccess(false), 5000);
      }
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: sanitizer.sanitizeString(value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaVerified) {
      alert('Por favor, complete a verificação de segurança.');
      return;
    }
    sendMutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-6 py-4 rounded-lg">
          Mensagem enviada com sucesso! Responderemos em breve.
        </div>
      )}

      {sendMutation.error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg">
          {sendMutation.error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Nome Completo *
          </label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-[#e84c5c] focus:ring-2 focus:ring-[#e84c5c]/20 outline-none transition"
            placeholder="Seu nome completo"
            disabled={sendMutation.isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-[#e84c5c] focus:ring-2 focus:ring-[#e84c5c]/20 outline-none transition"
            placeholder="seu@email.com"
            disabled={sendMutation.isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Telefone (WhatsApp)
          </label>
          <input
            type="tel"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-[#e84c5c] focus:ring-2 focus:ring-[#e84c5c]/20 outline-none transition"
            placeholder="+244 923 000 000"
            disabled={sendMutation.isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Assunto *
          </label>
          <select
            name="assunto"
            value={formData.assunto}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-[#e84c5c] focus:ring-2 focus:ring-[#e84c5c]/20 outline-none transition"
            disabled={sendMutation.isLoading}
          >
            <option value="">Selecione...</option>
            <option value="Dúvida sobre cursos">Dúvida sobre cursos</option>
            <option value="Inscrição">Inscrição</option>
            <option value="Certificados">Certificados</option>
            <option value="Pagamentos">Pagamentos</option>
            <option value="Suporte Técnico">Suporte Técnico</option>
            <option value="Outro">Outro</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Mensagem *
        </label>
        <textarea
          name="mensagem"
          value={formData.mensagem}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-[#e84c5c] focus:ring-2 focus:ring-[#e84c5c]/20 outline-none transition resize-none"
          placeholder="Escreva a sua mensagem..."
          disabled={sendMutation.isLoading}
        />
      </div>

      <div className="py-4">
        <Captcha
          onVerify={() => setCaptchaVerified(true)}
          onExpire={() => setCaptchaVerified(false)}
        />
      </div>

      <button
        type="submit"
        disabled={sendMutation.isLoading || !captchaVerified}
        className="w-full bg-[#1a1a3a] hover:bg-[#e84c5c] text-white font-semibold py-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {sendMutation.isLoading ? 'A enviar...' : 'Enviar Mensagem'}
      </button>

      <p className="text-xs text-slate-400 text-center">
        * Campos obrigatórios. Ao enviar, concorda com a nossa{' '}
        <Link to="/privacidade" className="text-[#e84c5c] hover:text-[#1a1a3a]">
          Política de Privacidade
        </Link>.
      </p>
    </form>
  );
};