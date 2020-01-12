const suits = ["♥", "♠", "♣", "♦"];
const values = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A"
];
const comparator = {
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
  7: 6,
  8: 7,
  9: 8,
  10: 9,
  J: 10,
  Q: 11,
  K: 12,
  A: 13
};

// console.log(Strit);

class Card {
  constructor(suit, value, val_map) {
    this.suit = suit;
    this.value = value;
    this.val_map = val_map;
  }
}

class Deck {
  constructor() {
    this.deck = [];
  }
  createDeck(suits, values) {
    for (let suit of suits) {
      for (let value of values) {
        this.deck.push(new Card(suit, value, comparator[value]));
      }
    }
    return this.deck;
  }
  deal() {
    let hand = [];
    while (hand.length < 5) {
      hand.push(
        this.deck.splice(Math.floor(Math.random() * this.deck.length), 1)
      );
    }
    return hand.flat().sort((a, b) => {
      return a.val_map - b.val_map;
    });
  }
}
let deck = new Deck();
deck.createDeck(suits, values);
let reka1 = deck.deal();
let reka2 = deck.deal();
let reka3 = deck.deal();
let reka4 = deck.deal();
// console.log("Gracz1  :  ", reka1);
// console.log("Gracz2  :  ", reka2);
// console.log("Gracz3  :  ", reka3);
// console.log("Gracz4  :  ", reka4);

// function straigthCase(tab) {
//   const tab2 = tab;
//   return tab2.map(a => a.val_map) - tab2.shift([0].val_map) == 4;
// }
// console.log(straigthCase(Strit));

let Strit = [
  { suit: "Heart", value: "2", val_map: 9 },
  { suit: "Heart", value: "4", val_map: 10 },
  { suit: "Heart", value: "3", val_map: 11 },
  { suit: "Heart", value: "5", val_map: 12 },
  { suit: "Heart", value: "6", val_map: 13 }
];

// let names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice']

// let countedNames = names.reduce(function (allNames, name) {
//   if (name in allNames) {
//     allNames[name]++
//   }
//   else {
//     allNames[name] = 1
//   }
//   return allNames

function checkKingAss(h) {
  let z = h.slice(3);
  if (z[0].val_map == 12 && z[1].val_map == 13) {
    return true;
  } else {
    return false;
  }
}

//karoca
function fourOfkind(renka) {
  const renn = renka.reduce((allNames, name) => {
    allNames[name.value] = ++allNames[name.value] || 1;
    return allNames;
  }, {});
  return Object.values(renn).some(v => v == 4);
}
//trojka
function threeOfkind(renka) {
  const renn = renka.reduce((allNames, name) => {
    allNames[name.value] = ++allNames[name.value] || 1;
    return allNames;
  }, {});
  return Object.values(renn).filter(v => 2 <= v && v < 4) == 3;
}
//full
function full(renka) {
  const renn = renka.reduce((allNames, name) => {
    allNames[name.value] = ++allNames[name.value] || 1;
    return allNames;
  }, {});
  return Object.values(renn).every(v => v === 3 || v == 2);
}
//dwie pary
function twoPairs(renka) {
  const renn = renka.reduce((allNames, name) => {
    allNames[name.value] = ++allNames[name.value] || 1;
    return allNames;
  }, {});
  return Object.values(renn).filter(v => v === 2).length == 2;
}
//jedna para
function adnaPairs(hand) {
  const renn = hand.reduce((allNames, name) => {
    allNames[name.value] = ++allNames[name.value] || 1;
    return allNames;
  }, {});
  return Object.values(renn).filter(v => v === 2).length == 1;
}
//Strit
function checkStrit(h) {
  let z = h
    .slice(1)
    .map((element, i) => element.val_map - h[i].val_map)
    .toString();
  if (z === "1,1,1,1" || z === "1,1,1,9") {
    return true;
  } else {
    return false;
  }
}
//color
function colorCase(tab) {
  const check = tab.map(a => a.suit).filter((e, i, a) => a.indexOf(e) === i);
  if (check.length > 1) {
    return false;
  } else {
    return true;
  }
}

//pokier
function pokier(hand) {
  return (colorCase(hand) === true && checkStrit(hand) === true) === true;
}
function royalFlush(hand) {
  return (
    (colorCase(hand) === true &&
      checkStrit(hand) === true &&
      checkKingAss(hand) === true) === true
  );
}

// let countedNames = Strit.reduce((allNames, name) => {
//   allNames[name.value] = ++allNames[name.value] || 1;

//   return allNames;
// }, {});
function checkRest(hand) {
  const temphand = hand.reduce((allNames, name) => {
    allNames[name.value] = ++allNames[name.value] || 1;
    return allNames;
  }, {});
  return Object.values(temphand);
}
// console.log(countedNames);

// let b = Object.values(countedNames).filter(v => v === 2 && v !== 3);

// console.log(b);
console.log(checkStrit(reka1) + "- Strit");
console.log(colorCase(reka1) + "- Color");
console.log(fourOfkind(reka1) + "- four of kind");
console.log(threeOfkind(reka1) + "- Three");
console.log(full(reka1) + "- Full");
console.log(twoPairs(reka1) + "- DwiePary");
console.log(adnaPairs(reka1) + "- AdnaPary");
console.log(pokier(reka1) + "- pokier");
console.log("Hand of Player no 1 :  " + checkHand(reka1), reka1);
console.log("Hand of Player no 2 :  " + checkHand(reka2), reka2);
console.log("Hand of Player no 3 :  " + checkHand(reka3), reka3);
console.log("Hand of Player no 4 :  " + checkHand(reka4), reka4);
console.log("Hand of Player no 5 :  " + checkHand(Strit), Strit);
// console.log(checkHand2(reka1));

function checkHand(hand) {
  let a = pokier(hand);
  let b = checkStrit(hand);
  let c = colorCase(hand);
  let ak = royalFlush(hand);
  let e = threeOfkind(hand);
  let f = full(hand);
  let g = twoPairs(hand);
  let h = adnaPairs(hand);
  let i = hand.slice(4).pop();
  let z = checkRest(hand).toString();

  switch (true) {
    case ak:
      return "Royal flush";
    case a:
      return "Straight flush";

    case b:
      return "Straight";

    case c:
      return "Flush";

    case z === "4,1" || z === "1,4":
      return "Four of a kind";

    case z === "3,1,1" || z === "1,3,1" || z === "1,1,3":
      return "Three of a kind";

    case z === "3,2" || z === "2,3":
      return "Full house";

    case z === "2,2,1" || z === "2,1,2" || z === "1,2,2":
      return "Two Pair";

    case z === "1,1,1,2" ||
      z === "2,1,1,1" ||
      z === "1,2,1,1" ||
      z === "1,1,2,1":
      return "One Pair";

    default:
      return `High Card ${i.value + " " + i.suit}`;
  }
}
