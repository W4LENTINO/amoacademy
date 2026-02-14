import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Course, BlogPost } from '../types';

interface HomeProps {
  latestCourses: Course[];
  latestPosts: BlogPost[];
}

const Home: React.FC<HomeProps> = ({ latestCourses, latestPosts }) => {
  return (
    <div className="bg-white">
      <Helmet>
        <title>ACADEMIA AMOFARMA | Excelência Farmacêutica em Angola</title>
        <meta name="description" content="Líder em formação farmacêutica de elite. Programas acreditados pela ARMED para profissionais de saúde angolanos." />
      </Helmet>

      {/* Hero Section Prestige */}
      <section className="relative bg-[#1a1a3a] text-white min-h-[95vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[700px] h-[700px] bg-[#e84c5c] rounded-full blur-[220px] opacity-10 animate-pulse"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#10b981] rounded-full blur-[200px] opacity-10"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center mix-blend-overlay opacity-25"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full animate-reveal">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-5 mb-10">
              <span className="h-[2px] w-16 bg-[#e84c5c]"></span>
              <span className="text-[#e84c5c] text-[10px] font-black uppercase tracking-[0.6em]">Angola • Instituição de Referência</span>
            </div>
            <h1 className="text-6xl md:text-[10rem] font-black leading-[0.85] tracking-tighter mb-12 text-prestige">
              Rigor, Ciência & <br/><span className="text-[#e84c5c]">Prestígio</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-16 max-w-2xl font-light italic leading-relaxed opacity-90">
              "Fazendo a Diferença a Cada Dose". A Academia AMOFARMA redefine o padrão do ensino farmacêutico nacional através da excelência técnica e inovação académica constante.
            </p>
            <div className="flex flex-col sm:flex-row gap-8">
              <Link 
                to="/cursos" 
                className="bg-[#e84c5c] hover:bg-white hover:text-[#1a1a3a] text-white px-14 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all shadow-2xl shadow-[#e84c5c]/30 transform active:scale-95 text-center"
              >
                Oferta Formativa
              </Link>
              <Link 
                to="/validar" 
                className="bg-white/5 border border-white/20 hover:bg-white/10 text-white px-14 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all backdrop-blur-md text-center"
              >
                Validar Diploma
              </Link>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-3 opacity-40">
          <span className="text-[8px] font-black uppercase tracking-[0.6em]">Explorar Ecosistema</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/80 to-transparent"></div>
        </div>
      </section>

      {/* Acreditação Institucional */}
      <section className="py-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] text-center md:text-left">Programas Reconhecidos por:</p>
            <div className="flex flex-wrap justify-center items-center gap-16 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
              <span className="font-black text-2xl tracking-tighter text-[#1a1a3a] border-b-2 border-[#1a1a3a]">ARMED ANGOLA</span>
              <span className="font-black text-2xl tracking-tighter text-[#1a1a3a]">ORDEM DOS FARMACÊUTICOS</span>
              <span className="font-black text-2xl tracking-tighter text-[#1a1a3a]">MINISTÉRIO DA SAÚDE</span>
            </div>
          </div>
        </div>
      </section>

      {/* Especializações */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-10">
          <div>
            <span className="text-[#e84c5c] text-[10px] font-black uppercase tracking-[0.6em] mb-6 block">Arquivo Curricular</span>
            <h2 className="text-5xl md:text-7xl font-black text-[#1a1a3a] tracking-tighter uppercase leading-[0.9]">Especializações <br/><span className="text-[#e84c5c]">Estratégicas</span></h2>
          </div>
          <Link to="/cursos" className="text-[10px] font-black text-[#e84c5c] uppercase tracking-[0.3em] border-b-2 border-[#e84c5c]/20 pb-2 hover:border-[#e84c5c] transition-all">Ver Catálogo Completo &rarr;</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {latestCourses.map(course => (
            <div key={course.id} className="bg-white rounded-[3rem] overflow-hidden hover:shadow-premium transition-all group border border-slate-100 flex flex-col relative">
              <div className="h-72 overflow-hidden relative">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.3] group-hover:grayscale-0" />
                <div className="absolute top-8 right-8 bg-[#1a1a3a]/90 backdrop-blur-md text-white px-6 py-2.5 rounded-2xl text-[9px] font-black tracking-widest uppercase border border-white/10">
                  {course.category}
                </div>
              </div>
              <div className="p-12 flex-1 flex flex-col">
                <h3 className="text-2xl font-black text-[#1a1a3a] mb-6 group-hover:text-[#e84c5c] transition-colors leading-tight uppercase tracking-tight">
                  {course.title}
                </h3>
                <p className="text-slate-500 text-sm mb-12 line-clamp-3 italic font-medium leading-relaxed">
                  {course.shortDescription}
                </p>
                <div className="mt-auto pt-10 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest flex items-center">
                    <span className="w-2 h-2 bg-[#e84c5c] rounded-full mr-3"></span>
                    {course.hours}H Rigor Académico
                  </span>
                  <Link 
                    to={`/cursos/${course.id}`} 
                    className="inline-flex items-center text-[#1a1a3a] hover:text-[#e84c5c] font-black text-[10px] uppercase tracking-widest transition-colors"
                  >
                    Ver Programa
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-[#1a1a3a] py-32 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
           <div className="grid grid-cols-6 gap-6 transform rotate-12 scale-150">
              {[...Array(30)].map((_, i) => <div key={i} className="aspect-square border border-white/20 rounded-[2.5rem]"></div>)}
           </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div>
               <span className="text-[#e84c5c] text-[10px] font-black uppercase tracking-[0.8em] mb-10 block">Missão Central</span>
               <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-14">Compromisso <br/><span className="text-[#e84c5c]">Nacional</span></h2>
               <div className="space-y-12">
                  <div className="flex items-start space-x-8 group">
                    <div className="w-14 h-14 bg-[#e84c5c] rounded-2xl flex items-center justify-center font-black text-2xl shrink-0 shadow-2xl transition-transform group-hover:scale-110">01</div>
                    <div>
                      <h4 className="text-xl font-bold uppercase tracking-tight mb-3">Padrão Regulador ARMED</h4>
                      <p className="text-slate-400 text-sm leading-relaxed font-light italic opacity-80">Processos auditados para garantir conformidade total com as normas sanitárias de Angola.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-8 group">
                    <div className="w-14 h-14 bg-[#10b981] rounded-2xl flex items-center justify-center font-black text-2xl shrink-0 shadow-2xl transition-transform group-hover:scale-110">02</div>
                    <div>
                      <h4 className="text-xl font-bold uppercase tracking-tight mb-3">Diplomacia Digital AES-256</h4>
                      <p className="text-slate-400 text-sm leading-relaxed font-light italic opacity-80">Assinatura criptográfica única e validação via QR Code, assegurando veracidade eterna.</p>
                    </div>
                  </div>
               </div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl p-12 md:p-20 rounded-[5rem] border border-white/10 shadow-3xl">
               <p className="text-3xl font-black tracking-tighter uppercase leading-none mb-14 text-[#e84c5c]">Impacto Académico</p>
               <div className="grid grid-cols-2 gap-16 text-center">
                  <div><p className="text-5xl font-black mb-3">1.2k+</p><p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Especialistas</p></div>
                  <div><p className="text-5xl font-black mb-3">98%</p><p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Aprovação</p></div>
                  <div><p className="text-5xl font-black mb-3">24</p><p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Programas</p></div>
                  <div><p className="text-5xl font-black mb-3">100%</p><p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Verificação</p></div>
               </div>
               <Link to="/register" className="block mt-20 text-center bg-white text-[#1a1a3a] py-7 rounded-2xl font-black text-xs uppercase tracking-[0.5em] hover:bg-[#e84c5c] hover:text-white transition-all">Solicitar Admissão Académica</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-slate-50 py-40 border-t border-slate-100">
         <div className="max-w-4xl mx-auto px-6 text-center animate-reveal">
            <h2 className="text-5xl md:text-8xl font-black text-[#1a1a3a] tracking-tighter uppercase leading-[0.9] mb-12">Lidere a <br/><span className="text-[#e84c5c]">Inovação da Saúde</span></h2>
            <p className="text-slate-500 text-xl mb-20 leading-relaxed font-light italic opacity-80">Junte-se à elite farmacêutica de Angola.</p>
            <div className="flex justify-center">
               <Link to="/register" className="bg-[#1a1a3a] text-white px-20 py-7 rounded-2xl font-black text-xs uppercase tracking-[0.5em] hover:bg-[#e84c5c] transition-all shadow-3xl transform active:scale-95">Criar Perfil Académico</Link>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Home;