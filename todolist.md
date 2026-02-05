# Projeto Jogos Tradicionais - Todolist

## Sprint 1: Fundações (Infra + Auth + Multi-Aldeia)
- [Concluído] Alta - Setup do Projeto NestJS (Backend)
- [Concluído] Alta - Configurar TypeORM + PostgreSQL
- [Concluído] Alta - Configurar Docker (Database + API)
- [Concluído] Alta - Criar estrutura de módulos base
- [Concluído] Alta - Configurar variáveis de ambiente
- [Concluído] Alta - Módulo de Utilizadores (Entidade, Register, Login, JWT)
- [Concluído] Alta - Roles e Permissões (super_admin, aldeia_admin, user)
- [Concluído] Alta - Módulo de Aldeias (CRUD básico)
- [Concluído] Alta - Guard Multi-Aldeia (AldeiaGuard)
- [Concluído] Alta - Segurança: Public registration role fix
- [Concluído] Alta - Segurança: JWT Secret config fix
- [Concluído] Média - Qualidade: DTOs e Validação Global
- [Concluído] Média - Qualidade: Swagger Documentation

## Sprint 2: Eventos + Jogos (Estrutura Base)
- [Concluído] Alta - Módulo de Eventos (Entidade, CRUD por aldeia)
- [Concluído] Alta - Módulo de Jogos (Entidade, Tipos: Poio da Vaca / Rifa)
- [Concluído] Alta - Validações de configuração por tipo de jogo
- [Concluído] Alta - API Pública de Jogos

## Sprint 3: Participações (Compras) + Regras de Negócio
- [Concluído] Alta - Módulo de Participações
- [Concluído] Alta - Regras de negócio por tipo de jogo (Coordenada única, Número único)
- [Concluído] Alta - API de Participações (Comprar, Listar)

## Sprint 4: Sorteios (Randomização Auditável)
- [Concluído] Alta - Módulo de Sorteios (Geração de seed, Hash SHA-256)
- [Concluído] Alta - Resultado determinístico por tipo de jogo
- [Concluído] Alta - API de Sorteios e Auditoria Pública

## Sprint 5: Melhorias, Auditoria e Notificações
- [Concluído] Alta - Módulo de Auditoria de Ações Sensíveis (Sorteios, Mudanças de Estado, Compras)
- [Concluído] Média - Exportação de Participantes (CSV robusto para admins)
- [Concluído] Média - Dashboard de Estatísticas Simples (Total angariado por aldeia/evento)
- [Concluído] Alta - Segurança Multi-Aldeia: Verificação rigorosa de propriedade (Anti-BOLA)
- [Concluído] Média - Módulo de Notificações (Email/Push para vencedores)
- [Concluído] Média - Fundação do Módulo de Pagamentos (Webhook simulado para Stripe/IfThenPay)

## Próximos Passos (Frontend Mobile)
- [Concluído] Alta - Setup Projeto Flutter (Mobile)
- [Concluído] Alta - Implementar Autenticação no Flutter (Login/Register)
- [Concluído] Alta - Listagem de Aldeias e Eventos na App
- [Concluído] Alta - Listagem de Jogos e Visualização de Grelha (Poio da Vaca)
- [Concluído] Alta - Fluxo de Compra de Participações (App -> Backend)
- [Pendente] Média - Histórico de participações do utilizador na App
- [Pendente] Média - Notificações Push na App

## Próximos Passos (Web & Outros)
- [Pendente] Alta - Setup Projeto Next.js (Backoffice)
- [Pendente] Baixa - Modo Transmissão ao Vivo (WebSockets)
- [Pendente] Baixa - Localização GPS
- [Pendente] Baixa - Galeria de Fotos
- [Pendente] Baixa - Jogo do Galo/Galinha Digital
- [Pendente] Baixa - Leilão de Cabazes
- [Pendente] Baixa - Tômbola Digital
- [Pendente] Baixa - Corrida de Caracóis Digital
- [Pendente] Baixa - Jogo da Malha AR
- [Pendente] Baixa - Sorteio com Peso Real (IoT)

---
**Status atual:** Fluxo de compra mobile concluído com visualização de lugares ocupados.
**Progresso Total Backend:** 100%
**Progresso Total Projeto:** ~80%

**O que foi feito nesta etapa:**
- Reestruturação do todolist.md para o novo formato [Estado] + Prioridade.
- Implementação do modelo e serviço de Participação no Flutter.
- Atualização do backend para permitir listagem pública de dados ocupados por jogo.
- Implementação da lógica de seleção interativa e compra no JogosScreen.
- Visualização de lugares ocupados (cinza/riscado) na grelha e rifa.

**O que falta realizar:**
- Visualização das "Minhas Participações" no perfil do utilizador.
- Notificações quando um sorteio for realizado.
- Setup do projeto de Backoffice Web (Next.js).

**Próxima interação:** Histórico de participações do utilizador na App.
