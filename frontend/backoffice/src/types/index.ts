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
  config: {
    linhas?: number;
    colunas?: number;
    total_bilhetes?: number;
  };
  preco_participacao: number;
  estado: 'ativo' | 'pausado' | 'fechado' | 'terminado';
  eventoId: string;
}

export interface Sorteio {
  id: string;
  jogoId: string;
  seed: string;
  hash_seed: string;
  resultado: Record<string, unknown>;
  created_at: string;
}

export interface AuditLog {
  id: string;
  acao: string;
  metadados: Record<string, unknown>;
  utilizadorId: string;
  aldeiaId?: string;
  created_at: string;
}
