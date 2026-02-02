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
- [x] Exportação de Participantes (CSV robusto para admins)
- [x] Dashboard de Estatísticas Simples (Total angariado por aldeia/evento)
- [x] Segurança Multi-Aldeia: Verificação rigorosa de propriedade (Anti-BOLA)
- [x] Módulo de Notificações (Email/Push para vencedores)
- [x] Fundação do Módulo de Pagamentos (Webhook simulado para Stripe/IfThenPay)

## Futuros Jogos & Melhorias (Wishlist)
- [ ] **Modo Transmissão ao Vivo:** Integração com WebSockets para mostrar sorteios em tempo real.
- [ ] **Localização GPS:** Ver no mapa onde as aldeias se localizam.
- [ ] **Galeria de Fotos:** Fotos dos eventos passados e dos prémios reais.
- [ ] **Filtros e Pesquisa:** Pesquisar aldeias por nome ou localização.
- [ ] **Jogo do Galo/Galinha Digital:** Animação que escolhe um quadrado aleatório.
- [ ] **Leilão de Cabazes:** Sistema de licitações em tempo real com contagem decrescente.
- [ ] **Tômbola Digital:** Sorteio imediato após a compra para pequenos prémios.
- [ ] **Multilingue:** Suporte para Inglês/Francês (para emigrantes).

## Próximos Passos (Frontend)
- [x] Setup Projeto Flutter (Mobile)
- [x] Implementar Autenticação no Flutter (Login/Register)
- [x] Listagem de Aldeias e Eventos na App
- [ ] Listagem de Jogos e Visualização de Grelha (Poio da Vaca)
- [ ] Fluxo de Compra de Participações (App -> Backend)
- [ ] Setup Projeto Next.js (Backoffice)

---
**Status atual:** Listagem de conteúdos mobile concluída. Iniciando lógica de jogos na app.
**Progresso Total Backend:** 100% concluído.
**Progresso Total Projeto:** ~65% concluído.

**O que foi feito nesta etapa:**
- Implementação dos modelos `Aldeia` e `Evento` no Flutter.
- Criação de serviços para integração com a API do backend.
- Atualização da `HomeScreen` para listar aldeias dinamicamente.
- Criação da `EventosScreen` para visualizar eventos por aldeia.
- Centralização da configuração da API em `core/api_config.dart`.

**O que falta realizar:**
- Visualização de Jogos e Grelhas (especialmente Poio da Vaca) na App.
- Implementação final do fluxo de compra na App.
- Setup do projeto de Backoffice Web (Next.js).

**Próxima interação:** Listagem de Jogos e Visualização de Grelha (Poio da Vaca).
