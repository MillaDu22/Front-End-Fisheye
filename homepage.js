//// Encapsulation API ///
class Api {
    //// Le constructeur de la classe prend l'URL en paramètre et l'attribue à la propriété url de l'instance de la classe //
    constructor(url) {
        this.url = url;
    }
    /// méthode asynchrone qui sera appelée pour récupérer des données à partir de l'URL spécifiée //
    async getData() {
        //// structure try-catch pour gérer les erreurs potentielles pendant l'exécution asynchrone de la méthode //
        try {
            const response = await fetch(this.url);
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }
}


class Photographer {
    //// constructeur prend un objet data en paramètre //
    constructor(data) {
        //// vérifie s'il existe déjà une instance de la classe Photographer. Si oui, elle retourne l'instance (Singleton) //
        if (Photographer.exists) {
            return Photographer.instance;
        }
        //// Si aucune instance de la classe n'existe, les propriétés de l'objet data sont utilisées pour initialiser les propriétés de l'instance de la classe //
        this._id = data.id;
        this._name = data.name;
        this._city = data.city;
        this._country = data.country;
        this._tagline = data.tagline;
        this._portrait = data.portrait;
        this._alt = data.alt;
        this._price = data.price;
    }
}


class PhotographerCard {
    //// le constructeur stocke l'objet photographer de l'instance //
    constructor(photographer) {
        this.photographer = photographer;
    }
    //// crée le contenu HTML pour représenter un photographe //
    createPhotographerCard() {
        const article = document.createElement('article');
        article.classList.add('photographer-container');

        article.innerHTML = `
            <a href="photographer.html?id=${this.photographer._id}" 
                role="link" 
                name="vers page de ${this.photographer._name}" 
                aria-roledescription ="bouton de page photographers"
                class="link-focus">
                <span class="container-img">
                    <img src="/assets/images/photographers/${this.photographer._portrait}" 
                        class="photographer-photography" 
                        alt="${this.photographer._alt}">
                </span>
                <h2 class="name" id="titre">${this.photographer._name}</h2>
            </a>
            <h3 class="location">${this.photographer._city}, ${this.photographer._country}</h3>
            <p class="title-photographer">${this.photographer._tagline}</p>
            <p class="price">${this.photographer._price}€/jour</p>
        `;
        return article;
    }
}


const sectionPhotographers = document.querySelector('.photographer-section');
//// Crée une instance de la classe Api //
const PhotographerApi = new Api("./data/photographers.json");
//// fonction asynchrone qui affiche les cartes de photographes //
const displayCards = async () => {
    try {
        ////méthode getData de l'objet PhotographerApi pour récupération données photographes //
        const DataPhotographer = await PhotographerApi.getData();
        ///// Extraction liste des photographes //
        const photographers = DataPhotographer.photographers;

        //// boucle pour itérer sur chaque photographe dans la liste //
        for (let i = 0; i < photographers.length; i++) {
            //// Crée une instance de classe Photographer avec les données d'un photographe spécifique //
            const photographer = new Photographer(photographers[i]);
            //// Crée une instance de classe PhotographerCard avec l'objet Photographer //
            const template = new PhotographerCard(photographer);
            ////  crée la carte du photographe //
            const photographerCard = template.createPhotographerCard();

            //// Ajout de la card du photographe dans la section photographes //
            sectionPhotographers.appendChild(photographerCard);
        }
    } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
    }
};

// Appel displayCards qui affiche toutes les cards des photographes //
displayCards();
