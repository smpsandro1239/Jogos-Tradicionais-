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
- [x] Módulo de Eventos (Entidade, CRUD por aldeia)
- [x] Módulo de Jogos (Entidade, Tipos: Poio da Vaca / Rifa)
- [x] Validações de configuração por tipo de jogo
- [x] API Pública de Jogos

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
**Status atual:** Sprint 2 concluída (Estrutura de Eventos e Jogos).
**Progresso Total:** 68% concluído.

**O que foi feito nesta etapa:**
- Implementação do Módulo de Eventos com CRUD completo e proteção multi-aldeia.
- Implementação do Módulo de Jogos suportando "Poio da Vaca" e "Rifa".
- Validações de configuração específicas para cada tipo de jogo.
- Exposição de API pública para listagem de jogos e eventos.
- Relacionamentos entre Aldeias, Eventos e Jogos estabelecidos.

**O que falta realizar:**
- Sprint 3 (Participações e Regras de Negócio).
- Sprint 4 (Sorteios Auditáveis).
- Setup do Frontend (Flutter e Next.js).

**Próxima interação:** Iniciar a Sprint 3 (Participações).
