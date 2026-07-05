var servicosPadrao = [
  { icone: "🛁", nome: "Banho", descricao: "Banho completo.", preco: "R$ 40,00" },
  { icone: "✂️", nome: "Tosa", descricao: "Tosa higiênica ou completa.", preco: "R$ 50,00" },
  { icone: "🩺", nome: "Consulta veterinária", descricao: "Atendimento com veterinário.", preco: "R$ 90,00" },
  { icone: "💉", nome: "Vacinação", descricao: "Vacinas para cães e gatos.", preco: "R$ 50,00" }
];

function carregarServicos() {
  var salvos = localStorage.getItem("servicos");

  if (salvos === null) {
    localStorage.setItem("servicos", JSON.stringify(servicosPadrao));
    return servicosPadrao;
  }

  return JSON.parse(salvos);
}

function mostrarServicos() {
  var servicos = carregarServicos();
  var lista = document.getElementById("listaServicos");
  var conteudo = "";

  for (var i = 0; i < servicos.length; i++) {
    var s = servicos[i];
    conteudo += '<div class="cartao">';
    conteudo += '  <div class="icone">' + s.icone + '</div>';
    conteudo += '  <h3>' + s.nome + '</h3>';
    conteudo += '  <p>' + s.descricao + '</p>';
    conteudo += '  <p class="preco">' + s.preco + '</p>';
    conteudo += '</div>';
  }

  lista.innerHTML = conteudo;
}

mostrarServicos();