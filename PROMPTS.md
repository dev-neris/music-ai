# Documentação de Engenharia de Prompt
## Projeto: Gerador de Letras com IA — music-ai

**Alunos:** David Silva da Costa · Leonardo Neris Leal  
**Tecnologia de IA:** Groq API (modelo: llama-3.3-70b-versatile)  
**Data:** Maio de 2025

---

## 1. Visão Geral

A aplicação utiliza prompts dinâmicos para gerar letras de músicas personalizadas. Os parâmetros fornecidos pelo usuário (tema, gênero, humor e palavras-chave) são injetados no prompt antes de ser enviado ao modelo de linguagem, garantindo que cada geração seja única e contextualizada.

---

## 2. Prompt Principal de Geração

Este é o prompt utilizado na rota `POST /generate` do backend:

```
Você é um compositor profissional brasileiro. Crie uma letra de música completa em português.
Tema: {TEMA}
Gênero: {GENERO}
Humor: {HUMOR}
Palavras-chave: {PALAVRAS}

Estruture em:
[Verso 1]
[Refrão]
[Verso 2]
[Ponte]
[Refrão Final]

A música deve ser criativa, emocional e rimada.
```

### Explicação de cada componente

| Componente | Valor | Justificativa |
|---|---|---|
| `Você é um compositor profissional brasileiro` | Persona | Define o papel do modelo como especialista em composição musical brasileira, direcionando o estilo e vocabulário |
| `Crie uma letra de música completa em português` | Instrução principal | Garante que a resposta seja em português e que a letra seja completa |
| `Tema: {TEMA}` | Parâmetro dinâmico | Injeta o tema fornecido pelo usuário (ex: amor, superação, saudade) |
| `Gênero: {GENERO}` | Parâmetro dinâmico | Define o estilo musical (ex: Pop, Rock, Sertanejo) para adequar o vocabulário e ritmo |
| `Humor: {HUMOR}` | Parâmetro dinâmico | Define o tom emocional da letra (ex: Romântico, Melancólico, Animado) |
| `Palavras-chave: {PALAVRAS}` | Parâmetro dinâmico | Palavras ou frases que o usuário quer incluir obrigatoriamente na letra |
| Estrutura `[Verso 1]...[Refrão Final]` | Structured output | Força o modelo a organizar a letra em seções nomeadas, facilitando a exibição no frontend |
| `criativa, emocional e rimada` | Restrições de qualidade | Define critérios mínimos de qualidade poética para a resposta |

---

## 3. Estratégias de Prompting Utilizadas

### 3.1 Persona-Based Prompting
**Definição:** Atribuir um papel ou identidade ao modelo antes de dar a instrução.

**Aplicação no projeto:**
```
"Você é um compositor profissional brasileiro."
```
Ao definir o modelo como "compositor profissional brasileiro", a resposta tende a usar vocabulário musical adequado, expressões típicas do português brasileiro e estruturas líricas coerentes com a música popular brasileira.

---

### 3.2 Parameter Injection (Injeção de Parâmetros)
**Definição:** Inserir variáveis dinâmicas nos placeholders do prompt com base nos inputs do usuário.

**Aplicação no projeto:**
```javascript
const prompt = `...
Tema: ${tema}
Gênero: ${genero}
Humor: ${humor}
Palavras-chave: ${palavras}
...`
```
Cada variável é preenchida no backend com os dados enviados pelo frontend, tornando cada geração única e personalizada sem alterar a estrutura base do prompt.

---

### 3.3 Structured Output Prompting
**Definição:** Especificar no prompt o formato exato que a resposta deve ter.

**Aplicação no projeto:**
```
Estruture em:
[Verso 1]
[Refrão]
[Verso 2]
[Ponte]
[Refrão Final]
```
Ao exigir marcadores de seção entre colchetes, o frontend consegue identificar e renderizar cada parte da letra de forma organizada e visualmente separada.

---

### 3.4 Zero-Shot Prompting
**Definição:** Solicitar ao modelo que realize uma tarefa sem fornecer exemplos prévios.

**Aplicação no projeto:**
O prompt não inclui nenhum exemplo de letra — apenas as instruções e parâmetros. O modelo é capaz de gerar letras de qualidade apenas com as diretrizes fornecidas, sem necessidade de exemplos (few-shot).

---

### 3.5 Constraint-Based Prompting
**Definição:** Adicionar restrições explícitas de qualidade ou estilo ao prompt.

**Aplicação no projeto:**
```
"A música deve ser criativa, emocional e rimada."
```
Esta instrução ao final do prompt funciona como um filtro de qualidade, orientando o modelo a priorizar rimas, emoção e criatividade na composição.

---

## 4. Fluxo Completo da Aplicação

```
Usuário preenche formulário (tema, gênero, humor, palavras-chave)
        ↓
Frontend (React) envia POST para http://localhost:3000/generate
        ↓
Backend (Node.js/Express) recebe os parâmetros
        ↓
Backend monta o prompt dinâmico com os parâmetros
        ↓
Backend envia o prompt para a API do Groq (llama-3.3-70b-versatile)
        ↓
Groq retorna a letra gerada
        ↓
Backend extrai o texto e devolve ao frontend como JSON { letra: "..." }
        ↓
Frontend exibe a letra gerada na tela
```

---

## 5. Exemplo de Prompt Gerado

Com os inputs: **tema=amor**, **gênero=Pop**, **humor=Romântico**, **palavras=coração, destino, saudade**

```
Você é um compositor profissional brasileiro. Crie uma letra de música completa em português.
Tema: amor
Gênero: Pop
Humor: Romântico
Palavras-chave: coração, destino, saudade

Estruture em:
[Verso 1]
[Refrão]
[Verso 2]
[Ponte]
[Refrão Final]

A música deve ser criativa, emocional e rimada.
```

---

## 6. Tecnologias Utilizadas

| Camada | Tecnologia | Função |
|---|---|---|
| Frontend | React.js + Vite | Interface do usuário |
| Backend | Node.js + Express | Servidor API REST |
| LLM | Groq API (llama-3.3-70b-versatile) | Geração das letras |
| Estilo | CSS | Estilização da interface |
| HTTP Client | Axios | Requisições do frontend ao backend |

---

## 7. Boas Práticas de Segurança

- A chave da API (`GROQ_API_KEY`) é armazenada em arquivo `.env` no backend
- O arquivo `.env` está listado no `.gitignore` e não é enviado ao GitHub
- O frontend nunca tem acesso direto à chave da API — toda comunicação com o LLM passa pelo backend
