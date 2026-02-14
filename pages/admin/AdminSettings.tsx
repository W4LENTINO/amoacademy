import React, { useState } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar.tsx';
import { AdminHeader } from '../../components/admin/AdminHeader.tsx';
import { FileUpload } from '../../components/admin/FileUpload.tsx';
import SEO from '../../components/SEO.tsx';

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'geral' | 'email' | 'pagamentos' | 'backup'>('geral');
  const [settings, setSettings] = useState({
    institution: {
      name: 'AMOFARMA',
      fullName: 'Academia de Farmácia de Angola',
      email: 'cursos@amofarma.ao',
      phone: '+244 943 574 878',
      address: 'Av. Pedro Castro Van-Dunem Loy, Luanda',
      website: 'https://amofarma.ao',
      logo: '',
      favicon: ''
    },
    email: {
      smtpHost: 'smtp.gmail.com',
      smtpPort: '587',
      smtpUser: 'noreply@amofarma.ao',
      smtpPassword: '********',
      fromName: 'AMOFARMA',
      fromEmail: 'noreply@amofarma.ao',
      replyTo: 'cursos@amofarma.ao'
    },
    payments: {
      multicaixa: { enabled: true, entity: '99999', terminal: '1234567' },
      express: { enabled: true, merchantId: 'EXPRESS123', secretKey: '********' },
      bank: { enabled: true, iban: 'AO06012345678901234567890', bankName: 'BAI', accountName: 'AMOFARMA, Lda' }
    },
    backup: { autoBackup: true, frequency: 'daily', time: '02:00', retention: 30, lastBackup: '2025-02-13 03:00:00', backupSize: '2.4 GB' }
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setMessage({ type: 'success', text: 'Configurações guardadas com sucesso!' });
    setSaving(false);
  };

  return (
    <>
      <SEO title="Ajustes do Sistema" />
      <div className="min-h-screen bg-slate-50 flex">
        <AdminSidebar />
        <div className="flex-1">
          <AdminHeader title="Ajustes do Sistema" subtitle="Controlo de infraestrutura e protocolos" />
          <main className="p-8">
            <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-slate-100">
               <div className="flex space-x-8 mb-12 border-b border-slate-50">
                  {['geral', 'email', 'pagamentos', 'backup'].map((tab: any) => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-6 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'text-[#e84c5c] border-b-2 border-[#e84c5c]' : 'text-slate-300'}`}>
                      {tab}
                    </button>
                  ))}
               </div>
               {message && <div className={`p-4 mb-8 rounded-xl text-center text-[10px] font-black uppercase ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>{message.text}</div>}
               <div className="space-y-8 max-w-2xl">
                  {activeTab === 'geral' && (
                    <div className="space-y-6">
                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Identidade Visual</label>
                       <FileUpload onUpload={() => {}} currentImage={settings.institution.logo} />
                    </div>
                  )}
                  <button onClick={handleSave} disabled={saving} className="px-10 py-4 bg-[#1a1a3a] text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-[#e84c5c] transition-all">
                    {saving ? 'Sincronizando...' : 'Guardar Alterações'}
                  </button>
               </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminSettings;