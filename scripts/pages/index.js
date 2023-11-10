/* Fetch datas photographers HomePage avec innerHTML*/
const urlDatas = ('../../data/photographers.json');
const sectionPhotographers = document.getElementById('section-photographers');

const getPhotographers = () => {
    fetch(urlDatas)
        .then(function(response) {
        return response.json();
        })
        .then(function(data) {
        // console.log(data)
        const photographers = data.photographers;
        photographers.forEach(function(photographer) {
            const imagePath =
            `../../assets/images/photographers/${photographer.portrait}`;
            const photographerPageLink =
            `./photographer.html?id=${photographer.id}`;
            sectionPhotographers.innerHTML += `
            <article class="photographer-container">
                <a href="${photographerPageLink}" 
                class="link-focus" 
                aria-roledescription="bouton de page photographers">
                    <span class="container-img">
                        <img src="${imagePath}" 
                        class="photographer-photography" 
                        alt="${photographer.alt}" >
                    </span>
                    <h2 class="name" id="titre>${photographer.name}</h2>
                </a>
                <h3 class="location">${photographer.city}, 
                ${photographer.country}</h3>
                <p class="title-photographer">${photographer.tagline}</p>
                <p class="price">${photographer.price}€/jour</p>
            </article>`;
        });
    });
};
getPhotographers();


