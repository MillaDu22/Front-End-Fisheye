
export default class DataMedia {
    constructor( data) {
        if (DataMedia.exists) {
            return DataMedia.instance
        } 
        this._id = data.id
        this._photographerId = data.photographerId
        this._title = data.title
        this._image = data.image
        this._video = data.video
        this._likes = data.likes
        this._date = data.date
        this._price = data.price      
        
        DataMedia.exists = true
        DataMedia.instance = this

    }
    get id() {
        return this._media.id
    }
    get photographerId() {
        return this._media.photographerId
    }
    get title() {
        return this._media.title
    }
    get image() {
        return `/assets/images/gallery-id/${this._photographerId}/${this._media.image}`
    }
    get video() {
        return  `/assets/images/gallery-id/${this._photographerId}/${this._media.video}`

    }
    get likes() {
        return this._media.likes
    }
    get date() {
        return this._media.date
    }
    get price() {
        return this._media.price
    }
    get DataMedia() {
        return {
            id: this._media.id,
            photographerId: this._media.photographerId,
            title: this._tmedia.itle,
            image: this._media.image,
            video: this._media.video,
            likes: this._media.likes,
            date: this._media.date,
            price: this._media.price
        }
    }
}
