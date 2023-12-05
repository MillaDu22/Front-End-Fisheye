"use strict";
/*******************Gestion clavier remplissage des champs***************************** */
// Récupération des champs du formulaire dans un tableau //
const formFields = document.querySelectorAll('input[type="text"], input[type="email"], input[type="submit"], textarea');
const textFields = Array.from(formFields).filter(field => field.type !== 'submit');


// Rajout d'un gestionnaire d'événement "keydown" à chaque champ du formulaire //
textFields.forEach((field, index) => {
    field.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.keyCode === 13   ) { 
        // Pour passer au champ suivant ou au premier champ si c'est le dernier //
        const nextIndex = (index) % formFields.length;
        // Focus sur le premier champs //
        formFields[nextIndex+1].focus();
        event.preventDefault();
        }
    });
});

function resetForm(){
    document.querySelector('form[name="formmsg"]').style.display = "block";
    // Réinitialisation des champs du formulaire après fermeture de la modale //
    document.getElementById("first").value = "";
    document.getElementById("last").value = "";
    document.getElementById("email").value = "";
    document.getElementById("msg").value = "";
    resetErrors();
}
// Réinitialisation des messages d'erreurs //
function resetErrors() {
    const errorMessages = document.querySelectorAll('.error-msg');
    errorMessages.forEach(message => message.style.display = 'none');
}

// Fonction open modal //
const firstInput = document.getElementById('first');
function openModalForm() {
        if (window.innerWidth > 769) {
            const label = document.querySelector('.label-collapse');
            label.style.display="none";
        }
    resetForm()
    document.getElementById("form-bg").style.display = "flex";
    // Mise en place du focus sur le premier champs //
    setTimeout(function() {
        firstInput.focus();
        },
    100);
}
openModalForm



// Close modal form with X //
function closeModal() {
    const modalbg = document.querySelector(".bg-form");
    const closeX = document.querySelector(".x-close-modal-form");
    closeX.addEventListener('click', function() {
        modalbg.style.display = "none";
        if (window.innerWidth > 769) {
            const label = document.querySelector('.label-collapse');
            label.style.display="block";
        }
        resetForm();
    });
}
closeModal();

// Validation du formulaire //
function validateForm(event) {
    // Empêche la soumission du formulaire pour éviter la fermeture de la modale //
    event.preventDefault(); 
    resetErrors();
    const firstName = document.getElementById('first').value;
    const lastName = document.getElementById('last').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('msg').value;
    // Creation des messages d'erreurs //
    const errorFirst = document.createElement('p');
    errorFirst.textContent = "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
    errorFirst.classList.add('error-msg');
    const messageErrorFirst = document.getElementById('error-first');
    messageErrorFirst.appendChild(errorFirst);

    const errorLast = document.createElement('p');
    errorLast.textContent = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
    errorLast.classList.add('error-msg');
    const messageErrorLast = document.getElementById('error-last');
    messageErrorLast.appendChild(errorLast);

    const errorEmail = document.createElement('p');
    errorEmail.textContent = "Veuillez entrer une adresse e-mail valide.";
    errorEmail.classList.add('error-msg');
    const messageErrorEmail = document.getElementById('error-email');
    messageErrorEmail.appendChild(errorEmail);

    const errorMsg = document.createElement('p');
    errorMsg.textContent = "Veuillez entrer entre 2 et 300 caractères pour le champ du message.";
    errorMsg.classList.add('error-msg');
    const messageErrormsg = document.getElementById('error-msg');
    messageErrormsg.appendChild(errorMsg);

    // Validation = true //
    let valid = true;
    // Si le prénom a moins de 2 caractères, formulaire non valide //
    if (firstName.length < 2 || firstName.trim() === "") {
        messageErrorFirst.style.display="flex";
        valid = false;
    } else {
        messageErrorFirst.style.display="none";
    }
    // Si le nom a moins de 2 caractères, formulaire non valide //
    if (lastName.length < 2 || lastName.trim() === "") {
        messageErrorLast.style.display="flex";
        valid = false;
    } else {
        messageErrorLast.style.display="none";
    }
    // Si l'adresse électronique n'est pas valide (function isValidEmail), formulaire non valide //
    if (!isValidEmail(email)) {
        messageErrorEmail.style.display="flex";
        valid = false;
    } else {
        messageErrorEmail.style.display="none";
    }
    // Si le message comporte moins de 2 caractère ou plus de 300, formulaire non valide //
    if ((message.length < 2 || message.length > 300)) {
        messageErrormsg.style.display="flex";
        valid = false;
    } else {
        messageErrormsg.style.display="none";
    }
    if (valid) {
        console.log('Prenom : ' + firstName);
        console.log('Nom : ' + lastName);
        console.log('Adresse electronique : ' + email);
        console.log('Message : ' + message);
    } 

    // Pour retourner sur le bouton de fermeture après validation du formulaire //
    const closeButton = document.getElementById('close-button');
    if (closeButton) {
        closeButton.focus();
        closeModal();
    }
}

document.querySelector('form[name="formmsg"]').addEventListener('submit', function(event) {
    validateForm(event);
});


// Vérification si chaîne de caractères email correspond à un format valide avec une expression régulière regex //
function isValidEmail(email) {
    // Correspondance caractères alphanumériques //
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // méthode test() renvoie true si la correspondance est trouvée //
    return emailRegex.test(email);
}







