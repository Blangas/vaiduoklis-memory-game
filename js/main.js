// ** Statistics ** //

// stats variables
let stars = 3;
let movesLeft = 20;
let movesTotal = 20;
let time = 0;

const movesLeftCounter = document.querySelector('.moves-left');
const movesTotalCounter = document.querySelector('.moves-total');

// setting stats initial

movesLeftCounter.textContent = movesLeft;
movesTotalCounter.textContent = movesTotal;

// ** Shuffling board ** //

const board = document.querySelector('.board');
const fragment = document.createDocumentFragment();
// number of cards created
let cardNumber = 16;

// TODO: array of cards
const cardDeck16 = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];

// TODO: function to shufle cards
function shufle() {
  // resets variables
  let cardDeck = cardDeck16.slice();
  movesLeft = movesTotal;
  movesLeftCounter.textContent = movesLeft;

  // empty the board
  if (board.textContent) {
    board.innerHTML = '';
  }

  // creates cards
  for (let i=0; i<cardNumber; i++) {
    const newCard = document.createElement('li');

    // get random card number from array
    let cardPicked = Math.floor(Math.random() * cardDeck.length);

    // assign picked card to newly created element
    newCard.innerText = cardDeck[cardPicked];
    newCard.className = 'card';
    // remove picked card from available list
    cardDeck.splice(cardPicked, 1);

    fragment.appendChild(newCard);
  }

  board.appendChild(fragment);
}

shufle();

// ** Picking Cards ** //

let cardIsSelected = false;
let card1, card2;

// TODO: what happens when card clicked
board.addEventListener('click', function clickedCard(e) {
  if (e.target.nodeName === 'LI' && !e.target.classList.contains('pairedCard')) {
    // check card selected
    cardIsSelected = !cardIsSelected;

    // first & second card reacts
    if (cardIsSelected) {
      card1 = e.target;
    } else {
      card2 = e.target;
      if (card1.textContent === card2.textContent) {
        card1.classList.toggle('pairedCard');
        card2.classList.toggle('pairedCard');
      } else {
        // on mistake removes the move
        --movesLeft
        movesLeftCounter.textContent = movesLeft;
      }
    }
    card1.classList.toggle('selectedCard');
  }
});
