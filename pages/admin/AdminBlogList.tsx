import React from 'react';
import { BlogPost } from '../../types';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { DataTable } from '../../components/admin/DataTable';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { ActionButtons } from '../../components/admin/ActionButtons';
import { Link } from 'react-router-dom';

interface AdminBlogListProps {
  posts: BlogPost[];
}

const AdminBlogList: React.FC<AdminBlogListProps> = ({ posts }) => {
  const columns = [
    { 
      header: 'Insight', 
      accessor: (row: any) => (
        <div className="flex items-center space-x-4">
          <div className="w-16 h-10 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
             <img src={row.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
          </div>
          <div>
            <p className="font-black text-[#1a1a3a] uppercase tracking-tight truncate max-w-xs">{row.title}</p>
            <p className="text-[9px] text-[#10b981] font-black uppercase tracking-widest">{row.category}</p>
          </div>
        </div>
      )
    },
    { header: 'Publicação', accessor: 'date' },
    { 
      header: 'Visibilidade', 
      accessor: 'status',
      cell: (v: string) => <StatusBadge status="success" />
    },
    {
      header: 'Acções',
      accessor: 'id',
      cell: (v: string) => <ActionButtons onEdit={() => {}} onDelete={() => {}} />
    }
  ];

  return (
    <div className="space-y-12 animate-reveal">
      <AdminHeader title="Arquivo de Insights" subtitle="Gestão de Conteúdo Científico">
        <Link to="/acesso-a7f9k2/blog/novo" className="bg-[#1a1a3a] text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-[#e84c5c] transition-all">
          + Novo Artigo Técnico
        </Link>
      </AdminHeader>
      <DataTable columns={columns} data={posts} emptyMessage="Nenhum artigo localizado no arquivo." />
    </div>
  );
};

export default AdminBlogList;