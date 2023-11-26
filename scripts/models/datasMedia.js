export default class DataMedia {
    constructor(data) {
        if (DataMedia.exists) {
            //// Vérifie si une instance existe déjà //
            return DataMedia.instance;
        } 
        //// Si aucune instance n'existe, initialise les propriétés de l'instance avec les données spécifiées //
        this._id = data.id;
        this._photographerId = data.photographerId;
        this._title = data.title;
        this._image = data.image;
        this._video = data.video;
        this._likes = data.likes;
        this._date = data.date;
        DataMedia.instance = this;
        this.media = data; 
        //// Stocke l'objet media dans la propriété de classe media //

    }


    renderMedia() {
        const fragment = document.createDocumentFragment(); 
        if (this.media._image) {
        const img = document.createElement('img');
                    img.src = './assets/images/gallery-id/' + this.media._photographerId + '/' + this.media._image;
                    img.alt = this.media._title;
                    img.classList.add('img-gallery');
                    img.dataset.index = this.media._id;
                    fragment.appendChild(img);
                } 
                else if (this.media._video) {
                    const video = document.createElement('video');
                    video.src = './assets/images/gallery-id/' + this.media._photographerId + '/' + this.media._video;
                    video.type = 'video/mp4';
                    video.classList.add('video-gallery');
                    video.id = 'myVideo';
                    video.controls = true;
                    video.dataset.index = this.media._id;
                    const source = document.createElement('source');
                    source.src = './assets/images/gallery-id/' + this.media._photographerId + '/' + this.media._video;
                    source.type = 'video/mp4';
                    video.appendChild(source);
                    fragment.appendChild(video);
                }
        return fragment;
    }
}





