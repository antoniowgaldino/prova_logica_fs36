const apiKey = 'b3904bfb3f89cb18c2456466a94bdcd5';

// modal
function showModal(message, user) {
    document.getElementById('modalBody').textContent = message;

    const backToGalleryBtn = document.getElementById('backToGallery');
    backToGalleryBtn.setAttribute('href', `home.html`);
    
    // Exibe o modal
    $('#alertModal').modal('show');
}

// caixa de seleção
async function fetchGenres() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=pt-BR`);
        const data = await response.json();
        const genreSelect = document.getElementById('movie-genre');

        // caixa com os gêneros
        data.genres.forEach(genre => {
            const option = document.createElement('option');
            option.value = genre.id;
            option.textContent = genre.name;
            genreSelect.appendChild(option);
        });
    } catch (error) {
        showModal('Erro ao buscar gêneros. Tente novamente.');
        console.error('Erro ao buscar gêneros:', error);
    }
}

// cadastro de novo filme
async function submitMovieForm(event) {
    event.preventDefault();

    const movieName = document.getElementById('movie-name').value;
    const movieOverview = document.getElementById('movie-overview').value;
    const movieGenre = document.getElementById('movie-genre').value;
    const moviePoster = document.getElementById('movie-poster').files[0];
    const movieBackdrop = document.getElementById('movie-backdrop').files[0];
    const user = localStorage.getItem('usuario');

    // Validações
    if (!movieName || !movieOverview || !movieGenre || !moviePoster || !movieBackdrop) {
        showModal('Por favor, preencha todos os campos!', user);
        return;
    }

    // Exibindo os dados
    console.log('Nome do Filme:', movieName);
    console.log('Sinopse:', movieOverview);
    console.log('Gênero:', movieGenre);
    console.log('Poster:', moviePoster);
    console.log('Backdrop:', movieBackdrop);

    // FormData
    const formData = new FormData();
    formData.append('name', movieName);
    formData.append('overview', movieOverview);
    formData.append('genre', movieGenre);
    formData.append('poster', moviePoster);
    formData.append('backdrop', movieBackdrop);

    // envio dos dados
    try {
        showModal(`O filme "${movieName}" foi cadastrado com sucesso!`, user);
        document.getElementById('new-movie-form').reset();
    } catch (error) {
        showModal('Erro ao cadastrar filme. Tente novamente.', user);
        console.error('Erro ao cadastrar filme:', error);
    }
}

window.onload = () => {
    fetchGenres();
    document.getElementById('new-movie-form').addEventListener('submit', submitMovieForm);
};

// Nome do usuário na navbar
const usuario = localStorage.getItem('usuario');
if (usuario) {
    document.getElementById('usuario').innerText = `Bem-vindo, ${usuario}`;

    // Adiciona o usuário ao link da logo
    const logoFlix = document.getElementById('logo-flix');
    logoFlix.href = `home.html`;
    
    const logoFlixFooter = document.getElementById('logo-flix-footer');
    logoFlixFooter.href = `home.html`;
}

// Pesquisa de filmes
function searchMovies() {
    const query = document.getElementById('search-input').value;
    if (query) {
        window.location.href = `pesquisa.html?query=${encodeURIComponent(query)}`;
    }
    return false;
}
