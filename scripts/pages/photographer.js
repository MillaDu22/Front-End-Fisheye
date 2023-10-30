//Mettre le code JavaScript lié à la page photographer.html

// Select 
const dd = document.querySelector('#dropdown-wrapper');
const links = document.querySelectorAll('.dropdown-list a');
const span = document.querySelector('.selected');

dd.addEventListener('click', function() {
    this.classList.toggle('is-active');
});

links.forEach((element) => {
    element.addEventListener('click', function(evt) {
    span.innerHTML = evt.currentTarget.textContent;
    })
})

// launch modal event
function openModalForm() {
    const modalbg = document.querySelector(".bground");
    const modalBtn = document.querySelector(".contact_button");
    modalBtn.addEventListener('click', function() {
        modalbg.style.display="flex";
    });
}
openModalForm();

// Close modal form with X
function closeModal() {
    const modalbg = document.querySelector(".bground");
    const closeX = document.querySelector(".x-close-modal-form");
    closeX.addEventListener('click', function() {
        modalbg.style.display="none";
        closeBtnMsg.style.display="none";
    });
}
closeModal();