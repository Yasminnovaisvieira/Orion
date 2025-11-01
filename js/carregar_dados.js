// Função para abrir o popup
function abrirPopup() {
    document.getElementById("popup-adicionar").style.display = "flex";
}

// Função para fechar o popup
function fecharPopup() {
    document.getElementById("popup-adicionar").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  fetch("dados.json")
    .then(resposta => resposta.json())
    .then(produtos => {
      const tabela = document.querySelector(".tabela-produtos tbody");
      tabela.innerHTML = "";

      produtos.forEach(produto => {
        tabela.innerHTML += `
          <tr>
            <td><img src="${produto.imagem}" alt="${produto.nome}"></td>
            <td>${produto.nome}</td>
            <td>${produto.preco}</td>
            <td>${produto.desconto}</td>
            <td>
              <button class="btn-acao editar">Editar</button>
              <button class="btn-acao excluir">Excluir</button>
            </td>
          </tr>
        `;
      });
    })
    .catch(() => console.log("Erro ao carregar os dados"));
});