import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.tsx';

const Terms: React.FC = () => {
  return (
    <div className="bg-[#fdfdfd] min-h-screen py-24">
      <SEO title="Termos de Uso" description="Condições gerais de utilização da plataforma académica AMOFARMA." />

      <div className="max-w-4xl mx-auto px-6 animate-reveal">
        <header className="text-center mb-20">
          <div className="w-16 h-16 bg-[#1a1a3a] text-white flex items-center justify-center mx-auto mb-8 rounded-2xl shadow-xl font-black">AMF</div>
          <h1 className="text-4xl md:text-5xl font-black text-[#1a1a3a] uppercase tracking-tighter mb-4 leading-none">Termos de <span className="text-[#e84c5c]">Uso</span></h1>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.5em]">Última Revisão: Fevereiro 2025</p>
        </header>

        <div className="prose prose-slate max-w-none space-y-16">
          <section>
            <h2 className="text-2xl font-black text-[#1a1a3a] uppercase tracking-tight mb-6 flex items-center">
              <span className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-xs mr-4">01</span>
              Aceitação Institucional
            </h2>
            <p className="text-slate-600 leading-relaxed font-light italic">
              Ao aceder ao portal da Academia AMOFARMA, o utilizador concorda irrevogavelmente com os protocolos de segurança, ética e conduta académica aqui estabelecidos. O acesso à área do aluno é estritamente pessoal e intransmissível.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#1a1a3a] uppercase tracking-tight mb-6 flex items-center">
              <span className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-xs mr-4">02</span>
              Inscrições e Candidaturas
            </h2>
            <p className="text-slate-600 leading-relaxed font-light">
              A submissão de uma candidatura não garante admissão imediata. O Conselho Académico reserva-se o direito de validar as credenciais profissionais e o Bilhete de Identidade (BI) fornecidos. Dados falsos resultarão em bloqueio permanente e comunicação às autoridades competentes (ARMED).
            </p>
          </section>

          <section className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100">
            <h2 className="text-2xl font-black text-[#1a1a3a] uppercase tracking-tight mb-6 flex items-center">
              <span className="w-8 h-8 bg-white shadow-sm rounded-lg flex items-center justify-center text-xs mr-4 text-[#e84c5c]">03</span>
              Protocolo Financeiro
            </h2>
            <ul className="space-y-4 text-sm text-slate-500 font-medium">
              <li className="flex items-start">
                <span className="text-[#e84c5c] mr-3 mt-1">•</span>
                <span>Todos os pagamentos devem ser efetuados em Kwanzas (AOA) via canais oficiais.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#e84c5c] mr-3 mt-1">•</span>
                <span>A AMOFARMA não solicita senhas de cartões ou dados bancários sensíveis via telefone.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#e84c5c] mr-3 mt-1">•</span>
                <span>Reembolsos só são processados até 48 horas antes do início da componente letiva.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#1a1a3a] uppercase tracking-tight mb-6 flex items-center">
              <span className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-xs mr-4">04</span>
              Propriedade Intelectual
            </h2>
            <p className="text-slate-600 leading-relaxed font-light">
              Todo o conteúdo técnico, materiais didáticos, vídeos e algoritmos de verificação são propriedade exclusiva da Academia AMOFARMA. A reprodução não autorizada para fins comerciais é passível de ação judicial sob a lei angolana.
            </p>
          </section>
        </div>

        <div className="mt-20 pt-10 border-t border-slate-100 text-center">
          <Link to="/" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] hover:text-[#e84c5c] transition-colors">
            &larr; Voltar para a Página Principal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Terms;