"use strict";
export class DataPhotographer {
    constructor( data) {
        // Vérifie si une instance existe déjà //
        if (DataPhotographer.exists) {
            // Si une instance existe, retourne cette instance plutôt que de créer une nouvelle //

            return DataPhotographer.instance
        } 
        // Si aucune instance n'existe, initialise les propriétés de l'instance avec les données spécifiées //
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
