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

export interface Evento {
  id: string;
  nome: string;
  descricao?: string;
  data_inicio: string;
  data_fim?: string;
  estado: 'agendado' | 'ativo' | 'terminado';
  aldeiaId: string;
  created_at: string;
}

export interface Jogo {
  id: string;
  tipo: 'poio_vaca' | 'rifa';
  config: Record<string, unknown>;
  preco_participacao: number;
  estado: 'ativo' | 'pausado' | 'fechado' | 'terminado';
  eventoId: string;
}
