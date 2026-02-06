# 🐄 Jogos Tradicionais - Monorepo

## 🚨 SOLUÇÃO PARA O ERRO DE DEPLOY (LIA AQUI)

O erro `flutter/bin/flutter: No such file or directory` acontece porque **a Vercel não suporta o Flutter**. Não tente fazer o build da pasta `frontend/mobile` na Vercel.

### 1. Como Corrigir o GitHub Pages (App Mobile)
**URL:** https://smpsandro1239.github.io/Jogos-Tradicionais-/
Se abrir o README em vez da App:
1. No seu repositório GitHub, vá a **Settings** > **Pages**.
2. Em **Build and deployment** > **Source**, altere obrigatoriamente para **GitHub Actions**.
3. Aguarde o fim do workflow `Deploy Flutter Web`.

### 2. Como Corrigir o Backoffice (Vercel)
**URL:** https://jogos-tradicionais-backoffice.vercel.app/
1. No dashboard da Vercel, selecione o projeto do **Backoffice**.
2. Vá a **Settings** > **General**.
3. Verifique se o **Root Directory** é `frontend/backoffice`.
4. Vá a **Settings** > **Build & Development**.
5. **RESET** todos os campos (Build Command, Output Directory, Install Command). Deixe-os vazios/default.
6. Faça um **Redeploy**.

### 3. O URL principal (Vercel Root)
**URL:** https://jogos-tradicionais.vercel.app/
Este URL serve como uma **Landing Page** que o leva para a App ou para o Backoffice.
* Se criou um projeto Vercel para a raiz do repositório, não altere o Build Command.

---

## 📁 Estrutura do Monorepo
- `backend`: NestJS API (Deploy no Render)
- `frontend/backoffice`: Next.js Admin (Deploy na Vercel)
- `frontend/mobile`: Flutter App (Deploy no GitHub Pages via Actions)
