export const displayLightboxMedias = medias => {
    const lightboxBg = document.getElementById('lightbox-bg');
    const closeBtn = document.querySelector('.x-lightbox');
    const prevBtn = document.querySelector ('.arrow-left');
    const nextBtn =document.querySelector ('.arrow-right');
    const boxMedia = document.querySelector ('.lightbox-image');
    const mediasArray = Array.from(document.querySelectorAll('.element-gallery a'));

    // Mappage des medias dans la lightbox //
    const photographer = medias.photographer;
    const listOfMedias =medias.medias;
    let currentIndex = 0;
    mediasArray.forEach(media => {
        media.addEventListener('click', () => {
            const mediaId = media.dataset.media;
            const mediaIndex = listOfMedias.findIndex(media => media._id == mediaId);
            currentIndex = mediaIndex;
            lightboxBg.style.display = 'flex';
            closeBtn.focus();
            lightboxTemplate();
        });
    });

    // Template lightbox //
    const lightboxTemplate = () => {
        const currentSlide = listOfMedias[currentIndex];
        boxMedia.innerHTML=`
        ${currentSlide._image ? 
            `<img class ="media-lightbox" src = "../../assets/images/gallery-id/${photographer._id}/${currentSlide._image}" 
                alt= "${currentSlide._alt}">` :
            `<video class="media-lightbox" controls  aria-label ="${currentSlide._title}">
                <source src ="../../assets/images/gallery-id/${photographer._id}/${currentSlide._video}" type="video/mp4">
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

    // Les gestionnaires d'évenements //
    prevBtn.addEventListener('click', () => prevSlide());
    nextBtn.addEventListener('click', () => nextSlide());
    closeBtn.addEventListener('click', () => closeLightbox());
}