import React, { useState } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { DataTable } from '../../components/admin/DataTable';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { ActionButtons } from '../../components/admin/ActionButtons';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { useAdminData } from '../../hooks/useAdminData';
import SEO from '../../components/SEO';

const AdminEnrollments: React.FC = () => {
  const { enrollments, loading, updateEnrollmentStatus } = useAdminData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedEnrollment, setSelectedEnrollment] = useState<string | null>(null);
  const [actionType, setActionType] = useState<'confirm' | 'cancel' | null>(null);

  const filteredEnrollments = enrollments?.filter(enrollment => {
    const matchesSearch = enrollment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         enrollment.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         enrollment.studentEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || enrollment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAction = async () => {
    if (!selectedEnrollment) return;

    if (actionType === 'confirm') {
      await updateEnrollmentStatus(selectedEnrollment, 'confirmed');
    } else if (actionType === 'cancel') {
      await updateEnrollmentStatus(selectedEnrollment, 'cancelled');
    }

    setSelectedEnrollment(null);
    setActionType(null);
  };

  const stats = {
    total: enrollments?.length || 0,
    pending: enrollments?.filter(e => e.status === 'pending').length || 0,
    confirmed: enrollments?.filter(e => e.status === 'confirmed').length || 0,
    cancelled: enrollments?.filter(e => e.status === 'cancelled').length || 0
  };

  const columns = [
    { 
      header: 'Aluno', 
      accessor: (row: any) => (
        <div>
          <p className="font-medium text-[#1a1a3a]">{row.studentName}</p>
          <p className="text-xs text-slate-400">{row.studentEmail}</p>
        </div>
      ),
      sortable: true 
    },
    { header: 'Curso', accessor: 'courseName', sortable: true },
    { 
      header: 'Data Inscrição', 
      accessor: (row: any) => new Date(row.enrollmentDate).toLocaleDateString('pt-PT'),
      sortable: true 
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
            onView={() => {}}
          />
          {row.status === 'pending' && (
            <>
              <button
                onClick={() => { setSelectedEnrollment(value); setActionType('confirm'); }}
                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                title="Confirmar Inscrição"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
              <button
                onClick={() => { setSelectedEnrollment(value); setActionType('cancel'); }}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Cancelar Inscrição"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </>
          )}
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
      <SEO title="Gestão de Inscrições" />

      <div className="min-h-screen bg-slate-50 flex">
        <AdminSidebar />
        
        <div className="flex-1">
          <AdminHeader 
            title="Gestão de Inscrições" 
            subtitle="Gerir inscrições em cursos"
          />

          <main className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <p className="text-sm text-slate-500 mb-2">Total</p>
                <p className="text-3xl font-bold text-[#1a1a3a]">{stats.total}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <p className="text-sm text-slate-500 mb-2">Pendentes</p>
                <p className="text-3xl font-bold text-amber-600">{stats.pending}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <p className="text-sm text-slate-500 mb-2">Confirmadas</p>
                <p className="text-3xl font-bold text-emerald-600">{stats.confirmed}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <p className="text-sm text-slate-500 mb-2">Canceladas</p>
                <p className="text-3xl font-bold text-red-600">{stats.cancelled}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Pesquisar por aluno, curso ou email..."
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
                  <option value="pending">Pendentes</option>
                  <option value="confirmed">Confirmadas</option>
                  <option value="cancelled">Canceladas</option>
                </select>
              </div>
            </div>

            <DataTable
              columns={columns}
              data={filteredEnrollments || []}
              emptyMessage="Nenhuma inscrição encontrada"
            />
          </main>
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!actionType}
        onClose={() => { setSelectedEnrollment(null); setActionType(null); }}
        onConfirm={handleAction}
        title={actionType === 'confirm' ? 'Confirmar Inscrição' : 'Cancelar Inscrição'}
        message={
          actionType === 'confirm' 
            ? 'Tem certeza que deseja confirmar esta inscrição? O aluno receberá uma notificação.'
            : 'Tem certeza que deseja cancelar esta inscrição? Esta ação pode ser irreversível.'
        }
        confirmText={actionType === 'confirm' ? 'Confirmar' : 'Cancelar Inscrição'}
        cancelText="Voltar"
        type={actionType === 'confirm' ? 'info' : 'danger'}
      />
    </>
  );
};

export default AdminEnrollments;