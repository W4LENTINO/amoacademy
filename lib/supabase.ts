import { createClient } from '@supabase/supabase-js';

const getEnvVar = (name: string) => {
  if (typeof window !== 'undefined' && (window as any).process?.env) {
    return (window as any).process.env[name] || '';
  }
  return '';
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL') || 'https://placeholder.supabase.co';
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY') || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Perfil = {
  id: string;
  nome_completo: string;
  email: string;
  numero_bi: string;
  telefone: string | null;
  profissao: string | null;
  data_nascimento?: string | null;
  avatar_url: string | null;
  role: 'aluno' | 'admin' | 'super_admin' | 'editor' | 'visualizador';
  status: 'ativo' | 'inativo' | 'bloqueado';
  dois_fa_ativado: boolean;
  email_verificado: boolean;
  ultimo_acesso: string | null;
  created_at: string;
  updated_at: string;
};

export type Curso = {
  id: string;
  titulo: string;
  descricao_curta: string;
  descricao_longa: string | null;
  preco: number;
  instrutor: string;
  imagem_url: string | null;
  categoria: string;
  carga_horaria: number | null;
  vagas_totais: number;
  vagas_disponiveis: number;
  data_inicio: string | null;
  data_fim?: string | null;
  destaque_home: boolean;
  status: 'activo' | 'inactivo' | 'rascunho';
  resultados_aprendizagem?: string[];
  created_at: string;
  updated_at: string;
};

export type Inscricao = {
  id: string;
  aluno_id: string;
  curso_id: string;
  numero_bi: string;
  nome_completo: string;
  email: string;
  telefone_whatsapp: string;
  profissao: string | null;
  status: 'pendente' | 'confirmada' | 'cancelada' | 'concluida';
  presenca: boolean;
  certificado_emitido: boolean;
  data_inscricao: string;
  observacoes: string | null;
  created_at: string;
  updated_at: string;
};

// Added missing Certificado type to resolve import errors in lib/certificadosService.ts
export type Certificado = {
  id: string;
  aluno_id: string;
  curso_id: string;
  curso_nome: string;
  data_emissao: string;
  codigo_verificacao: string;
  hash_digital: string;
  status: 'valido' | 'invalido';
  visualizacoes: number;
  created_at: string;
  updated_at?: string;
};

// Added missing Pagamento type to resolve import errors in lib/pagamentosService.ts
export type Pagamento = {
  id: string;
  aluno_id: string;
  inscricao_id?: string;
  valor: number;
  moeda: string;
  metodo: string;
  estado: 'pendente' | 'concluido' | 'falhado' | 'cancelado';
  referencia?: string;
  comprovativo_url?: string;
  data_pagamento?: string;
  created_at: string;
  updated_at?: string;
};

export type Notificacao = {
  id: string;
  aluno_id: string | null;
  tipo: 'certificado' | 'pagamento' | 'curso' | 'sistema' | 'promocao';
  titulo: string;
  mensagem: string;
  lida: boolean;
  acao_link: string | null;
  acao_texto: string | null;
  created_at: string;
  updated_at?: string;
};