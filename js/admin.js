if (localStorage.getItem("logado") !== "sim") {
  window.location.href = "login.html";
}

function mostrarAba(nome, botao) {
  document.getElementById("aba-agendamentos").classList.add("escondido");
  document.getElementById("aba-produtos").classList.add("escondido");
  document.getElementById("aba-servicos").classList.add("escondido");

  document.getElementById("aba-" + nome).classList.remove("escondido");

  var botoes = document.querySelectorAll(".aba");
  for (var i = 0; i < botoes.length; i++) {
    botoes[i].classList.remove("ativa");
  }
  botao.classList.add("ativa");
}

function pegarAgendamentos() {
  var salvos = localStorage.getItem("agendamentos");
  if (salvos === null) {
    return [];
  }
  return JSON.parse(salvos);
}

function guardarAgendamentos(lista) {
  localStorage.setItem("agendamentos", JSON.stringify(lista));
}

function mostrarAgendamentos() {
  var agendamentos = pegarAgendamentos();
  var area = document.getElementById("listaAgendamentos");

  if (agendamentos.length === 0) {
    area.innerHTML = "<p>Nenhum agendamento cadastrado.</p>";
    return;
  }

  var conteudo = "";

  for (var i = 0; i < agendamentos.length; i++) {
    var a = agendamentos[i];

    var situacao = "Pendente";
    if (a.concluido === true) {
      situacao = "Concluído";
    }

    conteudo += '<div class="item-agendamento">';
    conteudo += '  <p><strong>Tutor:</strong> ' + a.tutor + ' | <strong>Pet:</strong> ' + a.pet + '</p>';
    conteudo += '  <p><strong>Serviço:</strong> ' + a.servico + '</p>';
    conteudo += '  <p><strong>Data:</strong> ' + a.data + ' às ' + a.horario + '</p>';
    conteudo += '  <p><strong>Telefone:</strong> ' + a.telefone + '</p>';
    conteudo += '  <p><strong>Endereço:</strong> ' + a.rua + ', ' + a.numero + ' - ' + a.bairro + '</p>';
    conteudo += '  <p><strong>Cidade:</strong> ' + a.cidade + ' - ' + a.estado + ' | CEP: ' + a.cep + '</p>';
    conteudo += '  <p><strong>Situação:</strong> ' + situacao + '</p>';
    conteudo += '  <button class="botao" onclick="concluirAgendamento(' + a.id + ')">Concluir</button> ';
    conteudo += '  <button class="botao" onclick="editarAgendamento(' + a.id + ')">Editar</button> ';
    conteudo += '  <button class="botao" onclick="excluirAgendamento(' + a.id + ')">Excluir</button>';
    conteudo += '</div>';
  }

  area.innerHTML = conteudo;
}

function concluirAgendamento(id) {
  var agendamentos = pegarAgendamentos();

  for (var i = 0; i < agendamentos.length; i++) {
    if (agendamentos[i].id === id) {
      agendamentos[i].concluido = true;
    }
  }

  guardarAgendamentos(agendamentos);
  mostrarAgendamentos();
}

function excluirAgendamento(id) {
  var confirmar = confirm("Deseja realmente excluir este agendamento?");
  if (confirmar === false) {
    return;
  }

  var agendamentos = pegarAgendamentos();
  var novaLista = [];

  for (var i = 0; i < agendamentos.length; i++) {
    if (agendamentos[i].id !== id) {
      novaLista.push(agendamentos[i]);
    }
  }

  guardarAgendamentos(novaLista);
  mostrarAgendamentos();
}

function editarAgendamento(id) {
  var agendamentos = pegarAgendamentos();

  for (var i = 0; i < agendamentos.length; i++) {
    if (agendamentos[i].id === id) {
      var a = agendamentos[i];

      var novoTutor = prompt("Nome do tutor:", a.tutor);
      if (novoTutor !== null) { a.tutor = novoTutor; }

      var novoPet = prompt("Nome do pet:", a.pet);
      if (novoPet !== null) { a.pet = novoPet; }

      var novoServico = prompt("Serviço:", a.servico);
      if (novoServico !== null) { a.servico = novoServico; }

      var novaData = prompt("Data (aaaa-mm-dd):", a.data);
      if (novaData !== null) { a.data = novaData; }

      var novoHorario = prompt("Horário (hh:mm):", a.horario);
      if (novoHorario !== null) { a.horario = novoHorario; }

      var novoTelefone = prompt("Telefone:", a.telefone);
      if (novoTelefone !== null) { a.telefone = novoTelefone; }
    }
  }

  guardarAgendamentos(agendamentos);
  mostrarAgendamentos();
}

