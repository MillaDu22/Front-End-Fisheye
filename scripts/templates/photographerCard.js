export class PhotographerCard {
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
                    <img src="assets/images/photographers/${this.photographer._portrait}" 
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