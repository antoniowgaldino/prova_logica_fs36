const apiKey = 'b3904bfb3f89cb18c2456466a94bdcd5';

let currentPage = 1;
let totalPages = 1;

// filmes de acordo com o gênero
async function fetchMoviesByGenre(genreId, page = 1) {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&language=pt-BR&page=${page}`);
    const data = await response.json();
    totalPages = data.total_pages; // total de páginas
    displayMovies(data.results);
    updatePaginationControls(); // botões de navegação
}

// todos os filmes
async function fetchMovies(page = 1) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=${page}`);
    const data = await response.json();
    totalPages = data.total_pages; // total de páginas
    displayMovies(data.results);
    updatePaginationControls(); // botões de navegação
}

// exibir os filmes na galeria
function displayMovies(movies) {
    const gallery = document.getElementById('movie-gallery');
    gallery.innerHTML = '';

    movies.forEach(movie => {
        const col = document.createElement('div');
        col.className = 'col-md-2 mb-4';

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

// paginação
function updatePaginationControls() {
    const paginationControls = document.getElementById('pagination-controls');
    paginationControls.innerHTML = `
        <button class="btn btn-danger" onclick="prevPage()" ${currentPage === 1 ? 'disabled' : ''}> < </button>
        <span> Página ${currentPage} de ${totalPages} </span>
        <button class="btn btn-danger" onclick="nextPage()" ${currentPage === totalPages ? 'disabled' : ''}> > </button>
    `;
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        fetchMovies(currentPage);
    }
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        fetchMovies(currentPage);
    }
}

fetchMovies();

//banner principal

// array slides
let slidesData = [];

// tempo slide
let slideIndex = 1;
let slideDuration = 5000;
let slideTimer;

// buscar filmes
async function buscarFilmesBanner() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&vote_average.gte=6&language=pt-BR`);
        const data = await response.json();

        // avaliação acima de 5 em escolher 5 filmes
        const notasFilmes = data.results.filter(movie => movie.vote_average > 5);
        const filmesAleatorios = getFilmesAleatorios(notasFilmes, 5);
        slidesData = filmesAleatorios.map(movie => ({
            src: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`, // imagem
            caption: movie.title, // título
            id: movie.id, // ID do filme
            genre: movie.genre_ids[0] // Gênero do filme
        }));

        renderSlides();
    } catch (error) {
        console.error("Erro ao buscar filmes:", error);
    }
}

// filmes aleatórios
function getFilmesAleatorios(movies, count) {
    const sorteio = movies.sort(() => 0.5 - Math.random());
    return sorteio.slice(0, count);
}

// slides
function renderSlides() {
    const slideshowContainer = document.getElementById('slideshow-container');
    const dotsContainer = document.getElementById('dots-container');
    slideshowContainer.innerHTML = '';
    dotsContainer.innerHTML = '';

    slidesData.forEach((slide, index) => {
        // criando o slide
        const slideDiv = document.createElement('div');
        slideDiv.classList.add('mySlides', 'fade');
        slideDiv.style.backgroundImage = `url(${slide.src})`;
        slideDiv.style.backgroundSize = 'cover';
        slideDiv.style.backgroundPosition = 'center';
        slideDiv.style.width = '100%';
        slideDiv.style.height = '450px';
        slideDiv.style.position = 'relative';
    
        const numberText = document.createElement('div');
        numberText.classList.add('numbertext');
        numberText.textContent = `${index + 1} / ${slidesData.length}`;
    
        // Div para o fundo preto com gradiente
        const gradientOverlay = document.createElement('div');
        gradientOverlay.style.position = 'absolute';
        gradientOverlay.style.top = '0';
        gradientOverlay.style.left = '0';
        gradientOverlay.style.width = '100%';
        gradientOverlay.style.height = '450px';
        gradientOverlay.style.background = 'linear-gradient(to top, rgba(0, 0, 0, 1), rgba(255, 255, 255, 0))';
    
        // título e botão
        const contentContainer = document.createElement('div');
        contentContainer.style.display = 'flex';
        contentContainer.style.flexDirection = 'column';
        contentContainer.style.alignItems = 'flex-end';
        contentContainer.style.position = 'absolute';
        contentContainer.style.bottom = '50px';
        contentContainer.style.width = '100%';
        contentContainer.style.padding = '0 120px';
    
        // título
        const titleDiv = document.createElement('div');
        const title = document.createElement('h2');
        title.classList.add('title'); // classe
        title.textContent = slide.caption;
        title.style.paddingBottom = '25px';
        title.style.textAlign = 'right';
        titleDiv.appendChild(title);
    
        // Botão "Saiba mais"
        const buttonDiv = document.createElement('div');
        const saibaMaisBtn = document.createElement('a');
        saibaMaisBtn.style.backgroundColor = 'red';
        saibaMaisBtn.style.color = 'white';
        saibaMaisBtn.style.padding = '10px 30px';
        saibaMaisBtn.style.textDecoration = 'none';
        saibaMaisBtn.style.borderRadius = '5px';
        saibaMaisBtn.style.fontWeight = 'bold';
        saibaMaisBtn.textContent = 'Saiba mais';
        saibaMaisBtn.href = `sobre.html?id=${slide.id}&genre=${slide.genre}`;
        buttonDiv.appendChild(saibaMaisBtn);
    
        // título e botão
        contentContainer.appendChild(titleDiv);
        contentContainer.appendChild(buttonDiv);
    
        // slide
        slideDiv.appendChild(numberText);
        slideDiv.appendChild(gradientOverlay);
        slideDiv.appendChild(contentContainer);
        slideshowContainer.appendChild(slideDiv);
    
        // Pontinhos
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.onclick = () => currentSlide(index + 1);
        dotsContainer.appendChild(dot);
    });    
    
    // Botões de navegação
    const prevBtn = document.createElement('a');
    prevBtn.classList.add('prev');
    prevBtn.textContent = '❮';
    prevBtn.onclick = () => plusSlides(-1);
    slideshowContainer.appendChild(prevBtn);

    const nextBtn = document.createElement('a');
    nextBtn.classList.add('next');
    nextBtn.textContent = '❯';
    nextBtn.onclick = () => plusSlides(1);
    slideshowContainer.appendChild(nextBtn);

    showSlides(slideIndex);
}

// navegação
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";

    clearTimeout(slideTimer);

    slideTimer = setTimeout(() => plusSlides(1), slideDuration);
}

window.onload = buscarFilmesBanner;


// nome do usuário na navbar
const usuario = localStorage.getItem('usuario');
if (usuario) {
    document.getElementById('usuario').innerText = `Bem-vindo, ${usuario}`;
} else {
    window.location.href = 'login.html';
}

// pesquisa
function searchMovies() {
    const query = document.getElementById('search-input').value;
    if (query) {
        window.location.href = `pesquisa.html?query=${encodeURIComponent(query)}`;
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