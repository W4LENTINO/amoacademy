import React, { useState } from 'react';
import { FAQAccordion } from '../components/FAQAccordion.tsx';
import { faqData } from '../data/faqData.ts';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.tsx';

const FAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: 'Ver Tudo' },
    { id: 'cursos', label: 'Cursos' },
    { id: 'inscricoes', label: 'Inscrições' },
    { id: 'certificados', label: 'Diplomas' },
    { id: 'pagamentos', label: 'Pagamentos' }
  ];

  const filteredFaqs = activeCategory === 'todos' 
    ? faqData 
    : faqData.filter(f => f.category === activeCategory);

  return (
    <div className="bg-white min-h-screen">
      <SEO title="FAQ | Centro de Suporte" description="Esclareça as suas dúvidas sobre os nossos protocolos académicos e processos de certificação." />

      <section className="bg-[#1a1a3a] py-24 md:py-32 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#e84c5c] blur-[150px] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 animate-reveal">
          <span className="text-[#e84c5c] text-xs font-black uppercase tracking-[0.5em] mb-6 block">Centro de Ajuda</span>
          <h1 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase leading-none">Perguntas <span className="text-[#e84c5c]">Frequentes</span></h1>
          <p className="text-slate-400 text-lg font-medium italic max-w-2xl mx-auto">
            Esclareça as suas dúvidas sobre os nossos protocolos académicos e processos de certificação.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-20 animate-reveal">
        <div className="flex flex-wrap gap-3 mb-16 justify-center">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                activeCategory === cat.id 
                ? 'bg-[#e84c5c] text-white shadow-lg' 
                : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="space-y-2 bg-slate-50/50 p-8 md:p-12 rounded-[3rem] border border-slate-100">
          {filteredFaqs.map((faq, i) => (
            <FAQAccordion key={i} faq={faq} />
          ))}
        </div>

        <div className="mt-24 bg-[#1a1a3a] p-12 md:p-16 rounded-[3rem] text-white text-center shadow-premium relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">Não encontrou a resposta?</h3>
            <p className="text-slate-400 mb-10 text-sm font-medium">A nossa equipa de apoio ao aluno está disponível via WhatsApp e Email.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/contacto" className="bg-[#e84c5c] px-10 py-5 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">Enviar Mensagem</Link>
              <a href="https://wa.me/244943574878" target="_blank" rel="noreferrer" className="bg-white/10 px-10 py-5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all">WhatsApp Direto</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;