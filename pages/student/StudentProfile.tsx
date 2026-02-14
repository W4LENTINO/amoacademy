import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth.ts';
import { StudentSidebar } from '../../components/student/StudentSidebar.tsx';
import { StudentHeader } from '../../components/student/StudentHeader.tsx';
import { alunosService } from '../../services/alunosService.ts';
import SEO from '../../components/SEO.tsx';

const StudentProfile: React.FC = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [formData, setFormData] = useState({
    nome_completo: profile?.nome_completo || '',
    telefone: profile?.telefone || '',
    profissao: profile?.profissao || '',
    data_nascimento: profile?.data_nascimento || ''
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    const res = await alunosService.atualizarAluno(user.id, formData);
    if (res.success) {
      setMsg('Perfil actualizado com sucesso.');
      await refreshProfile();
    } else setMsg('Erro ao actualizar perfil.');
    setLoading(false);
  };

  return (
    <>
      <SEO title="Meu Perfil" />
      <div className="min-h-screen bg-slate-50 flex">
        <StudentSidebar />
        <div className="flex-1">
          <StudentHeader title="Perfil Académico" subtitle="Informações da sua identidade digital" />
          <main className="p-8 md:p-12 max-w-4xl mx-auto">
             <form onSubmit={handleUpdate} className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100 space-y-10">
                <div className="flex items-center space-x-8 mb-12">
                   <div className="w-24 h-24 bg-[#1a1a3a] rounded-[2.5rem] flex items-center justify-center text-white font-black text-4xl shadow-xl">{profile?.nome_completo?.charAt(0)}</div>
                   <div>
                      <h3 className="text-2xl font-black text-[#1a1a3a] tracking-tight uppercase leading-none">{profile?.nome_completo}</h3>
                      <p className="text-[10px] text-[#e84c5c] font-black uppercase tracking-[0.4em] mt-3 italic">Identidade Académica Verificada</p>
                   </div>
                </div>
                {msg && <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center">{msg}</div>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Nome Completo</label>
                      <input type="text" value={formData.nome_completo} onChange={e => setFormData({...formData, nome_completo: e.target.value})} className="w-full bg-slate-50 border-b-2 border-slate-50 p-5 focus:border-[#1a1a3a] outline-none transition font-bold" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Contacto WhatsApp</label>
                      <input type="tel" value={formData.telefone} onChange={e => setFormData({...formData, telefone: e.target.value})} className="w-full bg-slate-50 border-b-2 border-slate-50 p-5 focus:border-[#1a1a3a] outline-none transition font-bold" />
                   </div>
                </div>
                <button disabled={loading} className="w-full bg-[#1a1a3a] hover:bg-[#e84c5c] text-white py-6 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-2xl disabled:opacity-50">
                  {loading ? 'Sincronizando...' : 'Actualizar Dados Pessoais'}
                </button>
             </form>
          </main>
        </div>
      </div>
    </>
  );
};
export default StudentProfile;