export interface Aldeia {
  id: string;
  nome: string;
  descricao?: string;
  localizacao?: string;
  logo_url?: string;
  created_at: string;
}

export interface User {
  id: string;
  nome: string;
  email: string;
  role: 'super_admin' | 'aldeia_admin' | 'user';
  aldeia_id?: string;
}
