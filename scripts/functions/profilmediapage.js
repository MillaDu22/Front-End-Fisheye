"use strict";
import { Api } from "../api/api.js";
import { DataPhotographer } from "../models/datasPhotographers.js";
import { HeaderPhotographer } from "../templates/profilPhotographer.js";
import { MediasFactory } from "../factories/mediasFactory.js";
import {PhotographerMedias} from "../templates/gallery.js";
import { displayLightboxMedias } from '../utils/lightbox.js';


// crée une nouvelle instance de la classe Api en utilisant le fichier JSON //
const photographersApi = new Api("./data/photographers.json");
// utilise l'objet URLSearchParamspour obtenir la valeur du paramètre "id" de l'URL  qui identifie un photographe spécifique //
const photographerId  = new URLSearchParams(window.location.search).get("id");


/**
 * Fonction asynchrone qui récupère les données d'un photographe spécifique en utilisant l'ID extrait de l'URL.
 * @returns {Promise<{photographer: DataPhotographer, medias: Array<MediasFactory>}>}
 */

export const getPhotographerById = async() => {
    const {photographers, media} = await photographersApi.getData();
    const photographer = photographers
    .map(photographerData => new DataPhotographer (photographerData))
    .find(photographerData => photographerData._id == photographerId); 
    const medias = media
    .map(mediaData => new MediasFactory(mediaData, 'Api')) 
    .filter(media => media._photographerId == photographerId)
    calculateTotalLikesForPhotographer(photographerId, photographerMedia);
    displayDailyRate(photographer);
    displayLightboxMedias({ photographer, medias });
    return { photographer, medias };
}

/*********************************************************************************************************/
// Fonction Filtrage //

const galleryContainer = document.getElementById('gallery-photografer');
const dropdownWrapper = document.querySelector('#dropdown-wrapper');
const links = document.querySelectorAll('.dropdown-list a');
const selected = document.querySelector('.selected');

let photographerMedia = [];

/**
 * Charge et met à jour la galerie avec les médias triés.
 * @param {string} option - L'option de tri choisie ('Popularité', 'Date', 'Titre').
 */

