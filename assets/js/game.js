let deck = [];
// let points = 0;
const suits = ["H", "C", "D", "S"]; // Hearts Clubs Diamonds Spades
const faceCards = ["J", "Q", "K", "A"];
const hitCardBtn = document.querySelector("#hit-card-btn");
const gameScore = document.querySelectorAll("small");
const playerCards = document.querySelector("#player-cards");
const dealerCards = document.querySelector("#dealer-cards");
let playerPoints = 0,
  aiPoints = 0;

const createDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let suit of suits) {
      deck.push(i + suit);
    }
  }

  for (let faceCard of faceCards) {
    for (let suit of suits) {
      deck.push(faceCard + suit);
    }
  }
  deck = _.shuffle(deck);
  return deck;
};
createDeck();

const hitCard = () => {
  if (deck.length === 0) throw "The deck is empty";

  const card = deck.pop();
  return card;
};

const cardValue = (card) => {
  const value = card.substring(0, card.length - 1);
  return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
};
const createImg = (card, turn) => {
  const img = document.createElement("img");
  img.src = `assets/cards/${card}.png`;
  img.classList.add("card");
  return turn.append(img);
};

const dealerTurn = (minPoints) => {
  do {
    const card = hitCard();
    aiPoints += cardValue(card);
    gameScore[1].innerText = aiPoints;
    createImg(card, dealerCards);
    if (minPoints > 21) break;
  } while (aiPoints < minPoints && minPoints <= 21);
};

const playerTurn = () => {
  const card = hitCard();
  playerPoints += cardValue(card);
  gameScore[0].innerText = playerPoints;
  createImg(card, playerCards);

  if (playerPoints > 21) {
    console.warn("You went over 21!");
    hitCardBtn.disabled = true;
  } else if (playerPoints === 21) {
    console.warn("You have blackjack!");
    hitCardBtn.disabled = true;
  }
};
hitCardBtn.addEventListener("click", () => {
  playerTurn();
  setTimeout(() => {
    dealerTurn();
  }, 400);
  setTimeout(() => {
    playerTurn();
  }, 600);
  setTimeout(() => {
    dealerTurn();
  }, 800);
});
