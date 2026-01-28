# Projeto Jogos Tradicionais - Todolist

## Sprint 1: Fundações (Infra + Auth + Multi-Aldeia)
- [x] Setup do Projeto NestJS (Backend)
- [x] Configurar TypeORM + PostgreSQL
- [x] Configurar Docker (Database + API)
- [x] Criar estrutura de módulos base
- [x] Configurar variáveis de ambiente
- [x] Módulo de Utilizadores (Entidade, Register, Login, JWT)
- [x] Roles e Permissões (super_admin, aldeia_admin, user)
- [x] Módulo de Aldeias (CRUD básico)
- [x] Guard Multi-Aldeia (AldeiaGuard)
- [x] Segurança: Public registration role fix
- [x] Segurança: JWT Secret config fix
- [x] Qualidade: DTOs e Validação Global
- [x] Qualidade: Swagger Documentation

## Sprint 2: Eventos + Jogos (Estrutura Base)
- [ ] Módulo de Eventos (Entidade, CRUD por aldeia)
- [ ] Módulo de Jogos (Entidade, Tipos: Poio da Vaca / Rifa)
- [ ] Validações de configuração por tipo de jogo
- [ ] API Pública de Jogos

## Sprint 3: Participações (Compras) + Regras de Negócio
- [ ] Módulo de Participações
- [ ] Regras de negócio por tipo de jogo (Coordenada única, Número único)
- [ ] API de Participações (Comprar, Listar)

## Sprint 4: Sorteios (Randomização Auditável)
- [ ] Módulo de Sorteios (Geração de seed, Hash SHA-256)
- [ ] Resultado determinístico por tipo de jogo
- [ ] API de Sorteios e Auditoria Pública

## Próximos Passos (Frontend)
- [ ] Setup Projeto Flutter (Mobile)
- [ ] Setup Projeto Next.js (Backoffice)

---
**Status atual:** Sprint 1 concluída com melhorias de segurança e qualidade.
**O que foi feito:**
- Setup inicial do backend NestJS.
- Configuração de infraestrutura (Docker, TypeORM, Postgres).
- Implementação de Autenticação e Autorização (JWT, Roles).
- Implementação do módulo de Aldeias e Guard de Multi-tenant.
- Adição de DTOs, ValidationPipe e Swagger.
- Correção de vulnerabilidades de segurança (role escalation e hardcoded secrets).
**O que falta realizar:** Sprints 2, 3, 4 e Setup de Frontend.
**Próxima interação:** Iniciar a Sprint 2 (Eventos + Jogos).
