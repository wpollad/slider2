const carousel = document.querySelector(".carousel");
const firstImage = carousel.querySelectorAll("img")[0];
const arrowIcons = document.querySelectorAll(".wrapper .arrow");
const cards = document.querySelectorAll(".card");
const cardsScroll = document.querySelector(".cards");
const cardsArrowIcons = document.querySelectorAll(".months .arrow");

const imageWidth = firstImage.clientWidth;
const scrollWidth = carousel.scrollWidth - carousel.clientWidth;
const cardHeight = cards[0].clientHeight;

let currentNumber = 1;

const showIcons = () => {
    arrowIcons[0].style.display = carousel.scrollLeft === 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft === scrollWidth ? "none" : "block";
};

const scrollToImage = (number) => (number - 1) * imageWidth;

const scrollToCard = (number) => (number - 1) * cardHeight;

const validateCurrnetNumber = (number) => {
    if (number < 1) currentNumber = 1;
    if (number > 12) currentNumber = 12;
}

const selectCard = (number) => {
    cards.forEach(card => {
        if (card.id == number) {
            card.classList.add("selected");
        } else {
            card.classList.remove("selected");
        }
    });
};

showIcons();

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        currentNumber += icon.id === "left" ? -1 : 1;
        carousel.scrollLeft = scrollToImage(currentNumber);
        cardsScroll.scrollTop = scrollToCard(currentNumber);
        selectCard(currentNumber);
        setTimeout(() => showIcons(), 800);
    })
});

cards.forEach(card => {
    card.addEventListener("click", () => {
        currentNumber = +card.id;
        selectCard(currentNumber);
        carousel.scrollLeft = scrollToImage(currentNumber);
        setTimeout(() => showIcons(), 1000);
    });
});

cardsArrowIcons.forEach(arrow => {
    arrow.addEventListener("click", () => {
        currentNumber += arrow.id === "up" ? -1 : 1;
        validateCurrnetNumber(currentNumber);
        carousel.scrollLeft = scrollToImage(currentNumber);
        selectCard(currentNumber);
        cardsScroll.scrollTop = scrollToCard(currentNumber);
    })
});


