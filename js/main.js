// ** Statistics ** //

// stats variables
let movesTotal = 16; // total moves player can do mistake
let movesLeft = movesTotal; // moves left for mistakes
let cardNumber = 16; // number of cards created
let pairsLeft = 8; // number of card pairs

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

movesLeftCounter.textContent = movesLeft; // moves left updated in page
movesTotalCounter.textContent = movesTotal; // moves total updated in page

// timer

let time = 'Time: 00.00';
let timeStart, timeExact, timeRefresh;
const timeCounter = document.querySelector('.timer');

function timeCounting() {
  timeInterval = Date.now() - timeStart;
  timeMin = Math.floor(timeInterval / 60000); // minutes for timer
  timeMin = checkTime(timeMin);
  timeSec = (Math.floor(timeInterval / 1000)) % 60; // seconds for timer
  timeSec = checkTime(timeSec);
  time = `Time: ${timeMin}:${timeSec}`;
  timeExact = time + '.' + (timeInterval % 1000); // exact time for finished game
  timeCounter.textContent = time; // update timer
}

// add zero in front of numbers
function checkTime(i) {
  if (i < 10) {i = '0' + i;}
  return i;
}


// ** Shuffling board ** //

const board = document.querySelector('.board');
const fragment = document.createDocumentFragment();

// TODO: array of cards
const cardDeck16 = [
  'flaticon-dead',
  'flaticon-dead',
  'flaticon-halloween-1',
  'flaticon-halloween-1',
  'flaticon-horror-1',
  'flaticon-horror-1',
  'flaticon-people',
  'flaticon-people',
  'flaticon-horror',
  'flaticon-horror',
  'flaticon-halloween',
  'flaticon-halloween',
  'flaticon-spiritual',
  'flaticon-spiritual',
  'flaticon-shapes',
  'flaticon-shapes'
];

// TODO: function to shufle cards
function shufle() {
  // resets variables
  timeRefresh = setInterval(timeCounting, 500); // set time intervals for refreshing timer
  let cardDeck = cardDeck16.slice(); // create clone deck from which take out cards
  movesLeft = movesTotal; // reset mistake moves left to player
  movesLeftCounter.textContent = movesLeft; // update mistake moves left in page
  pairsLeft = cardDeck.length / 2; // reset card pairs left till win
  timeStart = Date.now(); // reset time start point to count game time
  star1.textContent = '★'; // reset star rating displayed
  star2.textContent = '★';
  star3.textContent = '★';

  board.innerHTML = ''; // empty the board
  modalWin.style.display = 'none'; // hide win modal
  modalLose.style.display = 'none'; // hide lose modal

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
    if (!card1) { // if first card not selected
      card1 = e.target; // select first card
      card1.classList.toggle('selectedCard');
    } else if (!card2){ //if second card not selected
      card2 = e.target; //select second card
      card2.classList.toggle('selectedCard');
      if (card1.innerHTML === card2.innerHTML) { // if both selected cards match
        --pairsLeft; // card pairs left -1
        card1 = undefined; // unselect cards
        card2 = undefined; // but cards keep selectedCard class and stay open
        // Win condition
        if (pairsLeft <= 0) {
          timeCounting(); // recount time
          clearInterval(timeRefresh); // stop time counter
          timeRating.textContent = timeExact; // exact time for win modal
          starRating.textContent = `${star1.textContent}${star2.textContent}${star3.textContent} ${movesLeft}/${movesTotal}`; // star/moves rating for win modal
          modalWin.style.display = 'block'; // display win modal
          console.log(`Win!! ${timeExact} Stars: ${star1.textContent}${star2.textContent}${star3.textContent}`); // for test purpose
        }
      } else { // if both selected do not match
        setTimeout(function() { // after delay close both cards and unselects it
          card1.classList.toggle('selectedCard');
          card2.classList.toggle('selectedCard');
          card1 = undefined;
          card2 = undefined;
        },600);
        --movesLeft // removes the move
        movesLeftCounter.textContent = movesLeft; // counts star rating
        if (movesLeft === movesTotal / 4 * 3) { // at 3/4 ★★☆
          star3.textContent = `☆`;
        } else if (movesLeft === movesTotal / 2) { // at 2/4 ★☆☆
          star2.textContent = `☆`;
        } else if (movesLeft === movesTotal / 4) { // at 1/4 ☆☆☆
          star1.textContent = `☆`;
        }
        // Lose condition
        if (movesLeft <= 0) {
          clearInterval(timeRefresh); // stop time counter
          modalLose.style.display = 'block'; // display lose modal
          console.log('Lose...'); // test purpose
        }
      }
    }
  }
});

// reshufle in which case close modals as well
cls.onclick = function() {
  shufle();
}

window.onclick = function(e) {
  if (e.target == modalWin) {
    shufle();
  }
}
