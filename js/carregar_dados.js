document.addEventListener("DOMContentLoaded", function () {

  const popup = document.getElementById("popup-adicionar");
  const tabelaCorpo = document.querySelector(".tabela-produtos tbody");
  const formPopup = document.querySelector(".form-popup");

  // Abre popup
  window.abrirPopup = function () {
    if (popup) popup.style.display = "flex";
  };

  // Fecha popup
  window.fecharPopup = function () {
    if (popup) popup.style.display = "none";
  };

  function criarLinhaProduto(produto) {
    const tr = document.createElement("tr");

    const tdImg = document.createElement("td");
    const img = document.createElement("img");
    img.src = produto.imagem || "img/placeholder.png";
    img.alt = produto.nome || "Imagem do produto";
    img.style.width = "80px";
    img.style.height = "auto";
    tdImg.appendChild(img);

    const tdNome = document.createElement("td");
    tdNome.textContent = produto.nome || "";

    const tdPreco = document.createElement("td");
    tdPreco.textContent = produto.preco || "";

    const tdDesconto = document.createElement("td");
    tdDesconto.textContent = produto.desconto || "";

    const tdAcoes = document.createElement("td");
    const btnEditar = document.createElement("button");
    btnEditar.className = "btn-acao editar";
    btnEditar.textContent = "Editar";

    const btnExcluir = document.createElement("button");
    btnExcluir.className = "btn-acao excluir";
    btnExcluir.textContent = "Excluir";
    btnExcluir.addEventListener("click", () => {
      tr.remove();
    });

    tdAcoes.appendChild(btnEditar);
    tdAcoes.appendChild(btnExcluir);

    tr.appendChild(tdImg);
    tr.appendChild(tdNome);
    tr.appendChild(tdPreco);
    tr.appendChild(tdDesconto);
    tr.appendChild(tdAcoes);

    return tr;
  }

  // Carrega dados do JSON
  function carregarProdutos() {
    fetch("dados.json")
      .then(response => {
        if (!response.ok) throw new Error("HTTP error " + response.status);
        return response.json();
      })
      .then(produtos => {
        tabelaCorpo.innerHTML = "";
        produtos.forEach(produto => {
          const linha = criarLinhaProduto(produto);
          tabelaCorpo.appendChild(linha);
        });
      })
      .catch(err => {
        console.error("Erro ao carregar dados.json:", err);
        tabelaCorpo.innerHTML = `<tr><td colspan="5">Erro ao carregar os produtos.</td></tr>`;
      });
  }

  if (formPopup) {
    formPopup.addEventListener("submit", function (e) {
      e.preventDefault();
      const inputs = formPopup.querySelectorAll("input");
      const novo = {
        imagem: inputs[0].value || "img/placeholder.png",
        nome: inputs[1].value || "",
        preco: inputs[2].value || "",
        desconto: inputs[3].value || ""
      };

      const linha = criarLinhaProduto(novo);
      tabelaCorpo.appendChild(linha);
      fecharPopup();
      formPopup.reset();

    });
  }

  carregarProdutos();
});
