var produtosPadrao = [
  { icone: "🦴", nome: "Ração Premium 10kg", categoria: "Ração", preco: "R$ 80,00" },
  { icone: "🐟", nome: "Ração para Gatos 3kg", categoria: "Ração", preco: "R$ 40,00" },
  { icone: "🧸", nome: "Brinquedo Mordedor", categoria: "Brinquedo", preco: "R$ 22,00" },
  { icone: "🎾", nome: "Bolinha de Borracha", categoria: "Brinquedo", preco: "R$ 10,00" },
  { icone: "🦮", nome: "Coleira Ajustável", categoria: "Acessório", preco: "R$ 25,00" },
  { icone: "🛏️", nome: "Caminha para Pet", categoria: "Acessório", preco: "R$ 100,00" },
  { icone: "🧴", nome: "Shampoo para Cães", categoria: "Higiene", preco: "R$ 20,00" },
  { icone: "🪥", nome: "Escova de Dentes Pet", categoria: "Higiene", preco: "R$ 20,00" }
];

function carregarProdutos() {
  var salvos = localStorage.getItem("produtos");

  if (salvos === null) {
    localStorage.setItem("produtos", JSON.stringify(produtosPadrao));
    return produtosPadrao;
  }

  return JSON.parse(salvos);
}

function mostrarProdutos() {
  var produtos = carregarProdutos();
  var categoriaEscolhida = document.getElementById("categoria").value;
  var lista = document.getElementById("listaProdutos");
  var conteudo = "";

  for (var i = 0; i < produtos.length; i++) {
    var p = produtos[i];

    if (categoriaEscolhida === "todos" || p.categoria === categoriaEscolhida) {
      conteudo += '<div class="cartao">';
      conteudo += '  <div class="icone">' + p.icone + '</div>';
      conteudo += '  <h3>' + p.nome + '</h3>';
      conteudo += '  <p>' + p.categoria + '</p>';
      conteudo += '  <p class="preco">' + p.preco + '</p>';
      conteudo += '</div>';
    }
  }

  lista.innerHTML = conteudo;
}

mostrarProdutos();