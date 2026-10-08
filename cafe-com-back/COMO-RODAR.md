# Café Aroma — Aula 10 (bibliotecas + comunicação HTTP)

O projeto agora tem duas partes: um **back-end** (Node + Express) que envia os dados
e um **front-end** que busca esses dados com o **axios**.

## 1) Rodar o back-end

```bash
cd backend
npm install      # instala express e cors (só na primeira vez)
npm start        # inicia o servidor em http://localhost:3000
```

Rotas disponíveis:

- `http://localhost:3000/api/cafes` → lista dos cafés da home
- `http://localhost:3000/api/menu` → itens do cardápio

Deixe esse terminal aberto (o servidor precisa continuar rodando).

## 2) Rodar o front-end

Abra a pasta `front-cafe` no VS Code e use o **Live Server**
(botão direito no `index.html` → "Open with Live Server").

O front sobe em `http://localhost:5500` e busca os dados no back-end (porta 3000).
As bibliotecas axios, SweetAlert2 e Day.js são carregadas por CDN direto no HTML.

## O que observar

- Os cards de "Nossos cafés" e os itens do "Menu" **vêm do back-end** (não estão fixos no HTML).
- O botão **Pedir** abre um popup do **SweetAlert2**.
- "Atualizado às HH:mm" é formatado com o **Day.js**.
- Se o back-end estiver desligado, aparece uma mensagem de erro amigável.
