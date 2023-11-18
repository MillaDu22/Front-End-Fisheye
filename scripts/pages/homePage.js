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


class Photographer {
    constructor(data) {
        if (Photographer.exists) {
            return Photographer.instance;
        }
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
    constructor(photographer) {
        this.photographer = photographer;
    }

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
const PhotographerApi = new Api("/data/photographers.json");

const displayCards = async () => {
    try {
        const DataPhotographer = await PhotographerApi.getData();
        const photographers = DataPhotographer.photographers;

        // DisplayCardAtIndex basé sur l'index photographes //
        for (let i = 0; i < photographers.length; i++) {
            const photographer = new Photographer(photographers[i]);
            const template = new PhotographerCard(photographer);
            const photographerCard = template.createPhotographerCard();

            // Ajout de la card du photographe correspondant à l'index spécifié //
            sectionPhotographers.appendChild(photographerCard);
        }
    } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
    }
};

// Appel displayCards qui affiche toutes les cards des photographes //
displayCards();