function pegarProdutos() {
  var salvos = localStorage.getItem("produtos");
  if (salvos === null) {
    return [];
  }
  return JSON.parse(salvos);
}

function guardarProdutos(lista) {
  localStorage.setItem("produtos", JSON.stringify(lista));
}

function adicionarProduto() {
  var nome = document.getElementById("nomeProduto").value;
  var categoria = document.getElementById("categoriaProduto").value;
  var preco = document.getElementById("precoProduto").value;

  if (nome === "" || preco === "") {
    alert("Preencha o nome e o preço do produto.");
    return;
  }

  var produtos = pegarProdutos();

  var novoProduto = {
    icone: "🛒",
    nome: nome,
    categoria: categoria,
    preco: preco
  };

  produtos.push(novoProduto);
  guardarProdutos(produtos);

  document.getElementById("nomeProduto").value = "";
  document.getElementById("precoProduto").value = "";
  mostrarProdutosAdmin();
}

function mostrarProdutosAdmin() {
  var produtos = pegarProdutos();
  var area = document.getElementById("listaProdutosAdmin");

  if (produtos.length === 0) {
    area.innerHTML = "<p>Nenhum produto cadastrado.</p>";
    return;
  }

  var conteudo = "";

  for (var i = 0; i < produtos.length; i++) {
    var p = produtos[i];
    conteudo += '<div class="item-lista">';
    conteudo += '  <span>' + p.icone + ' ' + p.nome + ' - ' + p.categoria + ' - ' + p.preco + '</span> ';
    conteudo += '  <button class="botao" onclick="excluirProduto(' + i + ')">Excluir</button>';
    conteudo += '</div>';
  }

  area.innerHTML = conteudo;
}

function excluirProduto(posicao) {
  var produtos = pegarProdutos();
  produtos.splice(posicao, 1); 
  guardarProdutos(produtos);
  mostrarProdutosAdmin();
}

function pegarServicos() {
  var salvos = localStorage.getItem("servicos");
  if (salvos === null) {
    return [];
  }
  return JSON.parse(salvos);
}

function guardarServicos(lista) {
  localStorage.setItem("servicos", JSON.stringify(lista));
}

function adicionarServico() {
  var nome = document.getElementById("nomeServico").value;
  var descricao = document.getElementById("descricaoServico").value;
  var preco = document.getElementById("precoServico").value;

  if (nome === "" || preco === "") {
    alert("Preencha o nome e o preço do serviço.");
    return;
  }

  var servicos = pegarServicos();

  var novoServico = {
    icone: "🐶",
    nome: nome,
    descricao: descricao,
    preco: preco
  };

  servicos.push(novoServico);
  guardarServicos(servicos);

  document.getElementById("nomeServico").value = "";
  document.getElementById("descricaoServico").value = "";
  document.getElementById("precoServico").value = "";
  mostrarServicosAdmin();
}

function mostrarServicosAdmin() {
  var servicos = pegarServicos();
  var area = document.getElementById("listaServicosAdmin");

  if (servicos.length === 0) {
    area.innerHTML = "<p>Nenhum serviço cadastrado.</p>";
    return;
  }

  var conteudo = "";

  for (var i = 0; i < servicos.length; i++) {
    var s = servicos[i];
    conteudo += '<div class="item-lista">';
    conteudo += '  <span>' + s.icone + ' ' + s.nome + ' - ' + s.preco + '</span> ';
    conteudo += '  <button class="botao" onclick="excluirServico(' + i + ')">Excluir</button>';
    conteudo += '</div>';
  }

  area.innerHTML = conteudo;
}

function excluirServico(posicao) {
  var servicos = pegarServicos();
  servicos.splice(posicao, 1);
  guardarServicos(servicos);
  mostrarServicosAdmin();
}

function sair() {
  localStorage.removeItem("logado");
  window.location.href = "login.html";
}

mostrarAgendamentos();
mostrarProdutosAdmin();
mostrarServicosAdmin();