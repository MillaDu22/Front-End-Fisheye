
import { Api } from "../api/api.js";
import { Photographer } from "..//models/photgrapher.js";
import { PhotographerCard } from "../templates/photographerCard.js";

const sectionPhotographers = document.querySelector('.photographer-section');
//// Crée une instance de la classe Api //
const PhotographerApi = new Api("./data/photographers.json");
//// fonction asynchrone qui affiche les cartes de photographes //
const displayCards = async () => {
    try {
        ////méthode getData de l'objet PhotographerApi pour récupération données photographes //
        const DataPhotographer = await PhotographerApi.getData();
        ///// Extraction liste des photographes //
        const photographers = DataPhotographer.photographers;

        //// boucle pour itérer sur chaque photographe dans la liste //
        for (let i = 0; i < photographers.length; i++) {
            //// Crée une instance de classe Photographer avec les données d'un photographe spécifique //
            const photographer = new Photographer(photographers[i]);
            //// Crée une instance de classe PhotographerCard avec l'objet Photographer //
            const template = new PhotographerCard(photographer);
            ////  crée la carte du photographe //
            const photographerCard = template.createPhotographerCard();

            //// Ajout de la card du photographe dans la section photographes //
            sectionPhotographers.appendChild(photographerCard);
        }
    } catch (error) {
        console.error("Erreur lors du chargement des données:", error)
    }
};

// Appel displayCards qui affiche toutes les cards des photographes //
displayCards()
