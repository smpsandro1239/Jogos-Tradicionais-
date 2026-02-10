# 🛡️ Relatório de Auditoria Técnica: Jogos Tradicionais

## 1. Análise Geral do Projeto
A plataforma "Jogos Tradicionais" é um monorepo moderno projetado para digitalizar e gerir eventos de angariação de fundos em comunidades locais.

*   **Estrutura**: Monorepo dividido em `backend` (API), `frontend/backoffice` (Gestão) e `frontend/mobile` (Utilizador).
*   **Tecnologias**:
    *   **Backend**: NestJS (v10+), TypeORM, PostgreSQL.
    *   **Backoffice**: Next.js 14, Tailwind CSS.
    *   **Mobile**: Flutter 3.24.x (Dart 3.5.4).
*   **Arquitetura**: Baseada em domínios modulares com suporte nativo a Multi-Tenancy (uma instância para múltiplas aldeias).

## 2. Análise Detalhada por Componente

### 📂 Backend (NestJS)
*   **Qualidade**: Alta. Utilização de DTOs, ValidationPipes globais e Enums para estados.
*   **Segurança**: Implementação robusta de JWT e Guards (`AldeiaGuard` para isolamento de dados).
*   **Performance**: Consultas TypeORM eficientes, mas com redundância de verificação de unicidade via código antes do save.
*   **Risco**: Falta de Throttling/Rate Limiting em rotas críticas (Login/Participação).

### 📂 Backoffice (Next.js)
*   **UI/UX**: Interface limpa baseada em Tailwind. Uso de componentes reutilizáveis (Modal).
*   **Integração**: Axios centralizado com interceptores para injeção automática de tokens.
*   **Lógica**: Gestão de estado via AuthContext está bem estruturada.

### 📂 Mobile (Flutter)
*   **Visual**: Identidade visual forte e consistente (Verde Aldeia/Laranja Tradição).
*   **Lógica de Jogo**: Renderização dinâmica de grelhas (Poio da Vaca) baseada em JSONB do backend está excelente.
*   **Persistência**: Uso correto de `flutter_secure_storage` para tokens.

## 3. Estado das Funcionalidades

| Funcionalidade | Estado | Nota |
| :--- | :--- | :--- |
| **Auth & RBAC** | ✅ Concluído | JWT com 3 níveis de permissão. |
| **Multi-Tenancy** | ✅ Concluído | Isolamento total por aldeia via Guards. |
| **Sorteio Determinístico** | ✅ Concluído | Lógica SHA-256 auditável e transparente. |
| **Participações** | ✅ Concluído | Validação de coordenadas e números únicos. |
| **Pagamentos** | ⚠️ MVP | Fundação implementada mas simulada (MBWay/Stripe). |
| **Notificações** | ⚠️ MVP | Histórico local e tokens push prontos, mas simulados. |
| **Live Streaming** | ❌ Pendente | Planeado para futuras sprints. |

## 4. Problemas Encontrados e Classificação

1.  **Rate Limiting (Importante)**: Inexistente. A API pode ser alvo de força bruta ou DoS.
2.  **Redundância de Validação (Moderado)**: O `ParticipacoesService` faz `findOne` antes de salvar, o que é menos performante que capturar a exceção de `UniqueConstraint` do BD em cenários de alta concorrência.
3.  **Métodos Depreciados (Cosmético)**: Uso de `.withOpacity` no Flutter (sugerido `.withValues`).
4.  **Simulações (Moderado)**: Pagamentos e Notificações Push precisam de provedores reais para produção.

## 5. Resumo Final Executivo

### Estado Atual: **MVP Funcional e de Alta Qualidade**
O projeto apresenta uma base técnica extremamente sólida. O código é limpo, segue boas práticas e a arquitetura permite escala horizontal.

**Pontos Fortes:**
- Sistema de sorteios inatacável do ponto de vista de transparência.
- Isolamento multi-tenant bem resolvido no backend.
- Facilidade de deploy via Docker.

**Pontos Fracos:**
- Dependência de serviços simulados para funcionalidades core (Pagamentos/Push).
- Exposição a ataques de negação de serviço por falta de limites de taxa.

**Próximos Passos Recomendados:**
1.  **Prioridade 1**: Implementar `@nestjs/throttler` no Backend.
2.  **Prioridade 2**: Integrar SDK real da Stripe/Easypay.
3.  **Prioridade 3**: Configurar Firebase Cloud Messaging (FCM) para notificações push reais.
4.  **Prioridade 4**: Refatorar o `ParticipacoesService` para otimizar colisões de coordenadas.
