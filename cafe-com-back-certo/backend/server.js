const express = require("express");
const cors = require("cors");

const app = express();
const PORTA = 3000;

app.use(cors());
app.use(express.json());

const cafes = [
  {
    id: 1,
    nome: "Expresso",
    descricao: "Curto e intenso",
    preco: 6.0,
    imagem:
      "https://perfectdailygrind.com/pt/wp-content/uploads/sites/5/2020/03/Paul-Mordheweyk-1024x850.jpg",
  },
  {
    id: 2,
    nome: "Cappuccino",
    descricao: "Cremoso e aveludado",
    preco: 9.0,
    imagem:
      "https://www.bongusto.ind.br/wp-content/uploads/2023/06/FRAPE-CAPUCCINO14.jpg",
  },
  {
    id: 3,
    nome: "Latte",
    descricao: "Suave, com leite",
    preco: 10.0,
    imagem:
      "https://www.nespresso.com/ncp/res/uploads/recipes/nespresso-recipes-Latte-Macchiato.jpg",
  },
];

const menu = [
  { id: 1, nome: "Expresso", preco: 6.0, favorito: false },
  { id: 2, nome: "Café com leite", preco: 7.0, favorito: false },
  { id: 3, nome: "Cappuccino", preco: 9.0, favorito: false },
];

app.get("/", (req, res) => {
  res.send("API do Café Aroma no ar! Tente /api/cafes ou /api/menu");
});

app.get("/api/cafes", (req, res) => {
  res.json(cafes);
});

app.get("/api/menu", (req, res) => {
  res.json(menu);
});

app.patch("/api/menu/:id/favorito", (req, res) => {
  const id = Number(req.params.id);
  const item = menu.find((i) => i.id === id);

  if (!item) {
    return res.status(404).json({ erro: "Item do menu não encontrado" });
  }

  item.favorito = !item.favorito;
  res.json(item);
});

app.listen(PORTA, () => {
  console.log(`Servidor do Café Aroma rodando em http://localhost:${PORTA}`);
});
