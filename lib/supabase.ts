import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (typeof window !== 'undefined' && (window as any).process?.env?.VITE_SUPABASE_URL) 
  || 'https://placeholder-project.supabase.co';

const supabaseAnonKey = (typeof window !== 'undefined' && (window as any).process?.env?.VITE_SUPABASE_ANON_KEY) 
  || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Perfil = {
  id: string;
  nome_completo: string;
  email: string;
  numero_bi: string;
  telefone: string | null;
  profissao: string | null;
  // added data_nascimento to fix usage in StudentProfile form
  data_nascimento?: string | null;
  role: 'aluno' | 'admin' | 'super_admin' | 'editor' | 'visualizador';
  status: 'ativo' | 'inativo' | 'bloqueado';
  created_at: string;
};

export type Curso = {
  id: string;
  titulo: string;
  descricao_curta: string;
  preco: number;
  // updated status to include 'rascunho' as used in cursosService
  status: 'activo' | 'inactivo' | 'rascunho';
  imagem_url: string | null;
};

export type Certificado = {
  id: string;
  aluno_id: string;
  curso_nome: string;
  data_emissao: string;
  codigo_verificacao: string;
  hash_digital: string;
};

export type Pagamento = {
  id: string;
  aluno_id: string;
  // added inscricao_id to fix usage in pagamentosService
  inscricao_id?: string | null;
  valor: number;
  metodo?: string;
  referencia?: string;
  estado: 'pendente' | 'concluido' | 'falhado';
  // added data_pagamento to fix usage in pagamentosService
  data_pagamento?: string | null;
  created_at: string;
};

// added Notificacao to fix notificacoesService errors
export type Notificacao = {
  id: string;
  aluno_id: string;
  tipo: 'certificado' | 'curso' | 'pagamento' | 'sistema' | 'promocao';
  titulo: string;
  mensagem: string;
  acao_link?: string;
  acao_texto?: string;
  lida: boolean;
  created_at: string;
  updated_at?: string;
};

// added Inscricao to fix inscricoesService errors
export type Inscricao = {
  id: string;
  aluno_id: string;
  curso_id: string;
  // using string for status to allow flexibility between different status string variations used in code
  status: string;
  data_inscricao: string;
  presenca: boolean;
  certificado_emitido: boolean;
  nome_completo?: string;
  email?: string;
};
