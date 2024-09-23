const apiKey = 'b3904bfb3f89cb18c2456466a94bdcd5';

// Função para buscar os detalhes do filme
async function buscarDetalhesFilme(id) {
    // Busca os detalhes do filme
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR`);
    const filme = await response.json();
    const generoId = filme.genres[0]?.id;

    // Busca os créditos do filme
    const responseCredits = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=pt-BR`);
    const credits = await responseCredits.json();

    // Atualiza o título, sinopse, gêneros, e nota
    document.getElementById('filme-nome').innerText = filme.title;
    document.getElementById('sinopse').innerText = filme.overview;
    document.getElementById('genero').innerText = filme.genres.map(g => g.name).join(', ');
    document.getElementById('nota').innerText = filme.vote_average;
    document.getElementById('capa-filme').src = `https://image.tmdb.org/t/p/w500${filme.poster_path}`;
    document.getElementById('background').style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${filme.backdrop_path})`;
    // document.getElementById('background').style.backgroundImage = `url(img/banner_01_deadpool_wolverine.jpg)`;

    // Atualiza o botão "Assistir"
    const assistirBtn = document.getElementById('assistir-btn');
    if (filme.homepage) {
        assistirBtn.href = filme.homepage;
        assistirBtn.target = "_blank";
        assistirBtn.classList.remove('disabled');
    } else {
        assistirBtn.classList.add('disabled');
    }

    // Atualiza a lista de atores principais (máximo de 3)
    const atoresContainer = document.getElementById('atores');
    atoresContainer.innerHTML = '';
    const atoresPrincipais = credits.cast.slice(0, 6);

    atoresPrincipais.forEach(ator => {
        const atorDiv = document.createElement('div');
        atorDiv.classList.add('ator');

        // Cria caixa "Sem imagem"
        if (ator.profile_path) {
            const atorImg = document.createElement('img');
            atorImg.src = `https://image.tmdb.org/t/p/w500${ator.profile_path}`;
            atorImg.alt = ator.name;
            atorImg.classList.add('ator-img');
            atorDiv.appendChild(atorImg);
        } else {
            const semImagemDiv = document.createElement('div');
            semImagemDiv.classList.add('sem-imagem');
            semImagemDiv.innerText = 'Sem imagem';
            atorDiv.appendChild(semImagemDiv);
        }

        const atorNome = document.createElement('div');
        atorNome.classList.add('ator-nome');
        atorNome.innerText = ator.name;

        atorDiv.appendChild(atorNome);
        atoresContainer.appendChild(atorDiv);
    });

    // Atualiza o título da página
    document.getElementById('titulo-pagina').innerText = `FS36Flix [ ${filme.title} ]`;

    // Atualiza a logomarca e nome do estúdio
    const estúdio = filme.production_companies[0];

    if (estúdio) {
        // Atualiza a logomarca do estúdio
        const logoEstudio = document.getElementById('logo-estudio');
        if (estúdio.logo_path) {
            logoEstudio.src = `https://image.tmdb.org/t/p/w500${estúdio.logo_path}`;
            logoEstudio.style.display = 'block';
        } else {
            logoEstudio.style.display = 'none';
        }

        // Atualiza o nome do estúdio
        document.getElementById('nome-estudio').innerText = `Produtora: ${estúdio.name}`;
    } else {
        // Se não houver estúdio, esconde a logomarca e o nome
        document.getElementById('logo-estudio').style.display = 'none';
        document.getElementById('nome-estudio').innerText = '';
    }

    // Após atualizar os detalhes do filme, busca filmes do mesmo gênero
    if (generoId) {
        await fetchMoviesByGenre(generoId);
    }
}

// Leitura do ID do filme
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

if (id) {
    buscarDetalhesFilme(id);
}

// Nome do usuário na navbar
const usuario = localStorage.getItem('usuario');
if (usuario) {
    document.getElementById('usuario').innerText = `Bem-vindo, ${usuario}`;

    // Adiciona o usuário ao link da logo
    const logoFlix = document.getElementById('logo-flix');
    logoFlix.href = `home.html?usuario=${encodeURIComponent(usuario)}`;
    
    const logoFlixFooter = document.getElementById('logo-flix-footer');
    logoFlixFooter.href = `home.html?usuario=${encodeURIComponent(usuario)}`;
}

async function fetchMoviesByGenre(genreId) {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=pt-BR&with_genres=${genreId}`);
    const data = await response.json();
    
    // Embaralha os filmes
    const shuffledMovies = shuffleArray(data.results);
    
    // Exibe apenas os primeiros 10 filmes embaralhados (ou quantos você preferir)
    displayMovies(shuffledMovies.slice(0, 10));
}

// Função para embaralhar o array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
    }
    return array;
}

function displayMovies(movies) {
    const gallery = document.getElementById('movie-gallery');
    gallery.innerHTML = ''; // Limpa a galeria atual

    movies.forEach(movie => {
        const col = document.createElement('div');
        col.className = 'col-md-2 mb-4'; // 5 colunas em uma linha

        const truncatedTitle = movie.title.length > 24 ? movie.title.substring(0, 24) + '...' : movie.title;

        col.innerHTML = `
            <div class="card bg-dark text-white">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">
                <div class="card-body">
                    <a href="sobre.html?id=${movie.id}&genre=${movie.genre_ids[0]}" class="btn btn-danger">Saiba mais</a>
                </div>
            </div>
        `;
        gallery.appendChild(col);
    });
}
