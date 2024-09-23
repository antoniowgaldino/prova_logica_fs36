// usuarios
const usuarios = [
    { id: 4505, nome: 'Alberto', login: 'alberto@dg.com.br', senha: '12345' },
    { id: 4506, nome: 'Rafael', login: 'rafael@dg.com.br', senha: '12345' },
    { id: 4507, nome: 'Turma', login: 'turma@dg.com.br', senha: '12345' }
];

// cadastro de usuário
document.getElementById('btnCadastrar').addEventListener('click', () => {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const termos = document.getElementById('termos').checked;

    // Validando campos
    if (nome && email && senha && termos) {
        const ultimoUsuario = usuarios[usuarios.length - 1];
        const novoId = ultimoUsuario ? ultimoUsuario.id + 1 : 4505;

        // novo usuário ao array
        usuarios.push({ id: novoId, nome: nome, login: email, senha: senha });
        localStorage.setItem('usuario', nome);
        window.location.href = 'home.html';
    } else {
        alert('Por favor, preencha todos os campos e aceite os termos.');
    }
});
