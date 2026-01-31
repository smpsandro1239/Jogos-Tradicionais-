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
- [x] Módulo de Participações
- [x] Regras de negócio por tipo de jogo (Coordenada única, Número único)
- [x] API de Participações (Comprar, Listar)

## Sprint 4: Sorteios (Randomização Auditável)
- [x] Módulo de Sorteios (Geração de seed, Hash SHA-256)
- [x] Resultado determinístico por tipo de jogo
- [x] API de Sorteios e Auditoria Pública

## Sprint 5: Melhorias e Notificações
- [ ] Módulo de Notificações (Email/Push para vencedores)
- [ ] Integração de Pagamentos Reais (Stripe/IfThenPay)
- [ ] Logs de Auditoria de Transações
- [ ] Exportação de Participantes (Excel/PDF para admins)

## Próximos Passos (Frontend)
- [ ] Setup Projeto Flutter (Mobile)
- [ ] Setup Projeto Next.js (Backoffice)

---
**Status atual:** Sprint 4 concluída (Sorteios Auditáveis).
**Progresso Total:** ~90% concluído (Backend).

**O que foi feito nesta etapa:**
- Implementação do Módulo de Sorteios.
- Lógica de randomização auditável usando SHA-256 e sementes dinâmicas.
- Cálculo determinístico de vencedores para "Poio da Vaca" e "Rifa".
- API para execução de sorteios por administradores e consulta pública de resultados para auditoria.
- Atualização do estado do jogo para "TERMINADO" após o sorteio.

**O que falta realizar:**
- Sprint 5 (Melhorias, Notificações e Pagamentos).
- Setup e Desenvolvimento do Frontend (Mobile e Backoffice).

**Próxima interação:** Iniciar a Sprint 5 ou Setup do Frontend conforme prioridade.
