//Mettre le code JavaScript lié à la page photographer.html
////////////////////////////////////////fetch page photographe//////////////////////////////////////////////////////
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
            // Recherche du photographe spécifique par son ID //
            const photographer = photographers.find(photographer => photographer.id === parseInt(photographerId));
            if (photographer) {
                containerIdPhotographer.innerHTML += `
                    <article class="article-id">
                        <h2 class="name-id">${photographer.name}</h2>
                        <h3 class="location-id">${photographer.city}, ${photographer.country}</h3>
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
    const likeIcon = event.target.closest('.fa-heart');
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

// Recherche datas photographerID //
async function loadPhotographerData(photographerId) {
    try {
        const response = await fetch('../../data/photographers.json');
        const data = await response.json();
        const photographers = data.photographers;
        const photographer = photographers.find((photographer) => photographer.id === parseInt(photographerId));
        photographerMedia = data.media.filter((media) => media.photographerId == photographer.id);

        totalLikes = calculateTotalLikesForPhotographer(photographerId, photographerMedia);
        displayDailyRate(photographerId, photographers);
        loadSortedPhotographerMedia('Popularité');
        
    } catch (error) {
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
                    <div class="box-video active">
                        <video class="video-gallery" controls>
                            <source src="../../assets/images/gallery-id/${photographerId}/${media.video}" type="video/mp4" tabindex="0">
                            Votre navigateur ne supporte pas la lecture de la vidéo.
                        </video>
                    </div>
                    <div class="title-img">
                        <h4 class="txt">${media.title}</h4>
                        <span class="like like-count">${media.likes}<i class="fa-solid fa-heart" aria-hidden="false" tabindex="0"></i></span>
                    </div>
                </div>`;
        //Si c'est une image //        
        } else if (media.image) {
            galleryContainer.innerHTML += `
                <div class="element-gallery" data-media-id="${media.id}">
                    <div class "box-image active">
                        <img src="../../assets/images/gallery-id/${photographerId}/${media.image}" class="img-gallery" alt="${media.title}" onclick="openModal();currentSlide(${index + 1})" tabindex="0">
                    </div>
                    <div class="title-img">
                        <h4 class="txt">${media.title}</h4>
                        <span class="like like-count">${media.likes}<i class="fa-solid fa-heart" aria-hidden="false" tabindex="0"></i></span>
                    </div>
                </div>`;
        }
    });
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

/////////////////////////////////////////////////////////// LightBox /////////////////////////////////////////////////////////
const slides = document.querySelector('.lightbox-image');

// Open //
function openModal() {
    document.getElementById("lightbox-bg").style.display = "flex";
}

// Close //
function closeModalLightBox() {
    const X = document.querySelector(".x-lightbox");
    X.addEventListener('click', function() {
        document.getElementById("lightbox-bg").style.display = "none";
    });
}
closeModalLightBox();

// Function slide //
let slideIndex = 1;
showSlides(slideIndex);
// Précédent et suivant //
function prevNext(n) {
    showSlides(slideIndex += n);
}
// actualisation //
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var tltleImg =document.getElementsByClassName('title-img-lightbox');
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

//////////////////////////////////////////////////////////////////////////////////////////////
