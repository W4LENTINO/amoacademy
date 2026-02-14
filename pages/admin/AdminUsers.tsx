import React, { useState } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { DataTable } from '../../components/admin/DataTable';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { ActionButtons } from '../../components/admin/ActionButtons';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { useAdminData } from '../../hooks/useAdminData';
import SEO from '../../components/SEO';

const AdminUsers: React.FC = () => {
  const { adminUsers, loading, updateAdminStatus, deleteAdmin } = useAdminData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [actionType, setActionType] = useState<'disable' | 'enable' | 'delete' | null>(null);
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    role: 'editor',
    password: ''
  });

  const filteredUsers = adminUsers?.filter(user => {
    return user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           user.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleAction = async () => {
    if (!selectedUser) return;

    if (actionType === 'disable') {
      await updateAdminStatus(selectedUser, 'inactive');
    } else if (actionType === 'enable') {
      await updateAdminStatus(selectedUser, 'active');
    } else if (actionType === 'delete') {
      await deleteAdmin(selectedUser);
    }

    setSelectedUser(null);
    setActionType(null);
  };

  const handleCreateUser = async () => {
    setShowNewUserModal(false);
    setNewUserData({ name: '', email: '', role: 'editor', password: '' });
  };

  const columns = [
    { 
      header: 'Administrador', 
      accessor: (row: any) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#e84c5c] bg-opacity-10 rounded-lg flex items-center justify-center text-[#e84c5c] font-bold">
            {row.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-[#1a1a3a]">{row.name}</p>
            <p className="text-xs text-slate-400">{row.email}</p>
          </div>
        </div>
      ),
      sortable: true 
    },
    { header: 'Cargo', accessor: 'role', sortable: true },
    { 
      header: 'Último Acesso', 
      accessor: (row: any) => row.lastAccess ? new Date(row.lastAccess).toLocaleDateString('pt-PT') : 'Nunca' 
    },
    { 
      header: '2FA', 
      accessor: 'twoFactorEnabled',
      cell: (value: boolean) => value ? '✅ ATIVADO' : '❌ DESATIVADO'
    },
    { 
      header: 'Status', 
      accessor: 'status',
      cell: (value: string) => <StatusBadge status={value} />
    },
    {
      header: 'Ações',
      accessor: 'id',
      cell: (value: string, row: any) => (
        <div className="flex items-center space-x-2">
          <ActionButtons
            onEdit={() => {}}
          />
          {row.status === 'active' ? (
            <button
              onClick={() => { setSelectedUser(value); setActionType('disable'); }}
              className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
              title="Desativar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => { setSelectedUser(value); setActionType('enable'); }}
              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
              title="Ativar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
            </button>
          )}
          <button
            onClick={() => { setSelectedUser(value); setActionType('delete'); }}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Eliminar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      )
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-[#1a1a3a] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO title="Gestão de Administradores" />

      <div className="min-h-screen bg-slate-50 flex">
        <AdminSidebar />
        
        <div className="flex-1">
          <AdminHeader 
            title="Gestão de Administradores" 
            subtitle="Gerir contas de acesso ao painel institucional"
          >
            <button
              onClick={() => setShowNewUserModal(true)}
              className="bg-[#10b981] hover:bg-[#1a1a3a] text-white px-6 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all flex items-center shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Novo Admin
            </button>
          </AdminHeader>

          <main className="p-8">
            <div className="bg-white rounded-2xl p-6 mb-6">
              <input
                type="text"
                placeholder="Pesquisar por nome ou email corporativo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-[#e84c5c] focus:ring-2 focus:ring-[#e84c5c]/20 outline-none transition"
              />
            </div>

            <DataTable
              columns={columns}
              data={filteredUsers || []}
              emptyMessage="Nenhum administrador localizado"
            />
          </main>
        </div>
      </div>

      {showNewUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-6">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full animate-reveal">
            <h3 className="text-xl font-black text-[#1a1a3a] uppercase tracking-tight mb-8">Novo Administrador</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Nome Completo</label>
                <input
                  type="text"
                  value={newUserData.name}
                  onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-[#e84c5c] outline-none transition font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Email Corporativo</label>
                <input
                  type="email"
                  value={newUserData.email}
                  onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-[#e84c5c] outline-none transition font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Nível de Acesso</label>
                <select
                  value={newUserData.role}
                  onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-[#e84c5c] outline-none transition font-bold"
                >
                  <option value="editor">Editor</option>
                  <option value="admin">Administrador</option>
                  <option value="super_admin">Super Administrador</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Senha Temporária</label>
                <input
                  type="password"
                  value={newUserData.password}
                  onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-[#e84c5c] outline-none transition font-bold"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-10">
              <button
                onClick={() => setShowNewUserModal(false)}
                className="px-6 py-3 border border-slate-300 hover:bg-slate-50 text-slate-400 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateUser}
                className="px-6 py-3 bg-[#10b981] hover:bg-[#1a1a3a] text-white rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all shadow-lg"
              >
                Criar Acesso
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!actionType}
        onClose={() => { setSelectedUser(null); setActionType(null); }}
        onConfirm={handleAction}
        title={
          actionType === 'disable' ? 'Desativar Administrador' :
          actionType === 'enable' ? 'Ativar Administrador' : 'Eliminar Administrador'
        }
        message={
          actionType === 'disable' ? 'Tem certeza que deseja desativar este administrador? O acesso ao painel será bloqueado.' :
          actionType === 'enable' ? 'Tem certeza que deseja ativar este administrador? O acesso será restaurado.' :
          'Tem certeza que deseja eliminar permanentemente este administrador? Esta ação é irreversível.'
        }
        confirmText={
          actionType === 'disable' ? 'Desativar' :
          actionType === 'enable' ? 'Ativar' : 'Eliminar'
        }
        cancelText="Voltar"
        type={
          actionType === 'disable' ? 'warning' :
          actionType === 'enable' ? 'info' : 'danger'
        }
      />
    </>
  );
};

export default AdminUsers;