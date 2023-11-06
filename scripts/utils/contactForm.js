////////////////////////////////////////////////////////Formulaire de contact///////////////////////////////////////////////////
// Fonction open modal
function openModalForm() {
    document.getElementById("form-bg").style.display = "flex";
}
// Close modal form with X
function closeModal() {
    const modalbg = document.querySelector(".bg-form");
    const closeX = document.querySelector(".x-close-modal-form");
    closeX.addEventListener('click', function() {
        modalbg.style.display = "none";
    });
}
closeModal();
