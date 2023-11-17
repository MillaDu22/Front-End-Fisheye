export default class DataPhotographer {
    constructor( data) {
        if (DataPhotographer.exists) {
            return DataPhotographer.instance
        } 
        this._id = data.id
        this._name = data.name
        this._city = data.city
        this._country = data.country
        this._tagline = data.tagline
        this._portrait = data.portrait 
        this._alt = data.alt
        this._price = data.price       
    }
}
