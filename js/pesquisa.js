const apiKey = 'b3904bfb3f89cb18c2456466a94bdcd5';

function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

async function searchMovies(query) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=pt-BR`);
        const data = await response.json();
        displaySearchResults(data.results, query);
    } catch (error) {
        console.error("Erro ao buscar filmes:", error);
    }
}

// converter valor bootstrap em pixel
function percentToPx(percent) {
    const containerWidth = document.querySelector('.container').clientWidth;
    const colWidth = (percent / 100) * containerWidth;
    const colHeight = colWidth * 1.5;
    return { colWidth, colHeight };
}
const { colWidth, colHeight } = percentToPx(13.9);

// resultados da busca
function displaySearchResults(movies, query) {
    const resultsContainer = document.getElementById('movie-results');
    resultsContainer.innerHTML = '';

    // Título da busca
    const searchTitle = document.createElement('h2');
    searchTitle.className = 'mb-5';
    searchTitle.textContent = `Exibindo ${movies.length} resultado(s) para a busca: "${query}"`;
    resultsContainer.appendChild(searchTitle);

    if (movies.length === 0) {
        resultsContainer.innerHTML += '<p class="text-center">Nenhum resultado encontrado.</p>';
        return;
    }

    // Galeria de filmes
    const row = document.createElement('div');
    row.className = 'row';
    resultsContainer.appendChild(row);

    // Define a largura mínima do card
    const MIN_CARD_WIDTH = 159;

    movies.forEach(movie => {
        const col = document.createElement('div');
        col.className = 'col-md-2 mb-4';

        // Se poster_path for null
        if (movie.poster_path) {
            // Limitando os caracteres
            const truncatedTitle = movie.title.length > 24 ? movie.title.substring(0, 24) + '...' : movie.title;

            col.innerHTML = `
                <div class="card bg-dark text-white" style="min-width: ${MIN_CARD_WIDTH}px;">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">
                    <div class="card-body">
                        <h6 class="card-title">${truncatedTitle}</h6>
                        <a href="sobre.html?id=${movie.id}&genre=${movie.genre_ids[0]}" class="btn btn-danger">Saiba mais</a>
                    </div>
                </div>
            `;
        } else {
            // Exibe "sem capa"
            col.innerHTML = `
                <div class="card bg-dark text-white" style="min-width: ${MIN_CARD_WIDTH}px;">
                    <div class="no-poster" style="width: ${colWidth}px; height: ${colHeight}px;">
                        <p>Sem capa<br />para o filme<br />"${movie.title}"</p>
                    </div>
                    <div class="card-body">
                        <a href="sobre.html?id=${movie.id}&genre=${movie.genre_ids[0]}" class="btn btn-danger">Saiba mais</a>
                    </div>
                </div>
            `;
        }
        row.appendChild(col);
    });
}

window.onload = () => {
    const query = getQueryParameter('query');
    if (query) {
        document.getElementById('search-input').value = query;
        document.title = `FS36Flix [ Resultados para "${query}" ]`;
        searchMovies(query);
    }
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

// pesquisa
function searchMovies2() {
    const query = document.getElementById('search-input').value;
    if (query) {
        window.location.href = `pesquisa.html?query=${encodeURIComponent(query)}`;
        document.title = `FS36Flix [ Resultados para "${query}" ]`;
    }
    return false;
}

// navbar
let lastScrollTop = 0;
window.addEventListener("scroll", function () {
    const navbar = document.querySelector('.navbar');
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Se rolar para cima, adiciona a classe 'sticky-top'
    if (scrollTop < lastScrollTop) {
        navbar.classList.add("sticky-top");
    } else {
        // Se rolar para baixo, remove a classe 'sticky-top'
        navbar.classList.remove("sticky-top");
    }

    lastScrollTop = scrollTop;
});