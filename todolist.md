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

## Sprint 5: Melhorias, Auditoria e Notificações
- [x] Módulo de Auditoria de Ações Sensíveis (Sorteios, Mudanças de Estado, Compras)
- [x] Exportação de Participantes (CSV para admins)
- [ ] Módulo de Notificações (Email/Push para vencedores)
- [ ] Integração de Pagamentos Reais (Stripe/IfThenPay)
- [ ] Dashboard de Estatísticas Simples (Total angariado por aldeia/evento)

## Futuros Jogos & Melhorias (Wishlist)
- [ ] **Jogo do Galo/Galinha Digital:** Animação que escolhe um quadrado aleatório.
- [ ] **Leilão de Cabazes:** Sistema de licitações em tempo real com contagem decrescente.
- [ ] **Tômbola Digital:** Sorteio imediato após a compra para pequenos prémios.
- [ ] **Multilingue:** Suporte para Inglês/Francês (para emigrantes).

## Próximos Passos (Frontend)
- [ ] Setup Projeto Flutter (Mobile)
- [ ] Setup Projeto Next.js (Backoffice)

---
**Status atual:** Sprint 5 em curso. Backend core quase finalizado (~90%).
**Progresso Total Backend:** 90% concluído.
**Progresso Total Projeto:** ~48% concluído (considerando Frontend).

**O que foi feito nesta etapa:**
- Implementação do Módulo de Auditoria (Audit Log) para registo de ações críticas.
- Integração da auditoria em Sorteios, Jogos e Participações.
- Implementação de exportação CSV para lista de participantes.
- Atualização da Wishlist com novos jogos tradicionais para expandir o impacto do projeto.

**O que falta realizar:**
- Sprint 5: Notificações, Pagamentos Reais e Estatísticas.
- Setup e desenvolvimento do Frontend (Mobile e Web).

**Próxima interação:** Iniciar o Módulo de Notificações ou Setup do Frontend.
