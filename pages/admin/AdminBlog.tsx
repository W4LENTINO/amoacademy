import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AdminHeader } from '../../components/admin/AdminHeader.tsx';
import { DataTable } from '../../components/admin/DataTable.tsx';
import { StatusBadge } from '../../components/admin/StatusBadge.tsx';
import { ActionButtons } from '../../components/admin/ActionButtons.tsx';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog.tsx';
import { useAdminData } from '../../hooks/useAdminData.ts';
import SEO from '../../components/SEO.tsx';

const AdminBlog: React.FC = () => {
  const { blogPosts, loading, deleteBlogPost } = useAdminData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const navigate = useNavigate();

  const filteredPosts = blogPosts?.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = async (id: string) => {
    await deleteBlogPost(id);
    setDeleteConfirm(null);
  };

  const columns = [
    { 
      header: 'Título', 
      accessor: (row: any) => (
        <div>
          <p className="font-medium text-[#1a1a3a]">{row.title}</p>
          <p className="text-xs text-slate-400">{row.category}</p>
        </div>
      ),
      sortable: true 
    },
    { header: 'Autor', accessor: 'author', sortable: true },
    { 
      header: 'Publicação', 
      accessor: (row: any) => row.publishDate ? new Date(row.publishDate).toLocaleDateString('pt-PT') : 'N/A',
      sortable: true 
    },
    { 
      header: 'Vistas', 
      accessor: 'views',
      sortable: true 
    },
    { 
      header: 'Status', 
      accessor: 'status',
      cell: (value: string) => <StatusBadge status={value || 'draft'} />
    },
    {
      header: 'Ações',
      accessor: 'id',
      cell: (value: string, row: any) => (
        <div className="flex items-center space-x-2">
          <ActionButtons
            onView={() => window.open(`/blog/${row.slug}`, '_blank')}
            onEdit={() => navigate(`/acesso-a7f9k2/blog/${value}`)}
            onDelete={() => setDeleteConfirm(value)}
          />
        </div>
      )
    }
  ];

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#1a1a3a] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <SEO title="Gestão do Blog" />
      <div className="space-y-12 animate-reveal">
        <AdminHeader 
          title="Gestão do Blog" 
          subtitle="Gerir artigos e insights técnicos"
        >
          <Link
            to="/acesso-a7f9k2/blog/novo"
            className="bg-[#10b981] hover:bg-[#1a1a3a] text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center shadow-lg uppercase text-[10px] tracking-widest"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Novo Artigo
          </Link>
        </AdminHeader>

        <main>
          <div className="bg-white rounded-2xl p-6 mb-6 border border-slate-100 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Pesquisar por título, autor ou categoria..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-[#e84c5c] focus:ring-2 focus:ring-[#e84c5c]/20 outline-none transition"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-slate-200 rounded-lg focus:border-[#e84c5c] focus:ring-2 focus:ring-[#e84c5c]/20 outline-none transition"
              >
                <option value="all">Todos os status</option>
                <option value="published">Publicados</option>
                <option value="draft">Rascunhos</option>
                <option value="archived">Arquivados</option>
              </select>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={filteredPosts || []}
            emptyMessage="Nenhum artigo encontrado"
          />
        </main>
      </div>

      <ConfirmDialog
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => handleDelete(deleteConfirm!)}
        title="Eliminar Artigo"
        message="Tem certeza que deseja eliminar este artigo? Esta ação é irreversível."
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
      />
    </>
  );
};

export default AdminBlog;