const symbols = ["🍎", "🍌", "🍇", "🍉", "🍓", "🍒", "🍋", "🍍"];
let cardValues = [...symbols, ...symbols]; // Duplicate symbols for pairs
let firstCard, secondCard;
let lockBoard = false;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = ""; // Clear the board

    cardValues = shuffle(cardValues);
    cardValues.forEach(value => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.value = value;
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return; // Prevent flipping more than two cards
    if (this === firstCard) return; // Prevent double-clicking the same card

    this.classList.add("flip");
    this.textContent = this.dataset.value;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    resetBoard();

    checkWin();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        firstCard.textContent = "";
        secondCard.textContent = "";

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function checkWin() {
    const allMatched = [...document.querySelectorAll(".card")].every(card => 
        card.classList.contains("matched")
    );

    if (allMatched) {
        document.getElementById("status").textContent = "Congratulations! You've matched all the cards!";
    }
}

function resetGame() {
    document.getElementById("status").textContent = "";
    cardValues = [...symbols, ...symbols];
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    createBoard();
}

createBoard();
