# 📚 Minha Biblioteca — React + JSON Server

Aplicação simples em **React** para organizar uma biblioteca pessoal de livros.
Permite **listar**, **cadastrar**, **ver detalhes** e **remover** livros.
Consome uma API fake com **JSON Server**.

---

## ✅ Funcionalidades

- **Home (`/`)**
  - Lista de livros em formato de cards (renderização com `map()`)
  - Cards reutilizáveis com **props**
  - Botão/link para ver detalhes do livro

- **Cadastro (`/cadastro`)**
  - Formulário com validação (**React Hook Form + Yup**)
  - Envio para a API com **POST**
  - Mensagem de sucesso/erro

- **Detalhes (`/detalhes/:id`)**
  - Exibe informações completas do livro usando `useParams`
  - Botão de voltar
  - **Remover livro** (DELETE) *(extra/opcional implementado)*

---

## 🧱 Estrutura do Projeto

```text
minha-biblioteca/
├─ db.json
├─ index.html
├─ package.json
├─ public/
└─ src/
   ├─ assets/
   ├─ components/
   │  ├─ Card.jsx
   │  ├─ Footer.jsx
   │  └─ Header.jsx
   ├─ pages/
   │  ├─ Home.jsx
   │  ├─ Cadastro.jsx
   │  └─ Detalhes.jsx
   ├─ App.jsx
   ├─ main.jsx
   └─ styles.css
```

## 🧪 Tecnologias utilizadas

- React (Vite)
- React Router DOM
- Axios
- JSON Server
- React Hook Form + Yup (validação)
- CSS puro

## ▶️ Como rodar o projeto

Instalar dependências:

```bash
npm install
```

Rodar a API (JSON Server):

```bash
npm run api
# URL da API: http://localhost:3001/books
```

Rodar o frontend (Vite):

```bash
npm run dev
# App: http://localhost:5173
```

## 📌 Rotas

- `/` — Home (lista de livros)
- `/cadastro` — Cadastro de livro
- `/detalhes/:id` — Detalhes do livro

## 📦 Exemplo de objeto (API)

```json
{
  "title": "Harry Potter e a Pedra Filosofal",
  "author": "J.K. Rowling",
  "year": 1997,
  "status": "Lendo",
  "coverUrl": "https://covers.openlibrary.org/b/isbn/9780747532699-L.jpg",
  "description": "Sinopse do livro..."
}
```

## 👩‍💻 Autoria

Projeto desenvolvido por [Alessandra Peglow](https://github.com/alepeglow)
