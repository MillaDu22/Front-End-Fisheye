"use strict";
// Importe la classe Media depuis le fichier datasMedia.js //
import  Media from "../models/datasMedia.js"
// Définition et exportation de la classe MediasFactory //
export class MediasFactory {
    // Constructeur prenant des données et un type en paramètres //
    constructor(data, type) {

        // Vérifie le type spécifié //
        if(type === 'Api') {
            // Si le type est 'Api', crée une nouvelle instance de la classe Media avec les données spécifiées //
            return new Media(data)
        } else  {
            // Si le type est inconnu, lance une erreur //
            throw 'Unknown format type'
        }
    }
}