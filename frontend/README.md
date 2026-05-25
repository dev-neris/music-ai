# 🎵 Gerador de Letras com IA

Projeto desenvolvido em React + Node.js que utiliza Inteligência Artificial (Groq API) para gerar e refinar letras de músicas automaticamente com base em parâmetros definidos pelo usuário.

---

## 🚀 Funcionalidades

- Geração de letras completas com IA
- Personalização por:
  - Tema da música
  - Gênero musical
  - Humor
  - Palavras-chave
- Estrutura automática:
  - Verso 1
  - Refrão
  - Verso 2
  - Ponte
  - Refrão final
- 🔁 Refinamento da letra gerada com IA
- Sugestões rápidas de melhoria
- Campo de refinamento personalizado

---

## 🧠 Arquitetura

Frontend (React) → Backend (Node/Express) → Groq API → Backend → Frontend

---

## 📦 Instalação

### 🔧 1. Clonar o projeto

git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git

---

### 🔧 2. Backend

cd backend  
npm install  

Criar arquivo .env:

GROQ_API_KEY=sua_chave_aqui  

Rodar backend:

node server.js  

Backend rodando em:
http://localhost:3000

---

### 🔧 3. Frontend

cd frontend  
npm install  
npm run dev  

Frontend rodando em:
http://localhost:5173

---

## 🔁 Como funciona o refinamento

Após gerar a letra, o usuário pode:

- Reescrever versos
- Melhorar rimas
- Tornar mais poético
- Adicionar novas partes
- Ou escrever comandos personalizados

A IA retorna uma versão atualizada mantendo contexto e estilo.

---

## ⚙️ Importante

- Backend precisa estar rodando na porta 3000
- Frontend consome API local
- Arquivo .env é obrigatório para funcionar

---

## 👨‍💻 Autores

- David Silva da Costa  
- Leonardo Neris Leal  

---

## 🏁 Status

✔️ Projeto funcional  
✔️ Integração com IA  
✔️ Refinamento implementado  
✔️ Pronto para entrega