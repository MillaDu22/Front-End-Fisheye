
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