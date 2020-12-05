class Card {
  constructor(name, image, type, flipped) {
    this.name = name;
    this.image = image;
    this.type = type;
    this.flipped = flipped;
  }

  // flips the card
  flip() {
    if (this.flipped === false) {
      this.flipped = true;
    } else if (this.flipped === true) {
      this.flipped = false;
    }
  }
}

module.exports = Card;
