export const displayLightboxMedias = medias => {
    const lightboxBg = document.getElementById('lightbox-bg');
    const closeBtn = document.querySelector('.x-lightbox');
    const prevBtn = document.querySelector ('.arrow-left');
    const nextBtn =document.querySelector ('.arrow-right');
    const boxMedia = document.querySelector ('.lightbox-image');
    const mediasArray = Array.from(document.querySelectorAll('.box-video'));


    // Mappage des medias dans la lightbox //
    //// extrait la liste des médias de l'objet medias //
    const listOfMedias =medias.medias;
    //// initialise la variable currentIndex à 0 //
    let currentIndex = 0;
    //// utilise une boucle forEach pour itérer sur chaque élément de mediasArray //
    mediasArray.forEach(media => {
        //// pour chaque élément media dans mediasArray, écouteur d'événements ajouté pour le clic //
        media.addEventListener('click', (event) => {
            //// empêche le comportement par défaut du clic //
            event.preventDefault();
            //// extrait l'ID du média à partir de l'attribut data-media de l'élément HTML du média //
            const mediaId = media.dataset.media;
            //// recherche l'index du média dans la liste des médias en utilisant son ID //
            const mediaIndex = listOfMedias.findIndex(media => media._id == mediaId);
            //// variable currentIndexest mise à jour avec l'index du média actuel //
            currentIndex = mediaIndex;
            //// affiche la modale lightbox //
            lightboxBg.style.display = 'flex';
            //// met le focus sur bouton précédent //
            prevBtn.focus();
            //// appel de la fonction lightboxTemplate pour la création du contenu //
            lightboxTemplate();
        });
    });

    // Template lightbox (contenu) //
    const lightboxTemplate = () => {
        const currentSlide = listOfMedias[currentIndex];
        boxMedia.innerHTML=`
        ${currentSlide._image ? 
            `<img class ="media-lightbox" src = "../../assets/images/gallery-id/${currentSlide._photographerId}/${currentSlide._image}"
                alt= "${currentSlide._alt}">` :
            `<video class="media-lightbox" controls  aria-label ="${currentSlide._title}">
                <source src ="../../assets/images/gallery-id/${currentSlide._photographerId}/${currentSlide._video}" type="video/mp4">
            </video>`}
            <p class ="title-slide">${currentSlide._title}</p>`;
    };


    // Fermeture de la modale lightbox //
    const closeLightbox =  () => {
        lightboxBg.style.display="none";
        boxMedia.innerHTML = '';
    }

    // Si l'on est sur le dernier slide et que l'on clique sur next on repart sur le premier //
    const nextSlide = () => {
        currentIndex++;
        if(currentIndex > listOfMedias.length -1) currentIndex = 0;
        lightboxTemplate();
        activeBtn(nextBtn);
    }

    // Si l'on est sur le premier slide et que l'on clique sur prev on repart sur le dernier //
    const prevSlide = () => {
        currentIndex--;
        if(currentIndex < 0) currentIndex = listOfMedias.length -1;
        lightboxTemplate();
        activeBtn(prevBtn);
    }
    // Je redonne la classe active //
    const activeBtn = btn  => {
        btn.classList.add('active');
        setTimeout(() =>btn.classList.remove('active'), 100);
    }

    // Les gestionnaires d'évenements de la lightbox//
    prevBtn.addEventListener('click', () => prevSlide());
    nextBtn.addEventListener('click', () => nextSlide());
    closeBtn.addEventListener('click', () => closeLightbox());

    // Fonction pour gérer les événements clavier //
    const handleKeyboardEvents = (event) => {
        switch (event.key) {
            case 'ArrowLeft':
                prevSlide();
                prevBtn.focus();
                break;
            case 'ArrowRight':
                nextSlide();
                nextBtn.focus();
                break;
            case 'Escape':
                closeLightbox();
                closeBtn.focus();
                break;
            default:
                break;
        }
    };

    // Ajout des gestionnaires d'événements clavier //
    document.addEventListener('keydown', handleKeyboardEvents);
}
