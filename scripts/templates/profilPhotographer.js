export class HeaderPhotographer {
    constructor(photographer) {
        // Initialise la propriété photographer avec l'objet photographer passé en paramètre //
        this.photographer= photographer;
    }

    createHeaderPhotographer() {
        const heroHeader = document.querySelector('.photograph-header');
        //// chargement du nom dans le formulaire //
        const contactName = document.querySelector ('.contact-name');
        contactName.textContent = this.photographer._name;
        //// Structure HTML contenant les infos du photographe //
        const infos = `
        <article class="article-id">
            <h1 class="name-id">${this.photographer._name}</h1>
            <h2 class="location-id">${this.photographer._city}, ${this.photographer._country}</h2>
            <p class="title-photographer-id">${this.photographer._tagline}</p>
        </article>
        <button class="contact_button type="button" tabindex="0 " onclick="openModalForm()" name="Contact Me">Contactez-moi</button>
        <span class="container-img-id">
            <img src= "assets/images/photographers/${this.photographer._portrait}" class="photographer-photography-id" alt="Portrait de ${this.photographer.name}">
        </span>`;
        heroHeader.innerHTML = infos;
        return infos
    }
}
