// importando os usuarios
import { usuarios } from './usuarios.js';

// acessar a página home.html
document.getElementById('btnAcessar').addEventListener('click', () => {
    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;

    const usuarioValido = usuarios.find(usuario => usuario.login === login && usuario.senha === senha);

    if (usuarioValido) {
        // guardando o nome do usuário
        localStorage.setItem('usuario', login);

        // página home.html com o login
        window.location.href = `home.html?user=${encodeURIComponent(login)}`;
    } else {
        alert('Login ou senha inválidos!');
    }
});

// visualizar senha
document.getElementById('toggleSenha').addEventListener('click', () => {
    const senhaInput = document.getElementById('senha');
    const tipo = senhaInput.type === 'password' ? 'text' : 'password';
    senhaInput.type = tipo;
});

// novo usuário
document.getElementById('btnCriarConta').addEventListener('click', () => {
    window.location.href = 'novousuario.html';
});