// prograss-bar
const percentageElement = document.getElementById('percentage');
const progressBarElement = document.getElementById('progress');

const percentageValue = parseFloat(percentageElement.innerText);

progressBarElement.style.width = percentageValue + '%';

// check
const checkElements = document.querySelectorAll('.check');

checkElements.forEach(checkElement => {
    checkElement.addEventListener('click', function () {
        const currentSrc = checkElement.getAttribute('src');
        const checkImagePath = './img/check.png';
        const checkNotImagePath = './img/check-not.png';

        if (currentSrc === checkNotImagePath)
            checkElement.setAttribute('src', checkImagePath);
        else
            checkElement.setAttribute('src', checkNotImagePath);
    });
});