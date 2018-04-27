const board = document.getElementById('board');
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
  };

  // creates cards
  for (let i=0; i<cardNumber; i++) {
    const newCard = document.createElement('li');

    // get random card number from array
    let cardPicked = Math.floor(Math.random() * cardDeck.length);
    console.log(cardPicked);

    // assign picked card to newly created element
    newCard.innerText = cardDeck[cardPicked];
    // remove picked card from available list
    cardDeck.splice(cardPicked, 1);

    fragment.appendChild(newCard);
  };

  board.appendChild(fragment);
};

shufle();
