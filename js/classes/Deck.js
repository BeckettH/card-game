const cards = require('../get-images');

class Deck {
  constructor() {
    this.deck = cards;
  }

  // shuffles the deck - using the Fisher-Yates Shuffle here
  shuffle() {
    // this.deck = await this.cardsPromise;
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

  }

  // checks for a match between flipped cards
  matchCheck() {
    
  }
}

const deck = new Deck();
module.exports = deck;
