const deck = require('./classes/Deck');

const { typeMap } = deck;

// this is to keep track of how many character pieces the player has collected
let characterCount = 0;

// this is to keep track of clicks on cards in the matching area
let clicks = 0;

// build the character based on the matches the player gets
const buildCharacter = (card) => {
  const cardType = typeMap.get(card);
  const cardName = card.children[0].alt;
  const img = card.children[0].src;

  if (cardType === 'hat' || cardType === 'weapon' || cardType === 'armor' || cardType === 'food' || cardType === 'shoe') {
    // if the block to show the hat doesn't have an image yet...
    if (!document.querySelector(`#${cardType}`).children[0]) {
      // then add it to the character section in the right spot
      document.querySelector(`#${cardType}`).innerHTML = `<img src='${img}' class='icon-image' alt='${cardName}' />`;
      characterCount += 1;
    } else {
      console.error('unknown image selected');
    }
  }
};

// when cards match, use this to remove them from view
const hide = (card, cache) => {
  // this just tidies up our classes as we don't need "showing" anymore
  card.classList.remove('showing');
  cache.classList.remove('showing');
  // and this actually hides the card
  card.classList.add('hidden');
  cache.classList.add('hidden');

  // then to complete the match process we call our helper function to check whether
  // we need to add anything to the character display
  buildCharacter(card);

  // once that's done, check the character to see if we've finished building it
  if (characterCount === 5) {
    document.querySelector('#card-box').innerHTML = `<h2>You won in ${clicks / 2} moves!`;
  }
};

// when the cards don't match, we use this to flip them back over so images are hidden
const flip = (card, cache) => {
  cache.classList.remove('showing');
  card.classList.remove('showing');
};

let cache;

// grab the counter div we want to show number of moves in
const movesCounter = document.querySelector('#move-counter');

// this handles clicks on cards that aren't showing yet
const handleClick = (card) => {
  // show the image on the card
  card.classList.add('showing');
  // add the click to our counter
  clicks += 1;
  // if it's an odd click, it's the first click of two, so save the card
  if (clicks % 2 === 1) {
    cache = card;
    // and disable further clicks on it temporarily
  } else if (clicks % 2 === 0) {
    // if it's an even click, it's the second click, so we can update how many moves have happened
    movesCounter.innerHTML = clicks / 2;
    // then we compare the image path. if they're the same, it's a match!
    if (cache.children[0].src === card.children[0].src) {
      // if they're the same, based on the category, check if that category is filled already
      // if not, update that category for the character with that image
      // then hide the cards (visibility hidden)
      setTimeout(() => {
        hide(card, cache);
      }, 500);
      // hide(card, cache);
    } else {
      setTimeout(() => {
        flip(card, cache);
      }, 500);
      // flip(card, cache);
    }
  }
};

// shuffle and then deal the deck
deck.shuffle();
deck.deal();

// add event listeners to all the cards - I'd rather do this in the Deck deal method, but this works for now
// ran into issues with exporting handleClick, otherwise I could handle it there
const cardDivs = document.querySelectorAll('.card');
console.log(cardDivs);

for (let i = 0; i < cardDivs.length; i += 1) {
  // add event listener to tell us when this card is clicked
  cardDivs[i].addEventListener('click', (event) => {
    // only handle the click if the card is not already showing
    if (!event.currentTarget.classList.contains('showing')) {
      console.log(JSON.stringify(handleClick));
      handleClick(event.currentTarget);
    }
  });
}
