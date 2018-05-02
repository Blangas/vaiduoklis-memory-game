// ** Statistics ** //

// stats variables
let stars = 3;
let movesTotal = 16;
let movesLeft = movesTotal;
// number of cards created
let cardNumber = 16;
let pairsLeft = 8;

const movesLeftCounter = document.querySelector('.moves-left');
const movesTotalCounter = document.querySelector('.moves-total');
const star1 = document.querySelector('.star-1');
const star2 = document.querySelector('.star-2');
const star3 = document.querySelector('.star-3');
const modalWin = document.querySelector('.modal-win');
const modalLose = document.querySelector('.modal-lose');
const timeRating = document.querySelector('.time-rating');
const starRating = document.querySelector('.star-rating');
const cls = document.querySelector('.close');

// setting stats initial

movesLeftCounter.textContent = movesLeft;
movesTotalCounter.textContent = movesTotal;

// timer

let time = 'Time: 00.00';
let timeStart, timeExact;
const timeCounter = document.querySelector('.timer');

let timeRefresh;

function timeCounting() {
  timeInterval = Date.now() - timeStart;
  timeMin = Math.floor(timeInterval / 60000);
  timeMin = checkTime(timeMin);
  timeSec = (Math.floor(timeInterval / 1000)) % 60;
  timeSec = checkTime(timeSec);
  time = `Time: ${timeMin}:${timeSec}`;
  timeExact = time + '.' + (timeInterval % 1000);
  timeCounter.textContent = time;
}

// add zero in front of numbers
function checkTime(i) {
  if (i < 10) {
    i = '0' + i;
  }
  return i;
}


// ** Shuffling board ** //

const board = document.querySelector('.board');
const fragment = document.createDocumentFragment();

// TODO: array of cards
const cardDeck16 = ['flaticon-dead', 'flaticon-dead', 'flaticon-halloween-1', 'flaticon-halloween-1', 'flaticon-horror-1', 'flaticon-horror-1', 'flaticon-people', 'flaticon-people', 'flaticon-horror', 'flaticon-horror', 'flaticon-halloween', 'flaticon-halloween', 'flaticon-spiritual', 'flaticon-spiritual', 'flaticon-shapes', 'flaticon-shapes'];

// TODO: function to shufle cards
function shufle() {
  timeRefresh = setInterval(timeCounting, 500);
  // resets variables
  let cardDeck = cardDeck16.slice();
  movesLeft = movesTotal;
  movesLeftCounter.textContent = movesLeft;
  pairsLeft = cardDeck.length / 2;
  timeStart = Date.now();
  star1.textContent = '★';
  star2.textContent = '★';
  star3.textContent = '★';

  // empty the board
  board.innerHTML = '';
  modalWin.style.display = 'none';
  modalLose.style.display = 'none';

  // creates cards
  for (let i=0; i<cardNumber; i++) {
    const newCard = document.createElement('li');
    const newCardBack = document.createElement('div');
    const newCardFront = document.createElement('div');
    const newCardItem = document.createElement('i');

    // get random card number from array
    let cardPicked = Math.floor(Math.random() * cardDeck.length);

    newCard.className = 'card';
    newCardBack.className = 'card-back';
    newCardFront.className = 'card-front';
    newCardItem.className = cardDeck[cardPicked];

    // remove picked card from available list
    cardDeck.splice(cardPicked, 1);

    newCardFront.appendChild(newCardItem);
    newCard.appendChild(newCardBack);
    newCard.appendChild(newCardFront);
    fragment.appendChild(newCard);
  }

  board.appendChild(fragment);
}

shufle();

// ** Picking Cards ** //

let card1, card2;

// TODO: what happens when card clicked
board.addEventListener('click', function clickedCard(e) {
  if (e.target.nodeName === 'LI' && !e.target.classList.contains('selectedCard')) {

    // first & second card reacts
    if (!card1) {
      card1 = e.target;
      card1.classList.toggle('selectedCard');
    } else if (!card2){
      card2 = e.target;
      card2.classList.toggle('selectedCard');
      if (card1.innerHTML === card2.innerHTML) {
        --pairsLeft;
        card1 = undefined;
        card2 = undefined;
        // Win condition
        if (pairsLeft <= 0) {
          timeCounting();
          clearInterval(timeRefresh);
          timeRating.textContent = timeExact;
          starRating.textContent = `${star1.textContent}${star2.textContent}${star3.textContent} ${movesLeft}/${movesTotal}`;
          modalWin.style.display = 'block';
          console.log(`Win!! ${timeExact} Stars: ${star1.textContent}${star2.textContent}${star3.textContent}`);
        }
      } else {
        // on mistake removes the move
        setTimeout(function() {
          card1.classList.toggle('selectedCard');
          card2.classList.toggle('selectedCard');
          card1 = undefined;
          card2 = undefined;
        },600);
        --movesLeft
        movesLeftCounter.textContent = movesLeft;
        if (movesLeft === movesTotal / 4 * 3) {
          star3.textContent = `☆`;
        } else if (movesLeft === movesTotal / 2) {
          star2.textContent = `☆`;
        } else if (movesLeft === movesTotal / 4) {
          star1.textContent = `☆`;
        }
        // Lose condition
        if (movesLeft <= 0) {
          clearInterval(timeRefresh);
          modalLose.style.display = 'block';
          console.log('Lose...');
        }
      }
    }
  }
});

cls.onclick = function() {
  shufle();
}

window.onclick = function(e) {
  if (e.target == modalWin) {
    shufle();
  }
}
