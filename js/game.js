const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const colors = [
    'black-color',
    'blue-color',
    'green-color',
    'red-color',
    'white-color',
    'five-color'
]

// const guilds = [
//     'Azorius',
//     'Boros',
//     'Dimir',
//     'Golgari',
//     'Gruul',
//     'Izzet',
//     'Orzhov',
//     'Rakdos',
//     'Selesnya',
//     'Simic'
// ]

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === (colors.length * 2) ) {
        clearInterval(this.loop);
        alert(`Parabens, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML} segundos`);
    }

}

const checkCards = () => {
    const firstColor = firstCard.getAttribute('data-color');
    const secondColor = secondCard.getAttribute('data-color');

    if (firstColor === secondColor) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame()

    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        }, 600)
    }
}

const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')) {
        return
    }

    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode

        checkCards();
    }
}

const createCardColor = (color) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../img/img-cores/${color}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard)
    card.setAttribute('data-color', color)

    return card;
}

const loadGame = () => {
    let duplicateCard = []
    let shurfledArray = []

    duplicateCard = [...colors, ...colors]
    shurfledArray = duplicateCard.sort(() => Math.random() - 0.5)
    shurfledArray.forEach((color) => {
        const card = createCardColor(color);
        grid.appendChild(card);
    })
}

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML
        timer.innerHTML = currentTime + 1
    }, 1000)
} 

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('Player');
    startTimer();
    loadGame();
}

