var usuarioCorreto = "admin";
var senhaCorreta = "admin123";

var formulario = document.getElementById("formLogin");

function fazerLogin(evento) {
  evento.preventDefault();

  var usuario = document.getElementById("usuario").value;
  var senha = document.getElementById("senha").value;

  if (usuario === usuarioCorreto && senha === senhaCorreta) {
    localStorage.setItem("logado", "sim");
    window.location.href = "admin.html";
  } else {
    document.getElementById("mensagemLogin").textContent = "Usuário ou senha incorretos.";
  }
}

formulario.addEventListener("submit", fazerLogin);
