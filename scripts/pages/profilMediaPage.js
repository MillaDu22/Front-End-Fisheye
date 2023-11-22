//Mettre le code JavaScript lié à la page photographer.html
import {Api} from "../api/api.js";
import {DataPhotographer} from "../models/datasPhotographers.js";
import {HeaderPhotographer} from "../templates/profilPhotographer.js";
import {MediasFactory} from "../factories/mediasFactory.js";


//////// Templates gallery ////////
class PhotographerMedias {
    constructor(photographer, medias) {
        this.photographer = photographer;
        this.medias = medias;
}
createPhotographerMedias() {
    const galleryContainer = document.getElementById('gallery-photografer');
    // Si c'est une video //
    const gallery =`
        <article class ="content-gallery">
        ${this.medias.map((media, index) => {
            const tabindex = 0;
            const mediaIs = media._image
            ? `<img src="../../assets/images/gallery-id/${media._photographerId}/${media._image}" class="img-gallery" alt="${media._title}" data-index="${index}">`
            : `<video class="video-gallery" id="myVideo" controls data-index="${index}" >
                <source src="../../assets/images/gallery-id/${media._photographerId}/${media._video}" type="video/mp4">
                    Votre navigateur ne supporte pas la lecture de la vidéo.
                </video>`
            return`
            <div class="element-gallery" data-media-id="${media._id}">
                <a href="#" class="box-video active" aria-label="media ${media._title} du photographe" tabindex="${tabindex}" data-media="${media._id}>
                    ${mediaIs}
                </a>
                <div class="title-img">
                    <h3 class="txt-video">${media._title}</h3>
                    <span role="group" aria-label="counter like" class="like like-count" data-likes="0">${media._likes}
                        <a href="#" aria-label="Ajouter aux favoris" class="link-heart" tabindex="${tabindex}">
                            <i class="fa-regular fa-heart" aria-label="Vous pouvez ajouter un j'aime à la video"></i>
                        </a>
                    </span>
                </div>
            </div>`
        }).join("")}
        </article>`;
        galleryContainer.innerHTML = gallery
        // Chargement des médias triés par popularité par défaut //
        loadSortedPhotographerMedia('Popularité');
        return gallery;
    }
}

///////////// Utils Lightbox /////////////
export const displayLightboxMedias = medias => {
    const lightboxBg = document.getElementById('lightbox-bg');
    const closeBtn = document.querySelector('.x-lightbox');
    const prevBtn = document.querySelector ('.arrow-left');
    const nextBtn =document.querySelector ('.arrow-right');
    const boxMedia = document.querySelector ('.lightbox-image');
    const mediasArray = Array.from(document.querySelectorAll('.box-video'));


    // Mappage des medias dans la lightbox //
    const listOfMedias =medias.medias;
    let currentIndex = 0;
    mediasArray.forEach(media => {
        media.addEventListener('click', (event) => {
            event.preventDefault();
            const mediaId = media.dataset.media;
            const mediaIndex = listOfMedias.findIndex(media => media._id == mediaId);
            currentIndex = mediaIndex;
            lightboxBg.style.display = 'flex';
            prevBtn.focus();
            lightboxTemplate();
        });
    });

    // Template lightbox //
    const lightboxTemplate = () => {
        const currentSlide = listOfMedias[currentIndex];
        boxMedia.innerHTML=`
        ${currentSlide._image ? 
            `<img class ="media-lightbox" src = "../../assets/images/gallery-id/${photographerId}/${currentSlide._image}"
                alt= "${currentSlide._alt}">` :
            `<video class="media-lightbox" controls  aria-label ="${currentSlide._title}">
                <source src ="../../assets/images/gallery-id/${photographerId}/${currentSlide._video}" type="video/mp4">
            </video>`}
            <p class ="title-slide">${currentSlide._title}</p>`;
    };


    // Fermeture de la modale lightbox //
    const closeLightbox =  () => {
        lightboxBg.style.display="none";
        boxMedia.innerHTML = '';
    }

    // Si l'on est sur le dernier slide et que l'on clique sur next on repart sur le premier //
    const nextSlide = () => {
        currentIndex++;
        if(currentIndex > listOfMedias.length -1) currentIndex = 0;
        lightboxTemplate();
        activeBtn(nextBtn);
    }

    // Si l'on est sur le premier slide et que l'on clique sur prev on repart sur le dernier //
    const prevSlide = () => {
        currentIndex--;
        if(currentIndex < 0) currentIndex = listOfMedias.length -1;
        lightboxTemplate();
        activeBtn(prevBtn);
    }
    // Je redonne la classe active //
    const activeBtn = btn  => {
        btn.classList.add('active');
        setTimeout(() =>btn.classList.remove('active'), 100);
    }

    // Les gestionnaires d'évenements //
    prevBtn.addEventListener('click', () => prevSlide());
    nextBtn.addEventListener('click', () => nextSlide());
    closeBtn.addEventListener('click', () => closeLightbox());

    // Fonction pour gérer les événements clavier //
    const handleKeyboardEvents = (event) => {
        switch (event.key) {
            case 'ArrowLeft':
                prevSlide();
                prevBtn.focus();
                break;
            case 'ArrowRight':
                nextSlide();
                nextBtn.focus();
                break;
            case 'Escape':
                closeLightbox();
                closeBtn.focus();
                break;
            default:
                break;
        }
    };

    // Ajout des gestionnaires d'événements clavier //
    document.addEventListener('keydown', handleKeyboardEvents);
}


