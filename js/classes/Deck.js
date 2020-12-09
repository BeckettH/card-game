const cards = require('../build-cards');

class Deck {
  constructor() {
    this.deck = cards;
    // this lets us tie the original type from the Card instance to the DOM element for the card
    this.typeMap = new WeakMap();
  }

  // shuffles the deck - using the Fisher-Yates Shuffle here
  shuffle() {
    let temp;
    let card = this.deck.length;
    let randomNum;

    // while there remain elements to shuffle…
    while (card) {
      // pick one of the elements we have left
      randomNum = Math.floor(Math.random() * card);
      // then decrement our deck length
      card -= 1;
      // And swap it with the current element.
      temp = this.deck[card];
      this.deck[card] = this.deck[randomNum];
      this.deck[randomNum] = temp;
    }
  }

  // deals cards at the start of a new game
  deal() {
    const { deck, typeMap } = this;
    // grab the div we want to display cards in
    const container = document.querySelector('#card-box');

    for (let i = 0; i < deck.length; i += 1) {
      const card = deck[i];
      // create a div for each card
      const div = document.createElement('div');
      div.classList.add('card');

      // find a way to swap this out so it only has the image w/ alt text when it's flipped over
      // and then have alt text that just says "blue back of card [i]" otherwise
      div.innerHTML = `<img src='${card.image}' alt='${card.name}' />`;

      // add hidden property to keep the card div connected to the javascript card's
      // type property after we put it on the DOM
      typeMap.set(div, card.type);

      container.appendChild(div);
    }
  }
}

const deck = new Deck();
module.exports = deck;
