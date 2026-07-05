var destaques = [
  { icone: "🦴", nome: "Ração Premium", preco: "R$ 80,00" },
  { icone: "🧸", nome: "Brinquedo Mordedor", preco: "R$ 22,00" },
  { icone: "🛁", nome: "Kit Banho e Tosa", preco: "R$ 65,00" }
];

function mostrarDestaques() {
  var lista = document.getElementById("listaDestaques");
  var conteudo = "";

  for (var i = 0; i < destaques.length; i++) {
    var item = destaques[i];
    conteudo += '<div class="cartao">';
    conteudo += '  <div class="icone">' + item.icone + '</div>';
    conteudo += '  <h3>' + item.nome + '</h3>';
    conteudo += '  <p class="preco">' + item.preco + '</p>';
    conteudo += '</div>';
  }

  lista.innerHTML = conteudo;
}

mostrarDestaques();