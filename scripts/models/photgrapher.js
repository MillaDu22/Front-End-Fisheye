export class Photographer {
    //// constructeur prend un objet data en paramètre //
    constructor(data) {
        //// vérifie s'il existe déjà une instance de la classe Photographer. Si oui, elle retourne l'instance (Singleton) //
        if (Photographer.exists) {
            return Photographer.instance;
        }
        //// Si aucune instance de la classe n'existe, les propriétés de l'objet data sont utilisées pour initialiser les propriétés de l'instance de la classe //
        this._id = data.id;
        this._name = data.name;
        this._city = data.city;
        this._country = data.country;
        this._tagline = data.tagline;
        this._portrait = data.portrait;
        this._alt = data.alt;
        this._price = data.price;
    }
}
