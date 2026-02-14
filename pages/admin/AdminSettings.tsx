import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { FileUpload } from '../../components/admin/FileUpload';

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
      multicaixa: {
        enabled: true,
        entity: '99999',
        terminal: '1234567'
      },
      express: {
        enabled: true,
        merchantId: 'EXPRESS123',
        secretKey: '********'
      },
      bank: {
        enabled: true,
        iban: 'AO06012345678901234567890',
        bankName: 'Banco Angolano de Investimentos',
        accountName: 'AMOFARMA, Lda'
      }
    },
    backup: {
      autoBackup: true,
      frequency: 'daily',
      time: '02:00',
      retention: 30,
      lastBackup: '2025-02-13 03:00:00',
      backupSize: '2.4 GB'
    }
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    
    try {
      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMessage({ type: 'success', text: 'Configurações guardadas com sucesso!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao guardar configurações' });
    } finally {
      setSaving(false);
    }
  };

  const handleLogoUpload = (url: string) => {
    setSettings({
      ...settings,
      institution: { ...settings.institution, logo: url }
    });
  };

  const handleBackupNow = async () => {
    setMessage(null);
    // Implementar backup
    setMessage({ type: 'success', text: 'Backup iniciado com sucesso!' });
  };

  const handleRestoreBackup = async () => {
    // Implementar restauro
  };

  return (
    <>
      <Helmet>
        <title>Configurações | Painel Admin - AMOFARMA</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50 flex">
        <AdminSidebar />
        
        <div className="flex-1">
          <AdminHeader 
            title="Configurações do Sistema" 
            subtitle="Gerir configurações da plataforma"
          />

          <main className="p-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              {/* Tabs */}
              <div className="flex space-x-2 mb-8 border-b border-slate-100">
                <button
                  onClick={() => setActiveTab('geral')}
                  className={`px-6 py-3 font-medium transition-colors relative ${
                    activeTab === 'geral' 
                      ? 'text-[#e84c5c] border-b-2 border-[#e84c5c]' 
                      : 'text-slate-500 hover:text-[#1a1a3a]'
                  }`}
                >
                  Geral
                </button>
                <button
                  onClick={() => setActiveTab('email')}
                  className={`px-6 py-3 font-medium transition-colors relative ${
                    activeTab === 'email' 
                      ? 'text-[#e84c5c] border-b-2 border-[#e84c5c]' 
                      : 'text-slate-500 hover:text-[#1a1a3a]'
                  }`}
                >
                  Email
                </button>
                <button
                  onClick={() => setActiveTab('pagamentos')}
                  className={`px-6 py-3 font-medium transition-colors relative ${
                    activeTab === 'pagamentos' 
                      ? 'text-[#e84c5c] border-b-2 border-[#e84c5c]' 
                      : 'text-slate-500 hover:text-[#1a1a3a]'
                  }`}
                >
                  Pagamentos
                </button>
                <button
                  onClick={() => setActiveTab('backup')}
                  className={`px-6 py-3 font-medium transition-colors relative ${
                    activeTab === 'backup' 
                      ? 'text-[#e84c5c] border-b-2 border-[#e84c5c]' 
                      : 'text-slate-500 hover:text-[#1a1a3a]'
                  }`}
                >
                  Backup
                </button>
              </div>

              {/* Message */}
              {message && (
                <div className={`mb-6 p-4 rounded-lg ${
                  message.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                }`}>
                  {message.text}
                </div>
              )}

              {/* Geral Tab */}
              {activeTab === 'geral' && (
                <div className="space-y-6 max-w-2xl">
                  <h3 className="text-lg font-bold text-[#1a1a3a]">Informações da Instituição</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Nome da Instituição
                    </label>
                    <input
                      type="text"
                      value={settings.institution.name}
                      onChange={(e) => setSettings({
                        ...settings,
                        institution: { ...settings.institution, name: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-[#e84c5c] focus:ring-2 focus:ring-[#e84c5c]/20 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      value={settings.institution.fullName}
                      onChange={(e) => setSettings({
                        ...settings,
                        institution: { ...settings.institution, fullName: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-[#e84c5c] focus:ring-2 focus:ring-[#e84c5c]/20 outline-none transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={settings.institution.email}
                        onChange={(e) => setSettings({
                          ...settings,
                          institution: { ...settings.institution, email: e.target.value }
                        })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-[#e84c5c] focus:ring-2 focus:ring-[#e84c5c]/20 outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Telefone
                      </label>
                      <input
                        type="text"
                        value={settings.institution.phone}
                        onChange={(e) => setSettings({
                          ...settings,
                          institution: { ...settings.institution, phone: e.target.value }
                        })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-[#e84c5c] focus:ring-2 focus:ring-[#e84c5c]/20 outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Endereço
                    </label>
                    <input
                      type="text"
                      value={settings.institution.address}
                      onChange={(e) => setSettings({
                        ...settings,
                        institution: { ...settings.institution, address: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-[#e84c5c] focus:ring-2 focus:ring-[#e84c5c]/20 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      value={settings.institution.website}
                      onChange={(e) => setSettings({
                        ...settings,
                        institution: { ...settings.institution, website: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-[#e84c5c] focus:ring-2 focus:ring-[#e84c5c]/20 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Logótipo
                    </label>
                    <FileUpload
                      onUpload={handleLogoUpload}
                      currentImage={settings.institution.logo}
                      accept="image/*"
                      maxSize={2}
                    />
                  </div>
                </div>
              )}

              {/* Email Tab */}
              {activeTab === 'email' && (
                <div className="space-y-6 max-w-2xl">
                  <h3 className="text-lg font-bold text-[#1a1a3a]">Configurações de Email</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        SMTP Host
                      </label>
                      <input
                        type="text"
                        value={settings.email.smtpHost}
                        onChange={(e) => setSettings({
                          ...settings,
                          email: { ...settings.email, smtpHost: e.target.value }
                        })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-[#e84c5c] focus:ring-2 focus:ring-[#e84c5c]/20 outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        SMTP Port
                      </label>
                      <input
                        type="text"
                        value={settings.email.smtpPort}
                        onChange={(e) => setSettings({
                          ...settings,
                          email: { ...settings.email, smtpPort: e.target.value }
                        })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-[#e84c5c] focus:ring-2 focus:ring-[#e84c5c]/20 outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      SMTP Usuário
                    </label>
                    <input
                      type="text"
                      value={settings.email.smtpUser}
                      onChange={(e) => setSettings({
                        ...settings,
                        email: { ...settings.email, smtpUser: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-[#e84c5c] focus:ring-2 focus:ring-[#e84c5c]/20 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      SMTP Senha
                    </label>
                    <input
                      type="password"
                      value={settings.email.smtpPassword}
                      onChange={(e) => setSettings({
                        ...settings,
                        email: { ...settings.email, smtpPassword: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-[#e84c5c] focus:ring-2 focus:ring-[#e84c5c]/20 outline-none transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Nome do Remetente
                      </label>
                      <input
                        type="text"
                        value={settings.email.fromName}
                        onChange={(e) => setSettings({
                          ...settings,
                          email: { ...settings.email, fromName: e.target.value }
                        })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-[#e84c5c] focus:ring-2 focus:ring-[#e84c5c]/20 outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email do Remetente
                      </label>
                      <input
                        type="email"
                        value={settings.email.fromEmail}
                        onChange={(e) => setSettings({
                          ...settings,
                          email: { ...settings.email, fromEmail: e.target.value }
                        })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-[#e84c5c] focus:ring-2 focus:ring-[#e84c5c]/20 outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Reply-To
                    </label>
                    <input
                      type="email"
                      value={settings.email.replyTo}
                      onChange={(e) => setSettings({
                        ...settings,
                        email: { ...settings.email, replyTo: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-[#e84c5c] focus:ring-2 focus:ring-[#e84c5c]/20 outline-none transition"
                    />
                  </div>

                  <button className="text-[#e84c5c] hover:text-[#1a1a3a] text-sm font-medium">
                    Testar Configurações de Email
                  </button>
                </div>
              )}

              {/* Pagamentos Tab */}
              {activeTab === 'pagamentos' && (
                <div className="space-y-6 max-w-2xl">
                  <h3 className="text-lg font-bold text-[#1a1a3a]">Configurações de Pagamento</h3>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium text-[#1a1a3a]">Multicaixa</h4>
                    <label className="flex items-center space-x-2 mb-3">
                      <input
                        type="checkbox"
                        checked={settings.payments.multicaixa.enabled}
                        onChange={(e) => setSettings({
                          ...settings,
                          payments: {
                            ...settings.payments,
                            multicaixa: { ...settings.payments.multicaixa, enabled: e.target.checked }
                          }
                        })}
                        className="w-4 h-4 text-[#e84c5c] border-slate-300 rounded focus:ring-[#e84c5c]"
                      />
                      <span className="text-sm text-slate-700">Ativar Multicaixa</span>
                    </label>
                    
                    <div className="grid grid-cols-2 gap-4 ml-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Entidade
                        </label>
                        <input
                          type="text"
                          value={settings.payments.multicaixa.entity}
                          onChange={(e) => setSettings({
                            ...settings,
                            payments: {
                              ...settings.payments,
                              multicaixa: { ...settings.payments.multicaixa, entity: e.target.value }
                            }
                          })}
                          className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-[#e84c5c] focus:ring-2 focus:ring-[#e84c5c]/20 outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Terminal
                        </label>
                        <input
                          type="text"
                          value={settings.payments.multicaixa.terminal}
                          onChange={(e) => setSettings({
                            ...settings,
                            payments: {
                              ...settings.payments,
                              multicaixa: { ...settings.payments.multicaixa, terminal: e.target.value }
                            }
                          })}
                          className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-[#e84c5c] focus:ring-2 focus:ring-[#e84c5c]/20 outline-none transition"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-[#1a1a3a]">Express</h4>
                    <label className="flex items-center space-x-2 mb-3">
                      <input
                        type="checkbox"
                        checked={settings.payments.express.enabled}
                        onChange={(e) => setSettings({
                          ...settings,
                          payments: {
                            ...settings.payments,
                            express: { ...settings.payments.express, enabled: e.target.checked }
                          }
                        })}
                        className="w-4 h-4 text-[#e84c5c] border-slate-300 rounded focus:ring-[#e84c5c]"
                      />
                      <span className="text-sm text-slate-700">Ativar Express</span>
                    </label>
                    
                    <div className="grid grid-cols-2 gap-4 ml-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Merchant ID
                        </label>
                        <input
                          type="text"
                          value={settings.payments.express.merchantId}
                          onChange={(e) => setSettings({
                            ...settings,
                            payments: {
                              ...settings.payments,
                              express: { ...settings.payments.express, merchantId: e.target.value }
                            }
                          })}
                          className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-[#e84c5c] focus:ring-2 focus:ring-[#e84c5c]/20 outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Secret Key
                        </label>
                        <input
                          type="password"
                          value={settings.payments.express.secretKey}
                          onChange={(e) => setSettings({
                            ...settings,
                            payments: {
                              ...settings.payments,
                              express: { ...settings.payments.express, secretKey: e.target.value }
                            }
                          })}
                          className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-[#e84c5c] focus:ring-2 focus:ring-[#e84c5c]/20 outline-none transition"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-[#1a1a3a]">Transferência Bancária</h4>
                    <label className="flex items-center space-x-2 mb-3">
                      <input
                        type="checkbox"
                        checked={settings.payments.bank.enabled}
                        onChange={(e) => setSettings({
                          ...settings,
                          payments: {
                            ...settings.payments,
                            bank: { ...settings.payments.bank, enabled: e.target.checked }
                          }
                        })}
                        className="w-4 h-4 text-[#e84c5c] border-slate-300 rounded focus:ring-[#e84c5c]"
                      />
                      <span className="text-sm text-slate-700">Ativar Transferência Bancária</span>
                    </label>
                    
                    <div className="space-y-3 ml-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          IBAN
                        </label>
                        <input
                          type="text"
                          value={settings.payments.bank.iban}
                          onChange={(e) => setSettings({
                            ...settings,
                            payments: {
                              ...settings.payments,
                              bank: { ...settings.payments.bank, iban: e.target.value }
                            }
                          })}
                          className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-[#e84c5c] focus:ring-2 focus:ring-[#e84c5c]/20 outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Nome do Banco
                        </label>
                        <input
                          type="text"
                          value={settings.payments.bank.bankName}
                          onChange={(e) => setSettings({
                            ...settings,
                            payments: {
                              ...settings.payments,
                              bank: { ...settings.payments.bank, bankName: e.target.value }
                            }
                          })}
                          className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-[#e84c5c] focus:ring-2 focus:ring-[#e84c5c]/20 outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Nome da Conta
                        </label>
                        <input
                          type="text"
                          value={settings.payments.bank.accountName}
                          onChange={(e) => setSettings({
                            ...settings,
                            payments: {
                              ...settings.payments,
                              bank: { ...settings.payments.bank, accountName: e.target.value }
                            }
                          })}
                          className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-[#e84c5c] focus:ring-2 focus:ring-[#e84c5c]/20 outline-none transition"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Backup Tab */}
              {activeTab === 'backup' && (
                <div className="space-y-6 max-w-2xl">
                  <h3 className="text-lg font-bold text-[#1a1a3a]">Configurações de Backup</h3>
                  
                  <div className="bg-slate-50 rounded-xl p-6">
                    <p className="text-sm text-slate-500 mb-2">Último Backup</p>
                    <p className="text-lg font-medium text-[#1a1a3a] mb-1">{settings.backup.lastBackup}</p>
                    <p className="text-sm text-slate-400">Tamanho: {settings.backup.backupSize}</p>
                  </div>

                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={settings.backup.autoBackup}
                      onChange={(e) => setSettings({
                        ...settings,
                        backup: { ...settings.backup, autoBackup: e.target.checked }
                      })}
                      className="w-4 h-4 text-[#e84c5c] border-slate-300 rounded focus:ring-[#e84c5c]"
                    />
                    <span className="text-sm text-slate-700">Ativar backup automático</span>
                  </label>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Frequência
                      </label>
                      <select
                        value={settings.backup.frequency}
                        onChange={(e) => setSettings({
                          ...settings,
                          backup: { ...settings.backup, frequency: e.target.value as any }
                        })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-[#e84c5c] focus:ring-2 focus:ring-[#e84c5c]/20 outline-none transition"
                      >
                        <option value="daily">Diário</option>
                        <option value="weekly">Semanal</option>
                        <option value="monthly">Mensal</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Hora (HH:MM)
                      </label>
                      <input
                        type="time"
                        value={settings.backup.time}
                        onChange={(e) => setSettings({
                          ...settings,
                          backup: { ...settings.backup, time: e.target.value }
                        })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-[#e84c5c] focus:ring-2 focus:ring-[#e84c5c]/20 outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Manter backups por (dias)
                    </label>
                    <input
                      type="number"
                      value={settings.backup.retention}
                      onChange={(e) => setSettings({
                        ...settings,
                        backup: { ...settings.backup, retention: parseInt(e.target.value) }
                      })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-[#e84c5c] focus:ring-2 focus:ring-[#e84c5c]/20 outline-none transition"
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      onClick={handleBackupNow}
                      className="px-6 py-3 bg-[#e84c5c] hover:bg-[#1a1a3a] text-white rounded-lg font-medium transition-colors"
                    >
                      Fazer Backup Agora
                    </button>
                    <button
                      onClick={handleRestoreBackup}
                      className="px-6 py-3 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg font-medium transition-colors"
                    >
                      Restaurar Backup
                    </button>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="border-t border-slate-100 pt-6 mt-6">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-8 py-3 bg-[#1a1a3a] hover:bg-[#e84c5c] text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {saving ? 'A guardar...' : 'Guardar Configurações'}
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