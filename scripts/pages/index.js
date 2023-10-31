/*async function getPhotographers() {
// Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
// mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
let photographers = [
    {
        "name": "Ma data test",
        "id": 1,
        "city": "Paris",
        "country": "France",
        "tagline": "Ceci est ma data test",
        "price": 400,
        "portrait": "account.png"
    },
    {
        "name": "Autre data test",
        "id": 2,
        "city": "Londres",
        "country": "UK",
        "tagline": "Ceci est ma data test 2",
        "price": 500,
        "portrait": "account.png"
    },
]
// et bien retourner le tableau photographers seulement une fois récupéré
return ({
    photographers: [...photographers, ...photographers, ...photographers]})
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();*/

/*************************************** Fetch datas photographers HomePage***********************************/
const urlDatas = ("../../data/photographers.json");
const sectionPhotographers = document.getElementById("section-photographers");

const getPhotographers = () => {
    fetch(urlDatas)
    .then(function (response) {
        return response.json()
    })
    .then(function (data){
        console.log(data)
        const photographers = data.photographers;
        photographers.forEach(function (photographer) {
            const imagePath = `../../assets/images/photographers/${photographer.portrait}`;
            sectionPhotographers.innerHTML += `
            <article class="photographer-container">
                <a href="./photographer.html" class="link-focus" aria-label="cette carte est un lien vers la page de ${photographer.name}" tabindex="0">
                    <span class="container-img">
                        <img src="${imagePath}" class="photographer-photography" alt="portrait du photographe">
                    </span>
                    <h2 class="name">${photographer.name}</h2>
                </a>
                <h3 class="location">${photographer.city}, ${photographer.country}</h3>
                <p class="title-photographer">${photographer.tagline}</p>
                <p class="price">${photographer.price}€/jour</p>
            </article>`;
        });
    })
}
getPhotographers()




