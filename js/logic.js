const deckObject = require('./classes/Deck');

const { deck } = deckObject;
deckObject.shuffle();
console.log(deck);

// set up some columns to display the cards in
const column1 = document.createElement('div');
const column2 = document.createElement('div');
const column3 = document.createElement('div');
const column4 = document.createElement('div');

column1.className = 'column';
column2.className = 'column';
column3.className = 'column';
column4.className = 'column';

for (let i = 0; i < deck.length; i += 1) {
  const card = deck[i];
  // create a div for each card
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `<img src='${card.image}' /> <p>${card.name}</p>`;
  
  // add the card to the DOM
  if (i <= 4) {
    column1.appendChild(div);
  } else if (i <= 9) {
    column2.appendChild(div);
  } else if (i <= 14) {
    column3.appendChild(div);
  } else if (i <= 19) {
    column4.appendChild(div);
  }
}

// grab the main div we want to display cards in
const container = document.querySelector('#main');

container.appendChild(column1);
container.appendChild(column2);
container.appendChild(column3);
container.appendChild(column4);
