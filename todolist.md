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
- [Concluído] Média - Notificações Push na App

## Backoffice Web
- [Concluído] Alta - Setup do Projeto Next.js (Backoffice)
- [Concluído] Alta - Implementar Autenticação e Gestão de Sessão
- [Concluído] Alta - Dashboard com estatísticas reais (Super Admin)
- [Concluído] Alta - Listagem de Aldeias
- [Concluído] Alta - CRUD completo de Eventos
- [Concluído] Alta - CRUD completo de Jogos
- [Concluído] Média - Visualização de Auditoria e Logs
- [Concluído] Média - Execução de Sorteios via Web
- [Concluído] Alta - Gestão de Utilizadores e Roles

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
**Status atual:** Implementação de Notificações Push Mobile concluída. Sistema 100% funcional.
**Progresso Total Backend:** 100%
**Progresso Total Projeto:** ~100% (Funcionalidades base concluídas)

**O que foi feito nesta etapa:**
- Adição de `push_token` à entidade `Utilizador` no Backend.
- Implementação de endpoint `PATCH /utilizadores/push-token`.
- Atualização do `NotificacoesService` e `SorteiosService` para disparar notificações push (simuladas).
- Implementação do `NotificationService` no Flutter para gerir mensagens e tokens.
- Criação do ecrã de Notificações no Mobile.
- Integração de badges de notificações não lidas na `HomeScreen`.

**O que falta realizar:**
- Melhorias contínuas e novos mini-jogos.
- Integração real com Firebase Messaging para produção.

**Próxima interação:** Feedback e manutenção.
