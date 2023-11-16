export default class Photographer {
    constructor( id, name, city, country, tagline, portrait, alt, price) {
        if (Photographer.exists) {
            return Photographer.instance
        } 
        this._id = id
        this._name = name
        this._name = city
        this._name = country
        this._name = tagline
        this._name = portrait 
        this._alt = alt
        this._price = price       
        
        Photographer.exists = true
        Photographer.instance = this

    }
    get id() {
        return this._id
    }
    get name() {
        return this._name
    }
    get city() {
        return this._city
    }
    get country() {
        return this._country
    }
    get tagline() {
        return this._tagline
    }
    get portrait() {
        return this._portrait
    }
    get alt() {
        return this._alt
    }
    get price() {
        return this._price
    }
    get photographer() {
        return {
            id: this._id,
            name: this._name,
            city: this._city,
            country: this._country,
            tagline: this._tagline,
            portrait: this._portrait,
            alt: this._alt,
            price: this._price
        }
    }
}
