const arrowLeft = document.querySelector('.arrow-left');
//const boxTitle = document.getElementById('titles-img-lightbox');


function openModal(event) {
    console.log(event.target.dataset.index)
    const lightboxBg = document.getElementById('lightbox-bg');
    const lightboxImage = document.getElementById('modale');
    lightboxBg.style.display = 'block';
    lightboxImage.innerHTML = event.target.outerHTML;
    // Vérification si événement déclenché par un élément interactif (avec tabindex) //
    const isInteractiveElement = event.target.getAttribute('tabindex') !== null;

    if (isInteractiveElement) {
        // Ouvrir la modal uniquement si l'événement provient d'un élément avec tabindex //
        lightboxBg.style.display = 'block';
        lightboxImage.innerHTML = event.target.outerHTML;
        //boxTitle.innerHTML = `<h4 class= "title-lightbox">${media.title}</h4>`

        // Focus sur previous à l'ouverture de la modale //
        setTimeout(function() {
            arrowLeft.focus();
            }, 100);
            // Tabindex pour les éléments de la lightbox //
            lightboxImage.querySelectorAll('[tabindex]').forEach((element, index) => {
                element.setAttribute('tabindex', index + 1);
        });
    }
}
openModal;

function closeModal(e) {
    e.preventDefault()
    const lightboxBg = document.getElementById('lightbox-bg');
    lightboxBg.style.display = 'none';
}

// Ajout gestionnaire d'événements pour la touche "Escape" pour fermer la lightbox //
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        closeModal();
    }
});

// Affichage image spécifique dans la lightbox. L'argument n représente le numéro de l'image //
// eslint-disable-next-line no-unused-vars
function currentSlide(n) {
    const lightboxImage = document.getElementById('modale');
    const images = document.querySelectorAll('.element-gallery img, .element-gallery video');

    if (n >= 1 && n <= images.length) {
        lightboxImage.innerHTML = images[n - 1].outerHTML;
        
    }
}

// précédent et suivant //
function prevNext(n) {
    const lightboxImage = document.getElementById('modale');
    const images = document.querySelectorAll('.element-gallery img, .element-gallery video ');
    let currentImageIndex;


     // Trouve l'index de l'image actuelle //
        images.forEach((img, index) => {
        if (img.outerHTML === lightboxImage.innerHTML) {
            currentImageIndex = index;
        }
    });

    // Calcul de l'index de l'image suivante //
    let nextIndex = currentImageIndex + n;

    // Si on atteint le dernier ou le premier, revenir au premier ou au dernier //
    if (nextIndex >= images.length) {
        nextIndex = 0;
    } else if (nextIndex < 0) {
        nextIndex = images.length - 1;
    }


    lightboxImage.innerHTML = images[nextIndex].outerHTML;
}

// Ajout du gestionnaire d'événements pour le bouton de fermeture //
document.querySelector('.x-lightbox').addEventListener('click', closeModal);

// Ajout du gestionnaire d'événements pour les flèches de navigation //
document.querySelector('.arrow-left').addEventListener('click', () => prevNext(-1));
document.querySelector('.arrow-right').addEventListener('click', () => prevNext(1));