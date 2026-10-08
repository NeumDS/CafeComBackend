const API = "http://localhost:3000";

const btnVerMenu = document.querySelector("#btn-ver-menu");
if (btnVerMenu) {
  btnVerMenu.addEventListener("click", () => {
    window.location.href = "menu.html";
  });
}

const btnVoltar = document.querySelector("#btn-voltar");
if (btnVoltar) {
  btnVoltar.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

const container = document.querySelector("#cards-container");
const statusCafes = document.querySelector("#status-cafes");
const atualizado = document.querySelector("#atualizado");

async function carregarCafes() {
  try {
    const resposta = await axios.get(`${API}/api/cafes`);
    const cafes = resposta.data;

    statusCafes.classList.add("escondido");

    cafes.forEach((cafe) => criarCard(cafe));

    atualizado.textContent = "Atualizado às " + dayjs().format("HH:mm");
  } catch (erro) {
    statusCafes.textContent =
      "Não foi possível carregar os cafés. O back-end está rodando? (npm start)";
    statusCafes.classList.add("erro");
    console.error(erro);
  }
}

function criarCard(cafe) {
  const card = document.createElement("div");
  card.className = "card";

  const precoBR = cafe.preco.toFixed(2).replace(".", ",");

  card.innerHTML = `
    <img class="card-imagem" src="${cafe.imagem}" alt="${cafe.nome}" />
    <span class="card-texto-titulo">${cafe.nome}</span>
    <span class="card-texto-descricao">${cafe.descricao}</span>
    <span class="card-texto-preco">R$ ${precoBR}</span>
    <div class="card-botoes">
      <button class="pedir-btn">Pedir</button>
      <button class="esconder-btn">Esconder</button>
    </div>
  `;

  card.querySelector(".pedir-btn").addEventListener("click", () => {
    Swal.fire({
      title: "Pedido feito!",
      text: `Você pediu um ${cafe.nome} por R$ ${precoBR}.`,
      icon: "success",
      confirmButtonColor: "#c8752d",
      heightAuto: false,
    });
  });

  card.querySelector(".favorito").addEventListener("click", () => {
    Swal.fire({
      title: "Favorito!",
      text: `Você favoritou o ${cafe.nome}.`,
      icon: "success",
      confirmButtonColor: "#c8752d",
      heightAuto: false,
    })
  })

  card.querySelector(".esconder-btn").addEventListener("click", () => {
    card.remove();
    verificarCards();
  });

  container.appendChild(card);
}

function verificarCards() {
  if (container.querySelectorAll(".card").length === 0) {
    statusCafes.textContent = "Não há café disponível no momento. ☕";
    statusCafes.classList.remove("escondido", "erro");
  }
}

const menuContainer = document.querySelector("#menu-container");
const statusMenu = document.querySelector("#status-menu");

async function carregarMenu() {
  try {
    const resposta = await axios.get(`${API}/api/menu`);
    const itens = resposta.data;

    statusMenu.classList.add("escondido");

    itens.forEach((item) => {
      const linha = document.createElement("div");
      linha.className = "menu-item";
      const precoBR = item.preco.toFixed(2).replace(".", ",");
      linha.innerHTML = `<span>${item.nome}</span><span class="preco">R$ ${precoBR}</span> `;
      linha.innerHTML += `<button class="favoritar">☆</button>`;
      const botaoFavoritar = linha.querySelector(".favoritar");

      if (item.favorito) {
        botaoFavoritar.classList.add("favorito");
        botaoFavoritar.textContent = "★";
      }
      botaoFavoritar.addEventListener("click", () => {
          atualizarFavorito(item.id, botaoFavoritar);
      });
      menuContainer.appendChild(linha);
    });
  } catch (erro) {
    statusMenu.textContent =
      "Não foi possível carregar o menu. O back-end está rodando? (npm start)";
    statusMenu.classList.add("erro");
    console.error(erro);
  }
}

function atualizarFavorito(id, botao) {
  axios
    .patch(`${API}/api/menu/${id}/favorito`)
    .then((resposta) => {
      console.log("Resposta do back", resposta.data);
      console.log("Botao: ", botao);

      botao.classList.toggle("favorito");

      if (botao.classList.contains("favorito")) {
        botao.textContent = "★";

        Swal.fire({
      title: "Favorito!",
      text: `Você favoritou o ${resposta.data.nome}.`,
      icon: "success",
      confirmButtonColor: "#c8752d",
      heightAuto: false,
    })

      } else {
        botao.textContent = "☆";
      }
  })
    .catch((erro) => {
      console.error(erro);
    });
}

if (container) carregarCafes();
if (menuContainer) carregarMenu();
