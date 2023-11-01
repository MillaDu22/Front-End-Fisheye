//Mettre le code JavaScript lié à la page photographer.html

/////////////////////////////////////////////////////// Select ////////////////////////////////////////////////////////////
const dd = document.querySelector('#dropdown-wrapper');
const links = document.querySelectorAll('.dropdown-list a');
const span = document.querySelector('.selected');

dd.addEventListener('click', function() {
    this.classList.toggle('is-active');
});

links.forEach((element) => {
    element.addEventListener('click', function(evt) {
    span.innerHTML = evt.currentTarget.textContent;
    })
})
////////////////////////////////////////////////////////Formulaire de contact///////////////////////////////////////////////////
// open modal 
function openModalForm() {
    const modalbg = document.querySelector(".bg-form");
    const modalBtn = document.querySelector(".contact_button");
    modalBtn.addEventListener('click', function() {
        modalbg.style.display="flex";
    });
}
openModalForm();

// Close modal form with X
function closeModal() {
    const modalbg = document.querySelector(".bg-form");
    const closeX = document.querySelector(".x-close-modal-form");
    closeX.addEventListener('click', function() {
        modalbg.style.display="none";
        closeBtnMsg.style.display="none";
    });
}
closeModal();

/////////////////////////////////////////////////////////// LightBox /////////////////////////////////////////////////////////
const slides = document.querySelector('.lightbox-image');


// Open
function openModal() {
    document.getElementById("lightbox-bg").style.display = "flex";
}

//Close
function closeModalLightBox() {
    const X = document.querySelector(".x-lightbox");
    X.addEventListener('click', function() {
        document.getElementById("lightbox-bg").style.display = "none";
    });
}
closeModalLightBox();

// Function slide
let slideIndex = 1;
showSlides(slideIndex);
/*Précédent et suivant*/
function prevNext(n) {
    showSlides(slideIndex += n);
}
/*actualisation*/
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var tltleImg =document.getElementsByClassName('title-img-lightbox')
    var slides = document.getElementsByClassName("img-modal");
    var dots = document.getElementsByClassName("dots");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) { 
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    tltleImg[slideIndex-1].style.display ="flex";
}






