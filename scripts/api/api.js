"use strict";
export class Api {
    // Le constructeur de la classe prend l'URL en paramètre et l'attribue à la propriété url de l'instance de la classe //
    constructor(url) {
        this.url = url;
    }
    // méthode asynchrone qui sera appelée pour récupérer des données à partir de l'URL spécifiée //
    async getData() {
        // structure try-catch pour gérer les erreurs potentielles pendant l'exécution asynchrone de la méthode //
        try {
            const response = await fetch(this.url);
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }
}
