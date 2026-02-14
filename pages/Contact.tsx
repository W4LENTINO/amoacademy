import React from 'react';
import { ContactForm } from '../components/ContactForm.tsx';
import SEO from '../components/SEO.tsx';
import { FiMail, FiPhone, FiMapPin, FiClock } from 'react-icons/fi';

const Contact: React.FC = () => {
  const contactInfo = [
    { icon: <FiMail />, title: 'Secretaria Digital', detail: 'cursos@amofarma.ao', sub: 'Resposta em até 24h úteis' },
    { icon: <FiPhone />, title: 'Linha Directa', detail: '+244 943 574 878', sub: 'Atendimento: 08:00 - 17:00' },
    { icon: <FiMapPin />, title: 'Sede Institucional', detail: 'Av. Pedro Castro Van-Dunem Loy', sub: 'Luanda, Angola' },
    { icon: <FiClock />, title: 'Rigor Académico', detail: 'Conselho Técnico', sub: 'Auditoria de Processos' },
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO title="Contactos Oficiais" description="Entre em contacto com a Direção Académica da Academia AMOFARMA em Luanda." />
      
      {/* Hero Section */}
      <section className="bg-[#1a1a3a] text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#e84c5c] rounded-full blur-[150px] opacity-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10 animate-reveal">
          <span className="text-[#e84c5c] text-[10px] font-black uppercase tracking-[0.6em] mb-6 block">Canais Institucionais</span>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-none">Apoio ao <span className="text-[#e84c5c]">Profissional</span></h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto italic opacity-80 leading-relaxed">
            Nossa equipa de especialistas está preparada para oferecer suporte técnico e académico personalizado à elite farmacêutica.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 -mt-16 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form Container */}
          <div className="lg:col-span-7 bg-white rounded-[3.5rem] shadow-premium p-10 md:p-16 border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#e84c5c]"></div>
            <h2 className="text-3xl font-black text-[#1a1a3a] mb-12 uppercase tracking-tighter">Consulta <span className="italic text-slate-300">Técnica</span></h2>
            <ContactForm />
          </div>

          {/* Info Side */}
          <div className="lg:col-span-5 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              {contactInfo.map((info, i) => (
                <div key={i} className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 group hover:bg-[#1a1a3a] transition-all duration-500">
                  <div className="text-2xl text-[#e84c5c] mb-6 group-hover:scale-110 transition-transform">{info.icon}</div>
                  <h3 className="font-black text-[#1a1a3a] uppercase tracking-widest text-[10px] mb-2 group-hover:text-white/50 transition-colors">{info.title}</h3>
                  <p className="text-xl font-bold text-[#1a1a3a] tracking-tight group-hover:text-white transition-colors">{info.detail}</p>
                  <p className="text-xs text-slate-400 mt-2 font-medium italic group-hover:text-white/30 transition-colors">{info.sub}</p>
                </div>
              ))}
            </div>

            {/* Compliance Message */}
            <div className="bg-[#064e3b] p-10 rounded-[2.5rem] text-white/90 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
              <h4 className="font-black text-[9px] uppercase tracking-[0.4em] mb-4 text-[#e84c5c]">Aviso de Conformidade</h4>
              <p className="text-xs leading-relaxed font-light italic">
                "Todas as comunicações enviadas através deste canal são encriptadas e auditadas pelo Conselho de Ética da Academia AMOFARMA, em conformidade com as normas da ARMED."
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;