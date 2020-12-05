/* eslint-disable no-await-in-loop */
const fs = require('fs');
const path = require('path');
const Card = require('./classes/Card');

const { readdirSync } = fs;

// collects and organizes the images into an array of objects with one card object per image
const getImages = () => {
  const cards = [];
  const source = './images';
  // make an array of the inner folder names
  const categoryFolders = ['armor', 'food', 'hat', 'shoe', 'weapon'];
  // push all the file paths to the images array
  for (let i = 0; i < categoryFolders.length; i += 1) {
    const folder = `${source}/${categoryFolders[i]}`;
    // iterate over the files inside the current category folder
    for (let j = 0; j < 4; j += 1) {
      const fileName = `${j}.png`;
      // create an object for each file in that folder
      // name is name of the image file without the extension
      const name = `${categoryFolders[i]} ${fileName.split('.')[0]}`;
      // image is the relative image file path
      const image = path.resolve(folder, fileName);
      // type is the name of the folder it's in
      const type = categoryFolders[i];
      // and flipped starts out as false
      const card = new Card(name, image, type, false);
      // add it to our array
      cards.push(card);
    }
  }
  return cards;
};

const cards = getImages();

module.exports = cards;
