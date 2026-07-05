var formulario = document.getElementById("formAgendamento");

function buscarCep() {
  var cep = document.getElementById("cep").value;

  cep = cep.replace(/\D/g, "");

  if (cep.length !== 8) {
    alert("Digite um CEP válido com 8 números.");
    return;
  }

  var url = "https://viacep.com.br/ws/" + cep + "/json/";

  fetch(url)
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (dados) {
      if (dados.erro) {
        alert("CEP não encontrado");
        return;
      }

      document.getElementById("rua").value = dados.logradouro;
      document.getElementById("bairro").value = dados.bairro;
      document.getElementById("cidade").value = dados.localidade;
      document.getElementById("estado").value = dados.uf;
    })
    .catch(function () {
      alert("Erro ao buscar o CEP.");
    });
}

function salvarAgendamento(evento) {
  evento.preventDefault(); 

  var agendamento = {
    id: Date.now(), 
    tutor: document.getElementById("tutor").value,
    pet: document.getElementById("pet").value,
    servico: document.getElementById("servico").value,
    data: document.getElementById("data").value,
    horario: document.getElementById("horario").value,
    telefone: document.getElementById("telefone").value,
    cep: document.getElementById("cep").value,
    rua: document.getElementById("rua").value,
    numero: document.getElementById("numero").value,
    bairro: document.getElementById("bairro").value,
    cidade: document.getElementById("cidade").value,
    estado: document.getElementById("estado").value,
    concluido: false 
  };

  var salvos = localStorage.getItem("agendamentos");
  var agendamentos = [];
  if (salvos !== null) {
    agendamentos = JSON.parse(salvos);
  }

  agendamentos.push(agendamento);
  localStorage.setItem("agendamentos", JSON.stringify(agendamentos));

  document.getElementById("mensagem").textContent = "Agendamento realizado com sucesso!";
  formulario.reset();
}

formulario.addEventListener("submit", salvarAgendamento);