function loadSortedPhotographerMedia(option) {
    let sortedMedia = [...photographerMedia];
    if (option === 'Popularité') {
        sortedMedia.sort((a, b) => b._likes - a._likes);
    } else if (option === 'Date') {
        sortedMedia.sort((a, b) => new Date(b._date) - new Date(a._date));
    } else if (option === 'Titre') {
        sortedMedia.sort((a, b) => a._title.localeCompare(b._title));
    }
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


/**
 * Met à jour la galerie avec les médias triés.
 * @param {Array} sortedMedia - Tableau des médias triés.
 */

function updateGallery(sortedMedia) {
    const mediaTemplate = (media, index) => {
        const tabindex = 0;
        const mediaIs = media._image
            ? `<img src="./assets/images/gallery-id/${media._photographerId}/${media._image}" class="img-gallery" alt="${media._title}" data-index="${index}">`
            : `<video class="video-gallery" id="myVideo" controls data-index="${index}" >
                <source src="./assets/images/gallery-id/${media._photographerId}/${media._video}" type="video/mp4">
                    Votre navigateur ne supporte pas la lecture de la vidéo.
                </video>`
        return `
            <li class="element-gallery" data-media-id="${media._id}">
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
            </li>`;
    }
    galleryContainer.innerHTML = sortedMedia.map(mediaTemplate).join("");
}

// pour chargement des médias triés selon un critère spécifique //
// la méthode forEach pour itérer sur chaque élément de la liste links //
links.forEach((element) => {
    // Ajout d'un gestionnaire d'événements de clic à chaque élément de la liste // 
    element.addEventListener('click', function (event) {
        // Met à jour le contenu HTML de l'élément //
        selected.innerHTML = event.currentTarget.textContent;
        // Appel de la fonction de tri en passant le texte de l'élément //
        loadSortedPhotographerMedia(event.currentTarget.textContent);
    });
});
// Gestionnaire d'événements pour le changement d'option de tri //
dropdownWrapper.addEventListener('click', function () {
    this.classList.toggle('is-active');
});

/****************************************************************************************************/
// Compteur likes //

// Creation des élements du DOM //
// Création de l'élément div avec la classe "back-total" //
const backTotalDiv = document.createElement('div');
backTotalDiv.classList.add('back-total');

// Création de l'élément div avec la classe "all-likes-price" //
const allLikesPriceDiv = document.createElement('div');
allLikesPriceDiv.classList.add('all-likes-price');

// Création de l'élément div avec la classe "total-icon" //
const totalIconDiv = document.createElement('div');
totalIconDiv.classList.add('total-icon');

// Création de l'élément h4 avec l'ID "total-likes" //
const totalLikesH4 = document.createElement('h4');
totalLikesH4.id = 'total-likes';

// Création de l'élément icone avec les classes "fa-solid fa-heart all-likes" et l'ID "all-likes" //
const allLikesStrong = document.createElement('strong');
allLikesStrong.classList.add('fa-solid', 'fa-heart', 'all-likes');
allLikesStrong.id = 'all-likes';
allLikesStrong.setAttribute('aria-hidden', 'true');

// Ajout de l'élément h4 avec la classe "box-of-price" et l'attribut aria-label //
const boxOfPriceH4 = document.createElement('h4');
boxOfPriceH4.classList.add('box-of-price');
boxOfPriceH4.setAttribute('aria-label', 'Tarif journalier du photographe');

// Ajout des éléments créés les uns à l'intérieur des autres pour reproduire la structure souhaitée //
totalIconDiv.appendChild(totalLikesH4);
totalIconDiv.appendChild(allLikesStrong);

allLikesPriceDiv.appendChild(totalIconDiv);
allLikesPriceDiv.appendChild(boxOfPriceH4);

backTotalDiv.appendChild(allLikesPriceDiv);

// Ajout de l'élément créé au body du document //
document.body.appendChild(backTotalDiv);


// Chargement des médias du photographe //
const { medias } = await getPhotographerById();
photographerMedia = medias;


/**
 * Calcul de la somme totale des likes pour chaque photographe.
 * @param {number} photographerId - L'identifiant du photographe.
 * @param {Array} mediaData - Les données des médias.
 */

function calculateTotalLikesForPhotographer(photographerId, mediaData) {
    const likesForPhotographer = mediaData
        .filter(media => media._photographerId == photographerId)
        .reduce((total, media) => {
            return total + media._likes;
        }, 0);
    totalLikesForPhotographer = likesForPhotographer;
    const totalLikesElement = document.getElementById('total-likes');
    if (totalLikesElement) {
        totalLikesElement.textContent = totalLikesForPhotographer;
    }
}


/**
 * Gestionnaire d'événement pour le clic sur la galerie.
 * Vérifie si l'élément cliqué est un bouton de like et met à jour les compteurs de likes.
 * @param {Event} event - L'événement de clic.
 */

galleryContainer.addEventListener('click', function (event) {
    const likeIcon = event.target.closest('.link-heart');
    if (likeIcon) {
        event.preventDefault();
        event.stopPropagation(); 
        const mediaElement = likeIcon.closest('.element-gallery');
        if (mediaElement) {
            const mediaId = mediaElement.dataset.mediaId;
            if (mediaId) {
                const likeCountElement = mediaElement.querySelector('.like-count');
                const liked = true;
                if (likeCountElement) {
                    const currentLikes = parseInt(likeCountElement.textContent, 10);
                    const heartIconClass = liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
                    const likesWithIcon = `${currentLikes + 1} <i class="${heartIconClass}"></i>`;
                    likeCountElement.innerHTML = likesWithIcon;
                }
                totalLikesForPhotographer += 1;
                const totalLikesElement = document.getElementById('total-likes');
                if (totalLikesElement) {
                    totalLikesElement.textContent = totalLikesForPhotographer;
                }
            }
        }
    }
})


/**
 * Affiche le tarif quotidien du photographe.
 * @param {Object} photographer - Les données du photographe.
 */

function displayDailyRate(photographer) {
    if (photographer) {
        boxOfPriceH4.textContent = `${photographer._price} € / jour`;
    }
}

/****************************************************************************************************/


/**
 * Affiche l'en-tête du héros du photographe, y compris les médias triés par popularité.
 * Utilise des fonctions asynchrones pour récupérer les données du photographe et ses médias.
 * @returns {Promise<void>} - Une promesse qui se résout lorsque l'affichage est terminé.
 */

const displayHeroHeader = async () => {
    const {photographer, medias} = await getPhotographerById();
    const heroHeader = new HeaderPhotographer(photographer);
    heroHeader.createHeaderPhotographer();
    const mediasTemplate = new PhotographerMedias(photographer, medias);
    mediasTemplate.createPhotographerMedias();
    displayLightboxMedias(mediasTemplate)
    loadSortedPhotographerMedia('Popularité');
}
displayHeroHeader();





