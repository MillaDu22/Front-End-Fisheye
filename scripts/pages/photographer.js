//Mettre le code JavaScript lié à la page photographer.html

////////////////////////////////////////fetch page photographe//////////////////////////////////////////////////////
// Factory pour créer des objets Photographer
function createPhotographer(id, name, city, country, tagline, portrait) {
    return {
        id,
        name,
        city,
        country,
        tagline,
        portrait,
    };
}
document.addEventListener("DOMContentLoaded", function () {
    const urlDatasPage = ("../../data/photographers.json");
    const containerIdPhotographer = document.getElementById('photografer-header'); 
    // Récupération de l'ID du photographe depuis l'URL //
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get("id"); // l'ID est passé en tant que paramètre "id" dans l'URL //
    
    // Fonction pour effectuer la requête Fetch et insérer le nom du photographe dans le formulaire //
    const insertPhotographerName = (photographer) => {
        const h2Element = document.querySelector('.p-contact');
        h2Element.innerHTML = `Contactez-moi</br> ${photographer.name}`;
    };
    const getPhotographerById = (photographerId) => {
        fetch(urlDatasPage)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const photographers = data.photographers;


            // Création d'un tableau pour stocker les objets Photographer factory //
            const photographerObjects = [];
            // Utilisation d'une boucle for pour créer les objets Photographer
            for (let i = 0; i < photographers.length; i++) {
                const photographer = photographers[i];
                const photographerObject = createPhotographer(photographer.id, photographer.name, photographer.city, photographer.country, photographer.tagline, photographer.portrait);
                photographerObjects.push(photographerObject);
            }
            // Afficher les objets Photographer dans la console
            for (let i = 0; i < photographerObjects.length; i++) {
                //console.log(photographerObjects[i]);
            }

            // Recherche du photographe spécifique par son ID //
            const photographer = photographers.find(photographer => photographer.id === parseInt(photographerId));
            if (photographer) {
                containerIdPhotographer.innerHTML += `
                    <article class="article-id">
                        <h1 class="name-id">${photographer.name}</h1>
                        <h2 class="location-id">${photographer.city}, ${photographer.country}</h2>
                        <p class="title-photographer-id">${photographer.tagline}</p>
                    </article>
                    <button class="contact_button" tabindex="0" onclick="openModalForm()">Contactez-moi</button>
                    <span class="container-img-id">
                        <img src= "../../assets/images/photographers/${photographer.portrait}" class="photographer-photography-id" alt="Portrait de ${photographer.name}">
                    </span>`;
                    // Insére le nom du photographe dans le formulaire //
                    insertPhotographerName(photographer);
            } else {
            // Si aucun photographe n'est trouvé //
            containerIdPhotographer.innerHTML = "Aucun photographe trouvé.";
            }
        })
        .catch(function (error) {
            console.error('Erreur du chargement des données :', error);
        });
    };
getPhotographerById(photographerId);
});

//////////////////////////////////////////////////////fetch pour gallery medias + select////////////////////////////////////////

const galleryContainer = document.getElementById('gallery-photografer');
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
    const likeIcon = event.target.closest('.fa-regular');
        if (likeIcon) {
        const mediaElement = likeIcon.closest('.element-gallery');
        if (mediaElement) {
            const mediaId = mediaElement.dataset.mediaId;
            if (mediaId) {
                // Met à jour le compteur individuel
                const likeCountElement = mediaElement.querySelector('.like-count');
                if (likeCountElement) {
                    const currentLikes = parseInt(likeCountElement.textContent, 10);
                    likeCountElement.textContent = currentLikes + 1;
                }

                // Met à jour le compteur total
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

        // eslint-disable-next-line no-undef
        totalLikes = calculateTotalLikesForPhotographer(photographerId, photographerMedia);
        displayDailyRate(photographerId, photographers);
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
    // Pour chaque media le HTML suivant //
    galleryContainer.innerHTML = '';
    sortedMedia.forEach((media, index) => {
        // Si c'est une video //
        if (media.video) {
            galleryContainer.innerHTML += `
                <div class="element-gallery" data-media-id="${media.id}">
                    <div class="box-video active" role="group" aria-label="Video Player">
                        <video class="video-gallery" id="myVideo" controls currentSlide(${index + 1})">
                            <source src="../../assets/images/gallery-id/${photographerId}/${media.video}" type="video/mp4" tabindex="0">
                                Votre navigateur ne supporte pas la lecture de la vidéo.
                        </video>
                    </div>
                    <div class="title-img">
                        <h3 class="txt-video">${media.title}</h3>
                        <span class="like like-count">${media.likes}<i class="fa-regular fa-heart" aria-hidden="false" tabindex="0"></i></span>
                    </div>
                </div>`;
        //Si c'est une image //        
        } else if (media.image) {
            galleryContainer.innerHTML += `
                <div class="element-gallery" data-media-id="${media.id}">
                    <div class "box-image active">
                        <img src="../../assets/images/gallery-id/${photographerId}/${media.image}" class="img-gallery" alt="${media.title}" onclick ="openModal();currentSlide(${index + 1})" tabindex="0">
                    </div>
                    <div class="title-img">
                        <h4 class="txt">${media.title}</h4>
                        <span class="like like-count">${media.likes}<i class="fa-regular fa-heart" aria-hidden="false" tabindex="0"></i></span>
                    </div>
                </div>`;
        }
        document.getElementById("myVideo").addEventListener("click", function() {
            openModal();
        });
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
            loadSortedPhotographerMedia('Popularité'); // Affichage par popularité par défaut
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

/////////////////////////////////////////// LightBox /////////////////////////////////////////////////////////

function openModal(media) {
    const lightboxBg = document.getElementById('lightbox-bg');
    const lightboxImage = document.getElementById('modale');
    lightboxBg.style.display = 'block';
    lightboxImage.innerHTML = event.target.outerHTML;

    // Si l'élément cliqué est une vidéo
    if (media.video) {
        lightboxImage.innerHTML = `
            <video class="video-modal" controls>
                <source src="../../assets/images/gallery-id/${photographerId}/${media.video}" type="video/mp4">
                Votre navigateur ne supporte pas la lecture de la vidéo.
            </video>
            <div class="media-title">${media.title}</div>`;
    } 
}
function closeModal() {
    const lightboxBg = document.getElementById('lightbox-bg');
    lightboxBg.style.display = 'none';
}

// Affiche une image spécifique dans la lightbox. Avec argument n qui représente le numéro de l'image //
/*function currentSlide(n) {
    const lightboxImage = document.getElementById('modale');
    const images = document.querySelectorAll('.element-gallery img');
    if (n >= 1 && n <= images.length) {
        lightboxImage.innerHTML = images[n - 1].outerHTML;
    }
}*/

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

    // Affiche l'image suivante //
    lightboxImage.innerHTML = images[nextIndex].outerHTML;
}

// Ajout du gestionnaire d'événements pour le bouton de fermeture //
document.querySelector('.x-lightbox').addEventListener('click', closeModal);

// Ajout du gestionnaire d'événements pour les flèches de navigation //
document.querySelector('.arrow-left').addEventListener('click', () => prevNext(-1));
document.querySelector('.arrow-right').addEventListener('click', () => prevNext(1));

////////////////////////////////////////////////////////////////////////////////////////////



