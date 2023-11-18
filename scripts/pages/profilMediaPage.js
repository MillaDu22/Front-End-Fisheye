//Mettre le code JavaScript lié à la page photographer.html
///////////////// class, models, templates //////////////////
class Api {
    constructor(url) {
        this.url = url;
    }
    async getData() {
        try {
            const response = await fetch(this.url);
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }
}


//////// Models Photographers //////////
class DataPhotographer {
    constructor(data) {
        if (DataPhotographer.exists) {
            return DataPhotographer.instance
        } 
        this._id = data.id
        this._photographerId = data.photographerId;
        this._name = data.name
        this._city = data.city
        this._country = data.country
        this._tagline = data.tagline
        this._portrait = data.portrait 
        this._alt = data.alt
        this._price = data.price       
    }
}


//////////Template Header Photographe /////////
class HeaderPhotographer {
    constructor(photographer) {
        this.photographer= photographer;
    }
    createHeaderPhotographer() {
        const heroHeader = document.querySelector('.photograph-header');
        const infos = `
        <article class="article-id">
            <h1 class="name-id">${this.photographer._name}</h1>
            <h2 class="location-id">${this.photographer._city}, ${this.photographer._country}</h2>
            <p class="title-photographer-id">${this.photographer._tagline}</p>
        </article>
        <button class="contact_button type="button" tabindex="0 " onclick="openModalForm()" name="Contact Me">Contactez-moi</button>
        <span class="container-img-id">
            <img src= "../../assets/images/photographers/${this.photographer._portrait}" class="photographer-photography-id" alt="Portrait de ${this.photographer.name}">
        </span>`;
        heroHeader.innerHTML = infos;
        return infos;
    }
}


////////// Models medias /////////
class DataMedia {
    constructor( data) {
        if (DataMedia.exists) {
            return DataMedia.instance
        } 
        this._id = data.id
        this._photographerId = data.photographerId
        this._title = data.title
        this._image = data.image
        this._video = data.video
        this._likes = data.likes
        this._date = data.date
        this._price = data.price      
    }
}


/////////// Factory Media /////////////
class MediasFactory {
    constructor(data, type) {
        if(type === 'Api') {
            return new DataMedia(data)
        } else  {
            throw 'Unknown format type'
        }
    }
}


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
                <a href="#" class="box-video active"  aria-label="Video Player" tabindex="${tabindex}"  onclick="openModal(event);currentSlide(${index + 1})" >
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
}


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
                <a href="#" class="box-video active" aria-label="Video Player" tabindex="${tabindex}" onclick="openModal(event);currentSlide(${index + 1})" >
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

    if (likeIcon) {
        event.preventDefault();
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
}); 


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
}
displayHeroHeader();

