
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BlogPost } from '../types';

interface BlogPostDetailsProps {
  posts: BlogPost[];
}

const BlogPostDetails: React.FC<BlogPostDetailsProps> = ({ posts }) => {
  const { id } = useParams<{ id: string }>();
  const post = posts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="py-40 text-center">
        <h2 className="text-3xl font-prestige font-black text-slate-300 uppercase">Artigo não localizado</h2>
        <Link to="/blog" className="mt-8 inline-block text-[10px] font-black uppercase tracking-[0.3em] text-[#064e3b] border-b border-[#064e3b]">Retornar ao Blog</Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fdfdfd] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-32">
        <Link to="/blog" className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-[#064e3b] transition-colors mb-16 inline-block">&larr; Voltar aos Insights</Link>
        
        <header className="mb-20">
          <span className="text-[#d91e18] text-[10px] font-black uppercase tracking-[0.6em] mb-6 block">{post.category}</span>
          <h1 className="text-5xl md:text-7xl font-prestige font-black text-slate-900 leading-tight mb-10 uppercase tracking-tighter">{post.title}</h1>
          <div className="flex items-center space-x-6 text-slate-400 font-bold text-[10px] uppercase tracking-widest border-t border-slate-100 pt-8">
            <span>Publicado em: {post.date}</span>
            <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
            <span>Academia AMOFARMA</span>
          </div>
        </header>

        <div className="h-[500px] overflow-hidden rounded-sm shadow-premium mb-24">
          <img src={post.image} className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000" alt={post.title} />
        </div>

        <article className="prose prose-slate max-w-none">
          <div className="text-xl md:text-2xl text-slate-700 leading-relaxed font-light italic mb-16 border-l-4 border-red-700 pl-10">
            {post.summary}
          </div>
          <div className="text-lg text-slate-600 leading-[2.2] space-y-12 font-light">
            {post.content ? (
              post.content.split('\n').map((para, i) => <p key={i}>{para}</p>)
            ) : (
              <p>O conteúdo técnico detalhado deste artigo está reservado para consulta interna na nossa base de conhecimento acadêmica.</p>
            )}
          </div>
        </article>

        <footer className="mt-32 pt-16 border-t border-slate-100">
          <div className="bg-slate-50 p-12 rounded-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h4 className="text-lg font-prestige font-bold text-slate-900 uppercase mb-2">Gostou deste Insight?</h4>
              <p className="text-xs text-slate-400 font-medium italic">Inscreva-se na nossa Newsletter técnica para atualizações exclusivas.</p>
            </div>
            <button className="bg-[#064e3b] text-white px-12 py-5 font-black text-[10px] uppercase tracking-[0.3em] hover:bg-black transition-all">Subscrever Agora</button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BlogPostDetails;
