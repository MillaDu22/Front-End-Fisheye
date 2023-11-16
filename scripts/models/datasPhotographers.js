export default class DataPhotographer {
    constructor( data) {
        if (DataPhotographer.exists) {
            return DataPhotographer.instance
        } 
        this._id = data.id
        this._name = data.name
        this._name = data.city
        this._name = data.country
        this._name = data.tagline
        this._name = data.portrait 
        this._alt = data.alt
        this._price = data.price       
        
        DataPhotographer.exists = true
        DataPhotographer.instance = this

    }
    get id() {
        return this._photographers.id
    }
    get name() {
        return this._photographers.name
    }
    get city() {
        return this._photographers.city
    }
    get country() {
        return this._photographers.country
    }
    get tagline() {
        return this._photographers.tagline
    }
    get portrait() {
        return `/assets/images/photographers/${this._photographers.portrait}`
    }
    get alt() {
        return this._photographers.alt
    }
    get price() {
        return this._photographers.price
    }
    get photographer() {
        return {
            id: this._photographers.id,
            name: this._photographers.name,
            city: this._cphotographers.ity,
            country: this._photographers.country,
            tagline: this._photographers.tagline,
            portrait: this._photographers.portrait,
            alt: this._photographers.alt,
            price: this._photographers.price
        }
    }
}