import DataMedia  from "../models/datasMedia.js";

//// déclare une nouvelle classe nommée PhotographerMedias //
export class PhotographerMedias {
    ////  photographers et medias enfant de photographer et media //
    constructor(photographer, medias) {
        this.photographer = photographer;
        this.medias = medias;
}
/// création gallery medias //
    createPhotographerMedias() {
        const galleryContainer = document.getElementById('gallery-photografer');
        const gallery = document.createDocumentFragment(); 
        //// Utilise un DocumentFragment pour éviter les reflows coûteux //

        this.medias.forEach((media) => {
            const dataMedia = new DataMedia(media);
            const element = document.createElement('div');
            const anchor = document.createElement('a');
            const tabindex = 0;

            anchor.href = "#";
            anchor.className = "box-video active";
            anchor.setAttribute("aria-label", `media ${media._title} du photographe`);
            anchor.setAttribute("tabindex", tabindex);
            anchor.setAttribute("data-media", media._id);
            anchor.appendChild(dataMedia.renderMedia());

            element.className = "element-gallery";
            element.setAttribute("data-media-id", media._id);
            element.appendChild(anchor);

            const titleImg = document.createElement('div');
            titleImg.className = "title-img";
            titleImg.innerHTML = `
                <h3 class="txt-video">${media._title}</h3>
                <span role="group" aria-label="counter like" class="like like-count" data-likes="0">${media._likes}
                    <a href="#" aria-label="Ajouter aux favoris" class="link-heart" tabindex="${tabindex}">
                        <i class="fa-regular fa-heart" aria-label="Vous pouvez ajouter un j'aime à la video"></i>
                    </a>
                </span>
            `;
            element.appendChild(titleImg);
            gallery.appendChild(element);
        });
        galleryContainer.innerHTML = ""; 
        //// Efface le contenu existant //
        galleryContainer.appendChild(gallery); 
        //// Ajoute le fragment au DOM //
    }
}