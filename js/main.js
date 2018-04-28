// ** Shuffling board ** //

const board = document.querySelector('.board');
const fragment = document.createDocumentFragment();
// number of cards created
let cardNumber = 16;
// TODO: array of cards
const cardDeck16 = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];

// TODO: function to shufle cards
function shufle() {
  let cardDeck = cardDeck16.slice();

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
      }
    }
    card1.classList.toggle('selectedCard');
  }
});
