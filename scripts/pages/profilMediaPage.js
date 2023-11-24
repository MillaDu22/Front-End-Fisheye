//Mettre le code JavaScript lié à la page photographer.html
import { Api } from "../api/api.js";
import { DataPhotographer } from "../models/datasPhotographers.js";
import { HeaderPhotographer } from "../templates/profilPhotographer.js";
import { MediasFactory } from "../factories/mediasFactory.js";
import { displayLightboxMedias } from '../utils/lightbox.js';
import {PhotographerMedias} from "../templates/gallery.js";


////////////// récupération des medias à partir du json /////////
///// crée une nouvelle instance de la classe Apien utilisant le fichier JSON //
const photographersApi = new Api("../../data/photographers.json");
//// utilise l'objet URLSearchParamspour obtenir la valeur du paramètre "id" de l'URL  qui identifie un photographe spécifique //
const photographerId  = new URLSearchParams(window.location.search).get("id");
//// exporte une fonction asynchrone appelée getPhotographerById. Cette fonction récupére les données d'un photographe spécifique en utilisant l'ID extrait de l'URL //
export const getPhotographerById = async() => {
    //// utilise l'instance de l'API pour obtenir les données des photographies et des médias //
    const {photographers, media} = await photographersApi.getData();
    const photographer = photographers
    //// crée un objet DataPhotographerà partir des données des photographes, et recherche le photographe spécifique dont l'ID correspond //
    .map(photographerData => new DataPhotographer (photographerData))
    .find(photographerData => photographerData._id == photographerId); 
    const medias = media
    //// crée un tableau d'objets MediasFactory à partir des données des médias, et filtre ces médias pour inclure uniquement ceux du photographe spécifique //
    .map(mediaData => new MediasFactory(mediaData, 'Api')) 
    .filter(media => media._photographerId == photographerId)
    // Appel Calcul du total des likes pour le photographe //
    calculateTotalLikesForPhotographer(photographerId, photographerMedia);
    // Appel Affichage du tarif journalier //
    displayDailyRate(photographer);
     // Appel Affichage lightbox //
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


// Ajout écouteur d'événement pour preventDefault() sur le filtrage //
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

    // Evènements clavier à dropdownWrapper (filtrage) //
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


//// pour chargement des médias triés selon un critère spécifique //
///// la méthode forEachpour itérer sur chaque élément de la liste links //
links.forEach((element) => {
    //// Ajout d'un gestionnaire d'événements de clic à chaque élément de la liste 
    element.addEventListener('click', function (evt) {
        //// Met à jour le contenu HTML de l'élément //
        span.innerHTML = evt.currentTarget.textContent;
        //// Appel de la fonction de tri en passant le texte de l'élément //
        loadSortedPhotographerMedia(evt.currentTarget.textContent);
    });
});



// Chargement des médias du photographe //
const { medias } = await getPhotographerById();
photographerMedia = medias;


////////// Compteur likes //////////////
// Calcul de la somme totale des likes pour chaque photographe //
//// prend deux paramètres l'identifiant du photographe et les données des médias //
function calculateTotalLikesForPhotographer(photographerId, mediaData) {
    const likesForPhotographer = mediaData
    //// filtre les médias qui appartiennent au photographe donné, et reduce ajoute les likes aux medias.
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
    // closest méthode pour rechercher élément ascendant (parent) //
    //// utilise la méthode closest pour déterminer si l'élément cliqué est un bouton de like //
    const likeIcon = event.target.closest('.link-heart');
    if (likeIcon) {
        /// retrait des comportements par default //
        event.preventDefault();
        event.stopPropagation(); 
        //// trouve l'élément parent de la classe .element-gallery pour obtenir les info sur le média, et met à jour le compteur de likes individuel //
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
                //// met à jour le compteur total de likes pour le photographe //
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
    //// Vérifie si l'objet photographer est fourni en tant que paramètre et met à jour le HTML en chaîne de texte //
    if (photographer) {
        dailyRateElement.innerHTML = `${photographer._price} € / jour`;
    }
}


// Gestionnaire d'événements pour le changement d'option de tri //
dropdownWrapper.addEventListener('click', function () {
    this.classList.toggle('is-active');
});


//// Hero Header Photographer ////
//// fonction fléchée asynchrone //
const displayHeroHeader = async () => {
    /// Utilise await pour attendre la résolution de la promesse retournée par la fonction asynchrone //
    const {photographer, medias} = await getPhotographerById();
    //// nouvelle instance de la classe HeaderPhotographer avec les données du photographe //
    const heroHeader = new HeaderPhotographer(photographer);
    //// affiche l'en-tête du photographe //
    heroHeader.createHeaderPhotographer();
    //// Appel méthode createPhotographerMedias()de l'objet mediasTemplate, crée et affiche les médias du photographe //
    const mediasTemplate = new PhotographerMedias(photographer, medias);
    mediasTemplate.createPhotographerMedias();
    ////Appel fonction displayLightboxMedias()avec objet mediasTemplate en argument pour afficher les médias du photographe dans une lightbox //
    displayLightboxMedias(mediasTemplate)
    //// Chargement des médias triés par popularité par défaut //
    loadSortedPhotographerMedia('Popularité');
}
//// Appel fonction displayHeroHeader //
displayHeroHeader();





