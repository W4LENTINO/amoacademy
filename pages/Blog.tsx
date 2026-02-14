import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { BlogPost } from '../types';

interface BlogProps {
  posts: BlogPost[];
}

const Blog: React.FC<BlogProps> = ({ posts }) => {
  return (
    <div className="bg-[#fdfdfd] min-h-screen pb-40">
      <Helmet>
        <title>Insights Técnicos & Blog | Academia AMOFARMA</title>
        <meta name="description" content="Artigos técnicos, novidades da ARMED e avanços científicos na área farmacêutica em Angola. Conhecimento contínuo para profissionais de saúde." />
        <meta name="keywords" content="blog farmacêutico angola, notícias saúde luanda, literatura científica farmácia, amofarma insights" />
      </Helmet>

      <div className="bg-[#064e3b] text-white py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-[#e84c5c]"></div>
        <div className="max-w-4xl mx-auto animate-reveal relative z-10">
          <span className="text-white/40 text-[9px] font-black uppercase tracking-[0.8em] mb-8 block">Arquivo de Conhecimento</span>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-none">Blog & <span className="text-[#e84c5c]">Insights</span></h1>
          <p className="text-slate-300 text-lg font-light italic max-w-2xl mx-auto opacity-80 leading-relaxed">
            Análises críticas e actualizações literárias do setor farmacêutico nacional e internacional.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24">
          {posts.map(post => (
            <article key={post.id} className="group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden mb-10 rounded-sm shadow-sm hover:shadow-premium transition-all duration-1000 relative">
                <img src={post.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt={post.title} />
                <div className="absolute bottom-0 left-0 bg-[#064e3b] text-white px-6 py-2 text-[8px] font-black uppercase tracking-widest">
                  {post.category}
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 group-hover:text-[#064e3b] transition-colors uppercase leading-tight tracking-tight min-h-[64px] line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-slate-500 text-sm font-light leading-relaxed line-clamp-3 italic opacity-70">
                  "{post.summary}"
                </p>
                <div className="pt-8 flex items-center justify-between border-t border-slate-100">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{post.date}</span>
                  <Link to={`/blog/${post.id}`} className="text-[10px] font-black text-[#e84c5c] uppercase tracking-[0.3em] border-b-2 border-transparent hover:border-[#e84c5c] pb-1 transition-all">
                    Ler Artigo →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {posts.length === 0 && (
          <div className="text-center py-40 border-2 border-dashed border-slate-100 rounded-[3rem]">
             <span className="text-5xl mb-6 block grayscale opacity-10">📖</span>
             <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">Conselho Editorial Sincronizando Publicações...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;