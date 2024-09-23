// usuarios
const usuarios = [
    { id: 4505, nome: 'Alberto', login: 'alberto@dg.com.br', senha: '12345' },
    { id: 4506, nome: 'Rafael', login: 'rafael@dg.com.br', senha: '12345' },
    { id: 4507, nome: 'Turma', login: 'turma@dg.com.br', senha: '12345' }
];

// página home.html
document.getElementById('btnAcessar').addEventListener('click', () => {
    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;

    // login e senha
    const usuarioValido = usuarios.find(usuario => usuario.login === login && usuario.senha === senha);

    if (usuarioValido) {
        localStorage.setItem('usuario', usuarioValido.nome);
        window.location.href = 'home.html';
    } else {
        alert('Login ou senha inválidos!');
    }
});

// Visualizar senha
document.getElementById('toggleSenha').addEventListener('click', () => {
    const senhaInput = document.getElementById('senha');
    const tipo = senhaInput.type === 'password' ? 'text' : 'password';
    senhaInput.type = tipo;
});

// Novo usuário
document.getElementById('btnCriarConta').addEventListener('click', () => {
    window.location.href = 'novousuario.html';
});
