
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

class Photographer{
    constructor( data) {
        if (Photographer.exists) {
            return Photographer.instance
        } 
        this._id = data.id
        this._name = data.name
        this._city = data.city
        this._country = data.country
        this._tagline = data.tagline
        this._portrait = data.portrait 
        this._alt = data.alt
        this._price = data.price       
    }
}

//// Version innerHTML /////
class PhotographerCard {
    constructor( photographer ) {
        this.photographer = photographer;
    }
    createPhotographerCard() {
    const sectionPhotographers = document.querySelector('.photographer-section');   

    const photographerCard =`
    <article class="photographer-container">
        <a href="photogarpher.html?id=${this.photographer._id}" 
        role ="link" 
        aria-label="vers page de ${this.photographer._name}"  
        class="link-focus">
            <span class="container-img">
                <img src="/assets/images/photographers/${this.photographer._portrait}" 
                class="photographer-photography" 
                alt="${this.photographer._alt}" >
            </span>
            <h2 class="name" id="titre">${this.photographer._name}</h2>
        </a>
        <h3 class="location">${this.photographer._city}, ${this.photographer._country}</h3>
        <p class="title-photographer">${this.photographer._tagline}</p>
        <p class="price">${this.photographer._price}€/jour</p>
    </article>`;
    sectionPhotographers.innerHTML += photographerCard;
    return sectionPhotographers;
    }
}

const sectionPhotographers = document.querySelector('.photographer-section');
const PhotographerApi = new Api("/data/photographers.json");


const displayCards = async() => {
    const DataPhotographer = await PhotographerApi.getData();
    const photographers = DataPhotographer.photographers;
    photographers
    // Ici, je transforme mon tableau de données en un tableau de class Photographer
    .map(photographer => new  Photographer(photographer))
    .forEach(photographer => {

        const Template = new PhotographerCard(photographer);
        const photographerCard = Template.createPhotographerCard();
        sectionPhotographers.appendChild(photographerCard.firstChild);       
    });
};
displayCards();


