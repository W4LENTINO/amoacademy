import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { DataTable } from '../../components/admin/DataTable';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { ActionButtons } from '../../components/admin/ActionButtons';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { useAdminData } from '../../hooks/useAdminData';

const AdminPayments: React.FC = () => {
  const { payments, loading, updatePaymentStatus } = useAdminData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const filteredPayments = payments?.filter(payment => {
    const matchesSearch = payment.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.reference?.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleConfirmPayment = async (id: string) => {
    await updatePaymentStatus(id, 'completed');
    setSelectedPayment(null);
  };

  const stats = {
    total: payments?.reduce((acc, p) => acc + p.amount, 0) || 0,
    completed: payments?.filter(p => p.status === 'completed').reduce((acc, p) => acc + p.amount, 0) || 0,
    pending: payments?.filter(p => p.status === 'pending').reduce((acc, p) => acc + p.amount, 0) || 0,
    count: payments?.length || 0
  };

  const columns = [
    { 
      header: 'Aluno', 
      accessor: 'studentName',
      sortable: true 
    },
    { 
      header: 'Valor', 
      accessor: 'amount',
      cell: (value: number) => <span className="font-bold">{value.toLocaleString()} AOA</span>,
      sortable: true 
    },
    { header: 'Método', accessor: 'method', sortable: true },
    { header: 'Referência', accessor: 'reference' },
    { 
      header: 'Data', 
      accessor: (row: any) => new Date(row.createdAt).toLocaleDateString('pt-PT'),
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
            <button
              onClick={() => setSelectedPayment(value)}
              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
              title="Confirmar Pagamento"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
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
      <Helmet>
        <title>Gestão de Pagamentos | Painel Admin - AMOFARMA</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50 flex">
        <AdminSidebar />
        
        <div className="flex-1">
          <AdminHeader 
            title="Gestão de Pagamentos" 
            subtitle="Gerir transações financeiras"
          />

          <main className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <p className="text-sm text-slate-500 mb-2">Total Transações</p>
                <p className="text-3xl font-bold text-[#1a1a3a]">{stats.count}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <p className="text-sm text-slate-500 mb-2">Valor Total</p>
                <p className="text-3xl font-bold text-[#1a1a3a]">{stats.total.toLocaleString()} AOA</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <p className="text-sm text-slate-500 mb-2">Confirmados</p>
                <p className="text-3xl font-bold text-emerald-600">{stats.completed.toLocaleString()} AOA</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <p className="text-sm text-slate-500 mb-2">Pendentes</p>
                <p className="text-3xl font-bold text-amber-600">{stats.pending.toLocaleString()} AOA</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Pesquisar por aluno ou referência..."
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
                  <option value="completed">Confirmados</option>
                  <option value="failed">Falhados</option>
                </select>
              </div>
            </div>

            <DataTable
              columns={columns}
              data={filteredPayments || []}
              emptyMessage="Nenhum pagamento encontrado"
            />
          </main>
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!selectedPayment}
        onClose={() => setSelectedPayment(null)}
        onConfirm={() => handleConfirmPayment(selectedPayment!)}
        title="Confirmar Pagamento"
        message="Tem certeza que deseja confirmar este pagamento? O aluno receberá uma notificação."
        confirmText="Confirmar Pagamento"
        cancelText="Cancelar"
        /* Fix: Type 'success' replaced with 'info' to match ConfirmDialogProps definition */
        type="info"
      />
    </>
  );
};

export default AdminPayments;