////////////// 

const photographersApi = new Api("../../data/photographers.json");
const photographerId  = new URLSearchParams(window.location.search).get("id");
export const getPhotographerById = async() => {
    const {photographers, media} = await photographersApi.getData();
    const photographer = photographers
    .map(photographerData => new DataPhotographer (photographerData))
    .find(photographerData => photographerData._id == photographerId); 
    const medias = media
    .map(mediaData => new MediasFactory(mediaData, 'Api')) 
    .filter(media => media._photographerId == photographerId)
    // Appel Calcul du total des likes pour le photographe //
    calculateTotalLikesForPhotographer(photographerId, photographerMedia);
    // Appel Affichage du tarif journalier
    displayDailyRate(photographer);
    displayLightboxMedias({ photographer, medias });

    return { photographer, medias };

}

////////// Fonction Filtrage ////////////
const galleryContainer = document.getElementById('gallery-photografer');
const dropdownWrapper = document.querySelector('#dropdown-wrapper');
const links = document.querySelectorAll('.dropdown-list a');
const span = document.querySelector('.selected');

let photographerMedia = [];

// Tri avec méthode sort //
function loadSortedPhotographerMedia(option) {
    let sortedMedia = [...photographerMedia];
    if (option === 'Popularité') {
        sortedMedia.sort((a, b) => b._likes - a._likes);
        // Tri du plus populaire au moins populaire //
    } else if (option === 'Date') {
        sortedMedia.sort((a, b) => new Date(b._date) - new Date(a._date));
        // Tri du plus récent au plus ancien //
    } else if (option === 'Titre') {
        sortedMedia.sort((a, b) => a._title.localeCompare(b._title));
        // Tri par ordre alphabétique avec la méthode localeCompare qui détermine la façon dont les caractères sont triés //
    }
    // Mise à jour de la galerie avec les médias triés //
    updateGallery(sortedMedia);
    displayLightboxMedias({ photographer: photographerMedia, medias: sortedMedia });
}
// Ajout écouteur d'événement pour preventDefault() //
const options = document.querySelectorAll('.option');
options.forEach(option => {
    option.addEventListener('click', (event) => {
        event.preventDefault();
const selectedOption = event.currentTarget.dataset.option; 
loadSortedPhotographerMedia(selectedOption, event);
    });
});

// Calcul de la somme totale des likes pour chaque photographe //
let totalLikesForPhotographer;


