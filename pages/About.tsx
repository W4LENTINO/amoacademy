
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="bg-[#fdfdfd] min-h-screen">
      <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="animate-reveal">
            <span className="text-[#d91e18] text-[10px] font-black uppercase tracking-[0.6em] mb-8 block">Nossa Identidade</span>
            <h1 className="text-6xl md:text-8xl font-prestige font-black text-slate-900 leading-[0.9] mb-12 uppercase tracking-tighter">O Berço da <br/> <span className="italic text-slate-400">Excelência</span></h1>
            <p className="text-xl text-slate-600 font-light italic leading-relaxed mb-12">
              Fundada sob os pilares do rigor científico e do prestígio profissional, a Academia AMOFARMA nasceu para ser o farol do conhecimento farmacêutico em Angola.
            </p>
            <div className="space-y-8 text-slate-500 font-medium leading-loose">
              <p>Nossa missão transcende o ensino tradicional; buscamos moldar a elite que irá definir os novos padrões de segurança, eficácia e ética no setor da saúde nacional.</p>
              <p>Em parceria com entidades reguladoras como a ARMED e a Ordem dos Farmacêuticos, garantimos que cada certificado emitido seja um selo de integridade absoluta.</p>
            </div>
          </div>
          <div className="relative">
             <div className="aspect-[3/4] overflow-hidden shadow-premium grayscale hover:grayscale-0 transition-all duration-1000">
                <img src="https://images.unsplash.com/photo-1579154235602-4bc8125d39ba?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Pharmacy History" />
             </div>
             <div className="absolute -bottom-12 -left-12 bg-[#064e3b] text-white p-12 shadow-2xl">
                <p className="text-4xl font-prestige font-black">2015</p>
                <p className="text-[10px] font-black uppercase tracking-widest mt-2">Ano de Fundação</p>
             </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-16">
          {[
            { title: 'Inovação', desc: 'Sempre na vanguarda das novas tecnologias e descobertas farmacológicas.' },
            { title: 'Rigor', desc: 'Processos académicos auditados e em conformidade com normas internacionais.' },
            { title: 'Prestígio', desc: 'Diplomados pela AMOFARMA ocupam posições de destaque no mercado angolano.' }
          ].map((val, idx) => (
            <div key={idx} className="bg-white p-12 border border-slate-100 rounded-sm hover:shadow-xl transition-all">
              <span className="text-red-700 text-3xl font-serif font-black mb-6 block">0{idx + 1}</span>
              <h3 className="text-xl font-prestige font-bold text-slate-900 uppercase mb-4">{val.title}</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed italic">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
