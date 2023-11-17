//Mettre le code JavaScript lié à la page photographer.html

//////////////////////////////////////////////////////fetch pour gallery medias + select////////////////////////////////////////

/*const galleryContainer = document.getElementById('gallery-photografer');
const dropdownWrapper = document.querySelector('#dropdown-wrapper');
const links = document.querySelectorAll('.dropdown-list a');
const span = document.querySelector('.selected');
let photographerMedia = [];


// Calcul de la somme totale des likes pour chaque photographe //
let totalLikesForPhotographer;
function calculateTotalLikesForPhotographer(photographerId, mediaData) {
    const likesForPhotographer = mediaData
        .filter((media) => media.photographerId === photographerId)
        .reduce((total, media) => total + media.likes, 0);

    // Met à jour le compteur total //
    totalLikesForPhotographer = likesForPhotographer;

    // Affiche le total des likes dans son container //
    const totalLikesElement = document.getElementById('total-likes');
    if (totalLikesElement) {
        totalLikesElement.textContent = totalLikesForPhotographer;
    }
}

galleryContainer.addEventListener('click', function (event) {
    // closest méthode  pour rechercher élément ascendant (parent), vérifie si l'élément correspond au sélecteur et retourne l' élément. //
    const likeIcon = event.target.closest('.link-heart');
    // console.log('Like Icon Clicked:', likeIcon);

    if (likeIcon) {
        event.preventDefault();
        event.stopPropagation();
        const mediaElement = likeIcon.closest('.element-gallery');
        // console.log('Media Element:', mediaElement);
        if (mediaElement) {
            const mediaId = mediaElement.dataset.mediaId;
            // console.log('Media ID:', mediaId);
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
                    // Mise à jour le contenu de likeCountElement avec la chaîne //
                    likeCountElement.innerHTML = likesWithIcon;
                }
                // Met à jour le compteur total
                totalLikesForPhotographer += 1;
                //console.log('Total Likes:', totalLikesForPhotographer);

                // Affiche le compteur total dans son container //
                const totalLikesElement = document.getElementById('total-likes');
                if (totalLikesElement) {
                    totalLikesElement.textContent = totalLikesForPhotographer;
                }
            }
        }
    }
});    

// Affiche le tarif journalier à partir des données JSON //
function displayDailyRate(photographerId, photographerData) {
    const photographer = photographerData.find((photographer) => photographer.id === photographerId);
    if (photographer) {
        const dailyRateElement = document.querySelector('.box-of-price');
        dailyRateElement.innerHTML = `${photographer.price} € / jour`;
    }
}

// Factory pour créer des objets Media //
function createMedia(id, photographerId, title, image, video, likes, date) {
    return {
        id,
        photographerId,
        title,
        image,
        video,
        likes,
        date,
    };
}


// Recherche datas photographerID //
async function loadPhotographerData(photographerId) {
    try {
        const response = await fetch('../../data/photographers.json');
        const data = await response.json();
        const photographers = data.photographers;
        const photographer = photographers.find((photographer) => photographer.id === parseInt(photographerId));
        photographerMedia = data.media.filter((media) => media.photographerId == photographer.id);

        // Calcul du total des likes pour le photographe
        // eslint-disable-next-line no-undef
        totalLikes = calculateTotalLikesForPhotographer(photographerId, photographerMedia);
        // Affichage du tarif journalier
        displayDailyRate(photographerId, photographers);
        // Chargement des médias du photographe triés par popularité
        loadSortedPhotographerMedia('Popularité');

        // tableau medaia factory //
        const mediaArray = [];
        for (const media of photographerMedia) {
            const newMedia = createMedia(
                media.id,
                media.photographerId,
                media.title,
                media.image,
                media.video,
                media.likes,
                media.date
            );
            mediaArray.push(newMedia);
        }
        //console.log(mediaArray);
    } 
    catch (error) {
        console.error('Erreur au chargement des données du photographe :', error);
    }
}

// Tri avec méthode sort //
function loadSortedPhotographerMedia(option) {
    let sortedMedia = [...photographerMedia];
    if (option === 'Popularité') {
        sortedMedia.sort((a, b) => b.likes - a.likes);
        // Tri du plus populaire au moins populaire //
    } else if (option === 'Date') {
        sortedMedia.sort((a, b) => new Date(b.date) - new Date(a.date));
        // Tri du plus récent au plus ancien//
    } else if (option === 'Titre') {
        sortedMedia.sort((a, b) => a.title.localeCompare(b.title));
        // Tri par ordre alphabétique avec la méthode localeCompare qui détermine la façon dont les caractères sont triés //
    }
    let tabindexCounter = 0; 
    // Initialisation du compteur avec la valeur initiale //

    // Pour chaque media le HTML suivant //
    galleryContainer.innerHTML = '';
    sortedMedia.forEach((media, index) => {
        let tabindex = tabindexCounter;

        // Si c'est une video //
        if (media.video) {
            galleryContainer.innerHTML += `
            <div class="element-gallery" data-media-id="${media.id}">
                <a href="#" class="box-video active"  aria-label="Video Player" tabindex="${tabindex}"  onclick="openModal(event);currentSlide(${index + 1})" >
                    <video class="video-gallery" id="myVideo" controls data-index="${index}" >
                        <source src="../../assets/images/gallery-id/${photographerId}/${media.video}" type="video/mp4">
                            Votre navigateur ne supporte pas la lecture de la vidéo.
                    </video>
                </a>
                <div class="title-img">
                    <h3 class="txt-video" data-media-title="${media.title}">${media.title}</h3>
                    <span class="like like-count" data-likes="0">${media.likes}
                        <a href="#" aria-label="Ajouter aux favoris" class="link-heart" tabindex="${tabindex}">
                            <i class="fa-regular fa-heart" aria-label="Vous pouvez ajouter un j'aime à la video"></i>
                        </a>
                    </span>
                </div>
            </div>`;
        //Si c'est une image //        
        } else if (media.image) {
            galleryContainer.innerHTML += `
            <div class="element-gallery" data-media-id="${media.id}">
                <a href="#" class "box-image active" tabindex="${tabindex}" onclick="openModal(event);currentSlide(${index + 1})">
                    <img src="../../assets/images/gallery-id/${photographerId}/${media.image}" class="img-gallery" alt="${media.title}" data-index="${index}">
                </a>
                <div class="title-img">
                    <h4 class="txt" data-media-title="${media.title}">${media.title}</h4>
                    <span class="like like-count" data-likes="0">${media.likes}
                        <a href ="#" aria-label="Ajouter aux favoris" class="link-heart" tabindex="${tabindex}">
                            <i class="fa-regular fa-heart" aria-label="Vous pouvez ajouter un j'aime à la photographie"></i>
                        </a>
                    </span>
                </div>
            </div>`;
        }
    })
}


function getPhotographerIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');

    if (idParam) {
        return parseInt(idParam);
    } else {
        return null;
    }
}

// Si photographerID trouvé média affichés par popularité par défaut //
const photographerId = getPhotographerIdFromURL();
if (photographerId !== null) {
    // Console.log('ID du photographe depuis URL :', photographerId); //
    loadPhotographerData(photographerId)
        .then(() => {
            loadSortedPhotographerMedia('Popularité'); // Affichage par popularité par défaut //
        })
        .catch((error) => {
            console.error('Erreur au chargement des médias du photographe :', error);
        });
    } else {
    console.log('ID non trouvé ou invalide.');
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
*/

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