// Fonction pour mettre à jour la galerie avec les médias triés //
function updateGallery(sortedMedia) {
    const mediaTemplate = (media, index) => {
        const tabindex = 0;
        const mediaIs = media._image
            ? `<img src="../../assets/images/gallery-id/${media._photographerId}/${media._image}" class="img-gallery" alt="${media._title}" data-index="${index}">`
            : `<video class="video-gallery" id="myVideo" controls data-index="${index}" >
                <source src="../../assets/images/gallery-id/${media._photographerId}/${media._video}" type="video/mp4">
                    Votre navigateur ne supporte pas la lecture de la vidéo.
                </video>`
        return `
            <div class="element-gallery" data-media-id="${media._id}">
                <a href="#" class="box-video active" aria-label="media ${media._title} du photographe" tabindex="${tabindex}"  data-media="${media._id}" >
                    ${mediaIs}
                </a>
                <div class="title-img">
                    <h3 class="txt-video">${media._title}</h3>
                    <span role="group" aria-label="counter like" class="like like-count" data-likes="0">${media._likes}
                        <a href="#" aria-label="Ajouter aux favoris" class="link-heart" tabindex="${tabindex}">
                            <i class="fa-regular fa-heart" aria-label="Vous pouvez ajouter un j'aime à la video"></i>
                        </a>
                    </span>
                </div>
            </div>`;
    }
    galleryContainer.innerHTML = sortedMedia.map(mediaTemplate).join("");
    const dropdownWrapper = document.getElementById('dropdown-wrapper');
    const links = document.querySelectorAll('.option');

    // Evènements clavier à dropdownWrapper //
    dropdownWrapper.addEventListener('keydown', function (event) {
        const currentIndex = Array.from(links).findIndex(link => link === document.activeElement);
    

        // Fonction pour déplacer le focus vers le haut ou le bas en fonction de la touche pressée //
        const moveFocus = (direction) => {
        const newIndex = (currentIndex + direction + links.length) % links.length;
        links[newIndex].focus();
        
    };

    // Gestion des touches fléchées haut et bas + redonner le focus //
    switch (event.key) {
        case 'ArrowUp':
            moveFocus(-1);
            event.preventDefault();
            break;
        case 'ArrowDown':
            moveFocus(+1);
            event.preventDefault();
            break;
        default:
            break;
        }
    });
}



// Chargement des médias du photographe //
const { medias } = await getPhotographerById();
photographerMedia = medias;


////////// Compteur likes //////////////
// Calcul de la somme totale des likes pour chaque photographe //
function calculateTotalLikesForPhotographer(photographerId, mediaData) {
    const likesForPhotographer = mediaData
        .filter(media => media._photographerId == photographerId)
        .reduce((total, media) => {
            return total + media._likes;
        }, 0);
   // Met à jour le compteur total //
    totalLikesForPhotographer = likesForPhotographer;
    // Affiche le total des likes dans son container //
    const totalLikesElement = document.getElementById('total-likes');
    if (totalLikesElement) {
        totalLikesElement.textContent = totalLikesForPhotographer;
    }
}

galleryContainer.addEventListener('click', function (event) {
    // closest méthode pour rechercher élément ascendant (parent), vérifie si l'élément correspond au sélecteur et retourne l' élément. //
    const likeIcon = event.target.closest('.link-heart');
    const lightboxBg = document.getElementById('lightbox-bg');
    if (likeIcon) {
        lightboxBg.style.display="none";
        event.preventDefault();
        event.stopPropagation(); 
        const mediaElement = likeIcon.closest('.element-gallery');
        if (mediaElement) {
            const mediaId = mediaElement.dataset.mediaId;
            if (mediaId) {
                // Met à jour le compteur individuel //
                const likeCountElement = mediaElement.querySelector('.like-count');
                const liked = true;
                if (likeCountElement) {
                    const currentLikes = parseInt(likeCountElement.textContent, 10);
                    // Définition icone solid si liked //
                    const heartIconClass = liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
                    // Création chaîne avec nombre de likes et l'icône //
                    const likesWithIcon = `${currentLikes + 1} <i class="${heartIconClass}"></i>`;
                    // Mise à jour du contenu de likeCountElement avec la chaîne //
                    likeCountElement.innerHTML = likesWithIcon;
                }
                totalLikesForPhotographer += 1;
                // Affiche le compteur total dans son container //
                const totalLikesElement = document.getElementById('total-likes');
                if (totalLikesElement) {
                    totalLikesElement.textContent = totalLikesForPhotographer;
                }
            }
        }
    }
})


function displayDailyRate(photographer) {
    const dailyRateElement = document.querySelector('.box-of-price');
    if (photographer) {
        dailyRateElement.innerHTML = `${photographer._price} € / jour`;
    }
}


// Gestionnaire d'événements pour le changement d'option de tri //
dropdownWrapper.addEventListener('click', function () {
    this.classList.toggle('is-active');
});


links.forEach((element) => {
    element.addEventListener('click', function (evt) {
        span.innerHTML = evt.currentTarget.textContent;
        loadSortedPhotographerMedia(evt.currentTarget.textContent);
    });
});

//// Hero Header Photographer ////
const displayHeroHeader = async () => {
    const {photographer, medias} = await getPhotographerById();
    const heroHeader = new HeaderPhotographer(photographer);
    heroHeader.createHeaderPhotographer();
    const mediasTemplate = new PhotographerMedias(photographer, medias);
    mediasTemplate.createPhotographerMedias();
    displayLightboxMedias(mediasTemplate)
}
displayHeroHeader();





