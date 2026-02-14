import React from 'react';
import { Link } from 'react-router-dom';

const Privacy: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 animate-reveal">
          <div className="w-20 h-20 bg-[#e84c5c] rounded-lg flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6">
            AMF
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#1a1a3a] mb-4 uppercase tracking-tighter">
            Política de Privacidade
          </h1>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">
            Última atualização: 14 de Fevereiro de 2025
          </p>
        </div>

        <div className="prose prose-slate max-w-none">
          <div className="bg-slate-50 p-10 rounded-3xl mb-12 border border-slate-100">
            <p className="text-slate-600 leading-relaxed italic">
              A AMOFARMA (Academia de Farmácia de Angola) está comprometida com a proteção da sua privacidade e integridade digital. 
              Esta política detalha os protocolos de recolha, processamento e salvaguarda dos seus dados pessoais.
            </p>
          </div>

          <section className="mb-16">
            <h2 className="text-2xl font-black text-[#1a1a3a] mb-6 uppercase tracking-tight pb-4 border-b border-slate-100">
              1. Natureza dos Dados Recolhidos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600">
              <div className="p-6 bg-white border border-slate-100 rounded-2xl">
                <h3 className="font-bold text-[#1a1a3a] mb-3 uppercase tracking-widest text-xs">Identificação</h3>
                <ul className="space-y-2 list-disc pl-4">
                  <li>Nome completo institucional</li>
                  <li>Número de Bilhete de Identidade (BI)</li>
                  <li>Cédula Profissional (quando aplicável)</li>
                </ul>
              </div>
              <div className="p-6 bg-white border border-slate-100 rounded-2xl">
                <h3 className="font-bold text-[#1a1a3a] mb-3 uppercase tracking-widest text-xs">Académicos</h3>
                <ul className="space-y-2 list-disc pl-4">
                  <li>Histórico de frequência</li>
                  <li>Logs de avaliação e notas</li>
                  <li>Registos de certificação digital</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-black text-[#1a1a3a] mb-6 uppercase tracking-tight">2. Finalidade e Base Legal</h2>
            <p className="text-slate-600 mb-6">O tratamento de dados pela Academia AmoFarma fundamenta-se nos seguintes pilares:</p>
            <div className="space-y-4">
              {[
                { t: 'Execução de Contrato', d: 'Necessário para a prestação de serviços educativos e emissão de diplomas.' },
                { t: 'Interesse Legítimo', d: 'Melhoria contínua da experiência de aprendizagem e segurança da plataforma.' },
                { t: 'Obrigação Legal', d: 'Conformidade com as diretrizes do Ministério da Saúde e ARMED.' }
              ].map((item, i) => (
                <div key={i} className="flex space-x-4">
                  <span className="text-[#e84c5c] font-black">0{i+1}.</span>
                  <div>
                    <h4 className="font-bold text-[#1a1a3a] uppercase text-xs tracking-widest">{item.t}</h4>
                    <p className="text-sm text-slate-500">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16 bg-[#1a1a3a] text-white p-12 rounded-[3rem] shadow-premium">
            <h2 className="text-2xl font-black mb-6 uppercase tracking-tight">Segurança Criptográfica</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 italic">
              "Todos os dados sensíveis são encriptados utilizando o padrão AES-256 e protegidos por firewalls de perímetro activas 24/7."
            </p>
            <div className="flex items-center space-x-4">
               <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
               <span className="text-[10px] font-black uppercase tracking-widest">Proteção de Nível Bancário Activa</span>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-black text-[#1a1a3a] mb-6 uppercase tracking-tight">Direitos do Titular</h2>
            <p className="text-slate-600 mb-8">Em conformidade com a legislação de proteção de dados de Angola, o titular possui direito a:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Acesso', 'Retificação', 'Eliminação', 'Oposição'].map(d => (
                <div key={d} className="p-4 bg-slate-50 rounded-xl text-center font-bold text-[#1a1a3a] text-xs uppercase tracking-widest">
                  {d}
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-20 pt-10 border-t border-slate-100 text-center">
          <Link to="/" className="text-[#e84c5c] font-black text-xs uppercase tracking-[0.4em] hover:text-[#1a1a3a] transition-colors">
            &larr; Retornar ao Portal Institucional
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Privacy;