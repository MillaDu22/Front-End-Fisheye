export default class PhotographerMedias {
    constructor(photographer, medias) {
        this.photographer = photographer;
        this.medias = medias;
    }

    createPhotographerMedias() {
        const galleryContainer = document.getElementById('gallery-photografer');
        // Si c'est une video //
        const gallery =`
            <article class ="content-gallery">
            ${this.medias.map((media, index) => {
                const tabindex = 0;
                const mediaIs = media._video
                ? `<video class="video-gallery" id="myVideo" controls data-index="${index}" >
                    <source src="../../assets/images/gallery-id/${this.photographer._id}/${media._video}" type="video/mp4">
                        Votre navigateur ne supporte pas la lecture de la vidéo.
                    </video>`
                : `<img src="../../assets/images/gallery-id/${this.photographer._id}/${media._image}" class="img-gallery" alt="${media._title}" data-index="${index}">`
                return`
                <div class="element-gallery" data-media-id="${media._id}">
                    <a href="#" class="box-video active"  aria-label="Video Player" tabindex="${tabindex}"  onclick="openModal(event);currentSlide(${index + 1})" >
                        ${mediaIs}
                    </a>
                    <div class="title-img">
                        <h3 class="txt-video">${media._title}</h3>
                        <span role="group" aria-label="counter like" class="like like-count" data-likes="0">${media._likes}
                            <a href="#" aria-label="Ajouter aux favoris" class="link-heart" tabindex="${tabindex}">
                                <i class="fa-regular fa-heart" aria-label="Vous pouvez ajouter un j'aime à la video"></i>
                            </a>
                        </span>
                    </div>
                </div>`
        }).join("")}
        </article>`;
        console.log("Medias:", this.medias); 
        console.log("HTML généré:", gallery);
        galleryContainer.innerHTML = gallery
        return gallery;
    }
}