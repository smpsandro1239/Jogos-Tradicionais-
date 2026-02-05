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

## Frontend Mobile
- [Concluído] Alta - Setup Projeto Flutter (Mobile)
- [Concluído] Alta - Implementar Autenticação no Flutter (Login/Register)
- [Concluído] Alta - Listagem de Aldeias e Eventos na App
- [Concluído] Alta - Listagem de Jogos e Visualização de Grelha (Poio da Vaca)
- [Concluído] Alta - Fluxo de Compra de Participações (App -> Backend)
- [Concluído] Média - Histórico de participações do utilizador na App
- [Pendente] Média - Notificações Push na App

## Backoffice Web
- [Concluído] Alta - Setup do Projeto Next.js (Backoffice)
- [Concluído] Alta - Implementar Autenticação e Gestão de Sessão
- [Concluído] Alta - Dashboard com estatísticas reais (Super Admin)
- [Concluído] Alta - Listagem de Aldeias
- [Concluído] Alta - CRUD completo de Eventos
- [Concluído] Alta - CRUD completo de Jogos
- [Em Progresso] Média - Visualização de Auditoria e Logs
- [Em Progresso] Média - Execução de Sorteios via Web

## Futuros Jogos & Melhorias
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
**Status atual:** CRUD de Eventos e Jogos implementado no Backoffice.
**Progresso Total Backend:** 100%
**Progresso Total Projeto:** ~95%

**O que foi feito nesta etapa:**
- Criação de componente `Modal` reutilizável no Backoffice.
- Implementação de formulários de criação e edição para Eventos.
- Implementação de formulários de criação e edição para Jogos com configurações específicas.
- Integração total com a API para operações de escrita (POST, PATCH, DELETE).

**O que falta realizar:**
- Execução de sorteios a partir do Backoffice.
- Notificações Push no Mobile.
- Melhorias na auditoria visual.

**Próxima interação:** Execução de Sorteios via Backoffice e Visualização de Auditoria.
