const board = document.getElementById('board');
const fragment = document.createDocumentFragment();
// number of cards created
let cardNumber = 16;

// TODO: function to shufle cards
function shufle() {
  // creates cards
  for (let i=0; i<cardNumber; i++) {
    const newCard = document.createElement('li');
    newCard.innerText = 'K';

    fragment.appendChild(newCard);
  };

  board.appendChild(fragment);
};

shufle();
