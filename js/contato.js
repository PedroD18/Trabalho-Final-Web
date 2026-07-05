var formulario = document.getElementById("formContato");

function enviarMensagem(evento) {
  evento.preventDefault(); 

  var nome = document.getElementById("nome").value;

  document.getElementById("avisoContato").textContent =
    "Obrigado, " + nome + " ! Sua mensagem foi enviada.";
  formulario.reset();
}

formulario.addEventListener("submit", enviarMensagem);