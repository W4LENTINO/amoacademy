import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { FileUpload } from '../../components/admin/FileUpload';
import { blogService } from '../../services/blogService';

const AdminBlogForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    category: '',
    author: '',
    image: '',
    tags: '',
    status: 'draft' as 'published' | 'draft' | 'archived',
    featured: false
  });

  const categories = ['Saúde Pública', 'Legislação', 'Inovação', 'Farmácia Clínica', 'Gestão', 'Ética', 'Investigação'];

  useEffect(() => {
    if (isEditing) {
      loadPost();
    }
  }, [id]);

  const loadPost = async () => {
    setLoading(true);
    try {
      const result = await blogService.buscarPostPorId(id!);
      if (result.success && result.data) {
        const post = result.data as any;
        setFormData({
          title: post.titulo || '',
          summary: post.resumo || '',
          content: post.conteudo || '',
          category: post.categoria || '',
          author: post.autor || '',
          image: post.imagem_url || '',
          tags: post.tags?.join(', ') || '',
          status: post.status || 'draft',
          featured: post.destaque_home || false
        });
      }
    } catch (error) {
      console.error('Erro ao carregar artigo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleImageUpload = (url: string) => {
    setFormData(prev => ({ ...prev, image: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const postData = {
        titulo: formData.title,
        resumo: formData.summary,
        conteudo: formData.content,
        categoria: formData.category,
        autor: formData.author,
        imagem_url: formData.image,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
        status: formData.status,
        destaque_home: formData.featured,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      };

      let result;
      if (isEditing) {
        result = await blogService.atualizarPost(id!, postData);
      } else {
        result = await blogService.criarPost(postData);
      }

      if (result.success) {
        navigate('/acesso-a7f9k2/blog');
      } else {
        alert(result.error?.message || 'Erro ao salvar artigo');
      }
    } catch (error) {
      console.error('Erro ao salvar artigo:', error);
      alert('Erro fatal ao salvar artigo');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-20 text-center animate-pulse">Carregando editor...</div>;

  return (
    <>
      <Helmet><title>{isEditing ? 'Editar Artigo' : 'Novo Artigo'} | Admin AMOFARMA</title></Helmet>
      <div className="min-h-screen bg-slate-50 flex">
        <div className="flex-1">
          <AdminHeader title={isEditing ? 'Editar Artigo' : 'Novo Artigo'} subtitle="Gestão de Conhecimento Académico" />
          <main className="p-8">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white rounded-3xl p-10 shadow-sm border border-slate-100">
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Título do Artigo</label>
                  <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-[#e84c5c] outline-none transition font-bold" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Resumo Técnico</label>
                  <textarea name="summary" value={formData.summary} onChange={handleChange} required rows={3} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-[#e84c5c] outline-none transition resize-none italic" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Categoria</label>
                    <select name="category" value={formData.category} onChange={handleChange} required className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-[#e84c5c] outline-none transition font-bold">
                      <option value="">Selecione...</option>
                      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Autor</label>
                    <input type="text" name="author" value={formData.author} onChange={handleChange} required className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-[#e84c5c] outline-none transition font-bold" />
                  </div>
                </div>
                <FileUpload onUpload={handleImageUpload} currentImage={formData.image} />
                <textarea name="content" value={formData.content} onChange={handleChange} required rows={10} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-[#e84c5c] outline-none transition font-medium" placeholder="Conteúdo completo..." />
                <div className="flex justify-end space-x-4">
                  <button type="button" onClick={() => navigate('/acesso-a7f9k2/blog')} className="px-8 py-3 border border-slate-300 rounded-xl font-bold text-[10px] uppercase tracking-widest">Cancelar</button>
                  <button type="submit" disabled={saving} className="px-10 py-3 bg-[#1a1a3a] text-white rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-xl hover:bg-[#e84c5c] transition-all">
                    {saving ? 'Gravando...' : 'Salvar Alterações'}
                  </button>
                </div>
              </div>
            </form>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminBlogForm;