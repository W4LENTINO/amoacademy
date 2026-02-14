import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.tsx';

const Disclaimer: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-16 lg:py-24">
      <SEO title="Aviso Legal" description="Informações institucionais e termos de responsabilidade da AMOFARMA." />
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-[#e84c5c] rounded-lg flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6">
            AMF
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a3a] mb-4">
            Aviso Legal
          </h1>
          <p className="text-slate-500 text-lg">
            Última atualização: 14 de Fevereiro de 2025
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12 text-left">
            <h2 className="text-2xl font-bold text-[#1a1a3a] mb-4 pb-2 border-b-2 border-[#e84c5c] inline-block">
              1. Informação Geral
            </h2>
            <p className="text-slate-600 leading-relaxed">
              A AMOFARMA - Academia de Farmácia de Angola é uma instituição de formação profissional 
              dedicada à capacitação de farmacêuticos e profissionais da área da saúde em Angola.
            </p>
            <p className="text-slate-600 mt-4">
              <strong>Denominação Social:</strong> AMOFARMA, Lda.<br />
              <strong>Sede:</strong> Av. Pedro Castro Van-Dunem Loy, Luanda, Angola
            </p>
          </section>

          <section className="mb-12 text-left">
            <h2 className="text-2xl font-bold text-[#1a1a3a] mb-4 pb-2 border-b-2 border-[#e84c5c] inline-block">
              2. Propriedade Intelectual
            </h2>
            <p className="text-slate-600 mb-4">
              Todo o conteúdo disponível na plataforma AMOFARMA é propriedade exclusiva da instituição, sendo proibida a reprodução sem autorização.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-200 text-center space-x-6">
          <Link to="/privacidade" className="text-slate-500 hover:text-[#e84c5c] transition-colors">Privacidade</Link>
          <span className="text-slate-300">|</span>
          <Link to="/termos" className="text-slate-500 hover:text-[#e84c5c] transition-colors">Termos</Link>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;