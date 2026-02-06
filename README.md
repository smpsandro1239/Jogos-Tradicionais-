# 🐄 Jogos Tradicionais - Monorepo

## 🚀 Guia de Deploy e Configuração (LIA COM ATENÇÃO)

### 1. 📱 App Mobile Web (GitHub Pages)
**URL:** https://smpsandro1239.github.io/Jogos-Tradicionais-/

**Se abrir o README em vez da App:**
1. Vá às **Settings** do seu repositório no GitHub.
2. No menu lateral, clique em **Pages**.
3. Em **Build and deployment** > **Source**, altere para **GitHub Actions**.

### 2. 🛠️ Backoffice Admin (Vercel)
**MUITO IMPORTANTE:**
1. No dashboard da Vercel, vá às definições do projeto.
2. Vá a **Settings** > **General**.
3. Mude o **Root Directory** para `frontend/backoffice`.
4. Vá a **Settings** > **Build & Development**.
5. **LIMPE** o "Build Command" (deixe vazio/default). O erro do Flutter acontece porque este campo tem lixo.
6. Clique em **Save** e faça um novo **Redeploy**.

### 3. ⚙️ Backend API (Render)
1. Root Directory: `backend`
2. Build: `npm install && npm run build`
3. Start: `npm run start:prod`

---

## 📁 Estrutura
- `backend`: NestJS API
- `frontend/backoffice`: Next.js Admin
- `frontend/mobile`: Flutter App