class MediasFactory {
    constructor(data, type) {
        if(type === 'Api') {
            return new DataMedia(data)
        } else  {
            throw 'Unknown format type'
        }
    }
}
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
                const mediaIs = media._video
                ? `<video class="video-gallery" id="myVideo" controls data-index="${index}" >
                    <source src="../../assets/images/gallery-id/${this.photographer._id}/${media._video}" type="video/mp4">
                        Votre navigateur ne supporte pas la lecture de la vidéo.
                    </video>`
                : `<img src="../../assets/images/gallery-id/${this.photographer._id}/${media._image}" class="img-gallery" alt="${media._title}" data-index="${index}">`
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
        console.log("Medias:", this.medias); 
        console.log("HTML généré:", gallery);
        galleryContainer.innerHTML = gallery
        return gallery;
    }
}

const photographersApi = new Api("../../data/photographers.json");
const photographerId  = new URLSearchParams(window.location.search).get("id");
if (photographerId) {
    const imagePath = "../../assets/images/gallery-id/${this.photographer._id}/${media.image}";
    console.log(imagePath);
} else {
    console.error("photographerId is undefined");
}

export const getPhotographerById = async() => {
    const {photographers, media} = await photographersApi.getData();
    const photographer = photographers
    .map(photographerData => new DataPhotographer (photographerData))
    .find(photographerData => photographerData._id == photographerId);
    const medias = media
    .map(media => new MediasFactory(media, 'Api')) 
    .filter(media => media._photographerId == photographerId)


return { photographer, medias };


    
}
const displayHeroHeader = async () => {
    const {photographer, medias} = await getPhotographerById();
    const heroHeader = new HeaderPhotographer(photographer);
    heroHeader.createHeaderPhotographer();
    const mediasTemplate = new PhotographerMedias(photographer, medias);
    mediasTemplate.createPhotographerMedias();

}
displayHeroHeader();

