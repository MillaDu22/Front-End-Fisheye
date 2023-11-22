
export default class DataMedia {
    constructor( data) {
        if (DataMedia.exists) {
            //// Vérifie si une instance existe déjà //
            return DataMedia.instance
        } 
        //// Si aucune instance n'existe, initialise les propriétés de l'instance avec les données spécifiées //
        this._id = data.id
        this._photographerId = data.photographerId
        this._title = data.title
        this._image = data.image
        this._video = data.video
        this._likes = data.likes
        this._date = data.date
        this._price = data.price 
    }
}
