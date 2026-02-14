import { supabase } from './supabase';
import { Perfil } from './supabase';

export async function getCurrentUserProfile(): Promise<Perfil | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('perfis')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    return null;
  }
}

export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}