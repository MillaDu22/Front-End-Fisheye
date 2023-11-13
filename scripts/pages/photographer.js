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
        const h1Element = document.querySelector('.p-contact');
        h1Element.innerHTML = `Contactez-moi</br> ${photographer.name}`;
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
                    <button class="contact_button type="button" tabindex="0 " onclick="openModalForm()" name="Contact Me">Contactez-moi</button>
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
    const likeIcon = event.target.closest('.link-heart');
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

    // Gestion Tabindex //
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
                    <a href="#" class="box-video active"  aria-label="Video Player" tabindex="${tabindex}" onclick="openModal(event);currentSlide(${index + 1})" >
                        <video class="video-gallery" id="myVideo" controls onclick="openModal(event);currentSlide(${index + 1})">
                            <source src="../../assets/images/gallery-id/${photographerId}/${media.video}" type="video/mp4">
                                Votre navigateur ne supporte pas la lecture de la vidéo.
                        </video>
                    </a>
                    <div class="title-img">
                        <h3 class="txt-video">${media.title}</h3>
                        <span class="like like-count">${media.likes}<a href="#" aria-label="Ajouter aux favoris" class="link-heart" tabindex="${tabindex}"><i class="fa-regular fa-heart" aria-hidden="false" aria-label="Vous pouvez ajouter un j'aime à la video"></i></a></span>
                    </div>
                </div>`;

        //Si c'est une image //        
        } else if (media.image) {
            galleryContainer.innerHTML += `
                <div class="element-gallery" data-media-id="${media.id}">
                    <a href="#" class "box-image active" tabindex="${tabindex}" onclick="openModal(event);currentSlide(${index + 1})">
                        <img src="../../assets/images/gallery-id/${photographerId}/${media.image}" class="img-gallery" alt="${media.title}">
                    </a>
                    <div class="title-img">
                        <h4 class="txt">${media.title}</h4>
                        <span class="like like-count">${media.likes}<a href ="#" aria-label="Ajouter aux favoris" class="link-heart" tabindex="${tabindex}"><i class="fa-regular fa-heart" aria-hidden="false" aria-label="Vous pouvez ajouter un j'aime à la photographie"></i></a></span>
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

/////////////////////////////////////////// LightBox /////////////////////////////////////////////////////////
const arrowLeft = document.querySelector('.arrow-left');
function openModal(event) {
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

function closeModal() {
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

    // Affiche l'image suivante //
    lightboxImage.innerHTML = images[nextIndex].outerHTML;
}

// Ajout du gestionnaire d'événements pour le bouton de fermeture //
document.querySelector('.x-lightbox').addEventListener('click', closeModal);

// Ajout du gestionnaire d'événements pour les flèches de navigation //
document.querySelector('.arrow-left').addEventListener('click', () => prevNext(-1));
document.querySelector('.arrow-right').addEventListener('click', () => prevNext(1));



////////////////////////////////////////////////////////////////////////////////////////////

