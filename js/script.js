const apiKey = 'b3904bfb3f89cb18c2456466a94bdcd5';

// filmes de acordo com o gênero
async function fetchMoviesByGenre(genreId) {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&language=pt-BR`);
    const data = await response.json();
    displayMovies(data.results);
}

// todos os filmes
async function fetchMovies() {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`);
    const data = await response.json();
    displayMovies(data.results);
}

// exibir os filmes na galeria
function displayMovies(movies) {
    const gallery = document.getElementById('movie-gallery');
    gallery.innerHTML = ''; // Limpa a galeria atual

    movies.forEach(movie => {
        const col = document.createElement('div');
        col.className = 'col-md-2 mb-4'; // 5 colunas em uma linha

        // limitando os caracteres do titulo
        const truncatedTitle = movie.title.length > 24 ? movie.title.substring(0, 24) + '...' : movie.title;

        // limitando os caracteres da sinopse
        const truncatedOverview = movie.overview.length > 60 ? movie.overview.substring(0, 60) + '...' : movie.overview;

        col.innerHTML = `
            <div class="card bg-dark text-white">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">
                <div class="card-body">
                    <h6 class="card-title">${truncatedTitle}</h6>
                    <p class="card-text" style="font-size: 0.7rem;">${truncatedOverview}</p>
                    <a href="sobre.html?id=${movie.id}&genre=${movie.genre_ids[0]}" class="btn btn-danger">Saiba mais</a>
                </div>
            </div>
        `;
        gallery.appendChild(col);
    });
}

fetchMovies();

// nome do usuário na navbar
const usuario = localStorage.getItem('usuario');
if (usuario) {
    document.getElementById('usuario').innerText = `Bem-vindo, ${usuario}`;
}