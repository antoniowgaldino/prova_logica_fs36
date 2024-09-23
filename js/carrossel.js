let slidesData = [
    { src: "img/banner_01_deadpool_wolverine.jpg", caption: "Deadpool & Wolverine" },
    { src: "img/banner_02_rebel_ridge.jpg", caption: "Rebel Ridge" },
    { src: "img/banner_03_planeta_dos_macacos.jpg", caption: "Planeta dos Macacos: O Reinado" }
];

let slideIndex = 1;
let slideDuration = 5000; // 5 segundos
let slideTimer;

renderSlides();

function renderSlides() {
    const slideshowContainer = document.getElementById('slideshow-container');
    const dotsContainer = document.getElementById('dots-container');
    slideshowContainer.innerHTML = '';
    dotsContainer.innerHTML = '';

    slidesData.forEach((slide, index) => {
        // Create slide elements
        const slideDiv = document.createElement('div');
        slideDiv.classList.add('mySlides', 'fade');
        slideDiv.style.backgroundImage = `url(${slide.src})`;
        slideDiv.style.backgroundSize = 'cover';
        slideDiv.style.backgroundPosition = 'top center';  // Imagem no topo e centrada
        slideDiv.style.width = '100%';
        slideDiv.style.height = '450px';

        const numberText = document.createElement('div');
        numberText.classList.add('numbertext');
        numberText.textContent = `${index + 1} / ${slidesData.length}`;

        const textDiv = document.createElement('div');
        textDiv.classList.add('text');
        textDiv.textContent = slide.caption;

        // Append to the slide container
        slideDiv.appendChild(numberText);
        slideDiv.appendChild(textDiv);
        slideshowContainer.appendChild(slideDiv);

        // Create dot elements
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.onclick = () => currentSlide(index + 1);
        dotsContainer.appendChild(dot);
    });

    // Add navigation buttons
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

    // Show the initial slide
    showSlides(slideIndex);
}

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

    // Clear the existing timer before setting a new one
    clearTimeout(slideTimer);

    // Automatically change slide after a set duration
    slideTimer = setTimeout(() => plusSlides(1), slideDuration);
}
