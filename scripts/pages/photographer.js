//Mettre le code JavaScript lié à la page photographer.html
const button = document.getElementById('toggleCollapse');
const content = document.getElementById('collapsibleContent');
const chevron = document.querySelector('.fa-chevron-down');
button.addEventListener('click', function() {
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        chevron.style.rotate="180deg"
    } else {
        content.style.display = 'none';
        chevron.style.rotate="360deg";
    }
});