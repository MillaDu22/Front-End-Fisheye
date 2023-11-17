/////// Version createElement /////

const urlDatas = "../../data/photographers.json";
const sectionPhotographers = document.getElementById("section-photographers");

function photographerTemplate(data) {
    const { name, portrait, id, city, country, tagline, price } = data;

    const imagePath = `../../assets/images/photographers/${portrait}`;
    const photographerPageLink = `./photographer.html?id=${id}`;
    // Création des éléments, attribution classList et attributs //
    const article = document.createElement('article');
    article.classList.add('photographer-container');

    const link = document.createElement('a');
    link.classList.add('link-focus');
    link.href = photographerPageLink;
    link.setAttribute('aria-roledescription', 'bouton de page photographers');

    const containerImg = document.createElement('span');
    containerImg.classList.add('container-img');

    const img = document.createElement('img');
    img.classList.add('photographer-photography');
    img.src = imagePath;
    img.alt = `Photographie de ${name}`;

    const h2 = document.createElement('h2');
    h2.classList.add('name');
    h2.textContent = name;

    const h3 = document.createElement('h3');
    h3.classList.add('location');
    h3.textContent = `${city}, ${country}`;

    const p1 = document.createElement('p');
    p1.classList.add('title-photographer');
    p1.textContent = tagline;

    const p2 = document.createElement('p');
    p2.classList.add('price');
    p2.textContent = `${price}€/jour`;

    containerImg.appendChild(img);
    link.appendChild(containerImg);
    link.appendChild(h2);
    article.appendChild(link);
    article.appendChild(h3);
    article.appendChild(p1);
    article.appendChild(p2);

    return article;
}
// fetch pour obtenir les datas photographes dans le fichier json //
function getPhotographers() {
    fetch(urlDatas)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        //console.log(data);
        const photographers = data.photographers;
        //console.log(photographers);
        for (let i = 0; i < photographers.length; i++) {
            const photographer = photographers[i];
            const photographerElement = photographerTemplate(photographer);
            sectionPhotographers.appendChild(photographerElement);
        }
    });
}

getPhotographers();



//// Version innerHTML /////
export default class PhotographerCard {
    constructor( photographer ) {
        this.photographer = photographer;
    }
    createPhotographerCard() {
    const sectionPhotographers = document.querySelector('.photographer-section');   
    const photographerCard =`
    <article class="photographer-container">
        <a href="photogarpher.html?id=${this.photographer.id}" 
        role ="link" 
        aria-label="vers page de ${this.photographer.name}"  
        class="link-focus">
            <span class="container-img">
                <img src="/assets/images/photographer/${this.photographer.name}" 
                class="photographer-photography" 
                alt="${this.photographer.alt}" >
            </span>
            <h2 class="name" id="titre>${this.photographer.name}</h2>
        </a>
        <h3 class="location">${this.photographer.city}, 
        ${this.photographer.country}</h3>
        <p class="title-photographer">${this.photographer.tagline}</p>
        <p class="price">${this.photographer.price}€/jour</p>
    </article>`;
    sectionPhotographers.innerHTML = photographerCard;
    return sectionPhotographers;
    }
}




