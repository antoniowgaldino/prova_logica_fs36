// importando os usuarios
import { usuarios } from './usuarios.js';

// Função para cadastrar o usuário
document.getElementById('btnCadastrar').addEventListener('click', () => {
    const nome = document.getElementById('login').value;
    const email = document.getElementById('senha').value;
    const senha = document.getElementById('senha').value;
    const termos = document.getElementById('termos').checked;

    // Validando os campos
    if (nome && email && senha && termos) {
        // Adiciona o novo usuário e acesse home.html
        usuarios.push({ nome: nome, login: email, senha: senha });
        window.location.href = `home.html?user=${encodeURIComponent(login)}`;
    } else {
        alert('Por favor, preencha todos os campos e aceite os termos.');   
    }
});

document.getElementById('btnLogin').addEventListener('click', () => {
    window.location.href = 'index.html';
});
