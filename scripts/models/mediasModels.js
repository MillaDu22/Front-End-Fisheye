export default class Media {
    constructor( id, photographerId, title, image, video, likes, date, price) {
        if (Media.exists) {
            return Media.instance
        } 
        this._id = id
        this._photographerId = photographerId
        this._title = title
        this._image = image
        this._video = video
        this._likes = likes
        this._date = date
        this._price = price      
        
        Media.exists = true
        Media.instance = this

    }
    get id() {
        return this._id
    }
    get photographerId() {
        return this._photographerId
    }
    get title() {
        return this._title
    }
    get image() {
        return this._image
    }
    get video() {
        return this._video
    }
    get likes() {
        return this._likes
    }
    get date() {
        return this._date
    }
    get price() {
        return this._price
    }
    get user() {
        return {
            id: this._id,
            photographerId: this._photographerId,
            title: this._title,
            image: this._image,
            video: this._video,
            likes: this._likes,
            date: this._date,
            price: this._price
        }
    }
}
