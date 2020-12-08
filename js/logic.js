const deckObject = require('./classes/Deck');

const { deck } = deckObject;
deckObject.shuffle();
console.log(deck);

// this lets us tie the original type from the Card instance to the DOM element for the card
const typeMap = new WeakMap();
// this is to keep track of how many character pieces the player has collected
let characterCount = 0;
// this is to keep track of clicks on cards in the matching area
let clicks = 0;

const buildCharacter = (card) => {
  const cardType = typeMap.get(card);
  console.log(`card type is ${cardType} and card image is ${card.children[0].src}`);
  const img = card.children[0].src;

  switch (cardType) {
    case 'hat':
      // if the block to show the hat doesn't have an image yet...
      if (!document.querySelector('#hat').children[0]) {
        document.querySelector('#hat').innerHTML = `<img src='${img}' class='icon-image' alt='${card.name}' />`;
        characterCount += 1;
      }
      break;
    case 'weapon':
      if (!document.querySelector('#weapon').children[0]) {
        document.querySelector('#weapon').innerHTML = `<img src='${img}' class='icon-image' alt='${card.name}' />`;
        characterCount += 1;
      }
      break;
    case 'armor':
      if (!document.querySelector('#armor').children[0]) {
        document.querySelector('#armor').innerHTML = `<img src='${img}' class='icon-image' alt='${card.name}' />`;
        characterCount += 1;
      }
      break;
    case 'food':
      if (!document.querySelector('#food').children[0]) {
        document.querySelector('#food').innerHTML = `<img src='${img}' class='icon-image' alt='${card.name}' />`;
        characterCount += 1;
      }
      break;
    case 'shoe':
      if (!document.querySelector('#shoe').children[0]) {
        document.querySelector('#shoe').innerHTML = `<img src='${img}' class='icon-image' alt='${card.name}' />`;
        characterCount += 1;
      }
      break;
    default:
      console.log('unknown image selected');
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
  console.log(`card is ${card} and cache is ${cache}`);
  cache.classList.remove('showing');
  card.classList.remove('showing');
};

let cache;

// grab the counter div we want to show number of moves in
const movesCounter = document.querySelector('#move-counter');

const handleClick = (card) => {
  // show the image on the card
  card.classList.add('showing');
  // add the click to our counter
  clicks += 1;
  console.log(clicks, cache);
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

// grab the div we want to display cards in
const container = document.querySelector('#card-box');

for (let i = 0; i < deck.length; i += 1) {
  const card = deck[i];
  // create a div for each card
  const div = document.createElement('div');
  div.classList.add('card');

  // find a way to swap this out so it only has the image w/ alt text when it's flipped over
  // and then have alt text that just says "blue back of card [i]" otherwise
  div.innerHTML = `<img src='${card.image}' alt='card ${i + 1} is ${card.name}' />`;

  // add event listener to tell us when this card is clicked
  div.addEventListener('click', (event) => {
    // only handle the click if the card is not already showing
    if (!event.currentTarget.classList.contains('showing')) {
      handleClick(event.currentTarget);
    }
  });

  // add hidden property to keep the card div connected to the javascript card's
  // type property after we put it on the DOM
  typeMap.set(div, card.type);

  container.appendChild(div);
}

// build the character based on the matches the player gets

