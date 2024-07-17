const setData = require("../data/setData.json");
const themeData = require("../data/themeData.json");

let sets = [{
  "set_num": "001-1",
  "name": "Gears",
  "year": "1965",
  "theme_id": "1",
  "num_parts": "43",
  "img_url": "https://cdn.rebrickable.com/media/sets/001-1.jpg"
},];

function initialize() {
  return new Promise((resolve, reject) => {
    try {
      sets = setData.map(set => {
        const theme = themeData.find(theme => theme.id === set.theme_id);
        return {
          ...set,
          theme: theme ? theme.name : "Unknown"
        };
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

function getAllSets() {
  return new Promise((resolve, reject) => {
    resolve(sets);
  });
}

function getSetByNum(setNum) {
  return new Promise((resolve, reject) => {
    const set = sets.find(set => set.set_num === setNum);
    if (set) {
      resolve(set);
    } else {
      reject(`Set with number ${setNum} not found`);
    }
  });
}

function getSetsByTheme(theme) {
  return new Promise((resolve, reject) => {
    const matchingSets = sets.filter(set => set.theme.toLowerCase().includes(theme.toLowerCase()));
    if (matchingSets.length > 0) {
      resolve(matchingSets);
    } else {
      reject(`No sets found for theme ${theme}`);
    }
  });
}

module.exports = {
  initialize,
  getAllSets,
  getSetByNum,
  getSetsByTheme
};
