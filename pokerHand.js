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
let hand1 = deck.deal();
let hand2 = deck.deal();
let hand3 = deck.deal();
let hand4 = deck.deal();

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

//Royal Flush checker
function checkKingAss(hand) {
  let z = hand.slice(3);
  if (z[0].val_map == 12 && z[1].val_map == 13) {
    return true;
  } else {
    return false;
  }
}
//Straight
function checkStraight(hand) {
  let z = hand
    .slice(1)
    .map((element, i) => element.val_map - hand[i].val_map)
    .toString();
  if (z === "1,1,1,1" || z === "1,1,1,9") {
    return true;
  } else {
    return false;
  }
}
//Flush
function colorCase(hand) {
  const check = hand.map(a => a.suit).filter((e, i, a) => a.indexOf(e) === i);
  if (check.length > 1) {
    return false;
  } else {
    return true;
  }
}
// Straight Flush

function straightFlush(hand) {
  return (colorCase(hand) === true && checkStraight(hand) === true) === true;
}

//Royal Flush
function royalFlush(hand) {
  return (
    (colorCase(hand) === true &&
      checkStraight(hand) === true &&
      checkKingAss(hand) === true) === true
  );
}
// Rest of hands
function checkRest(hand) {
  const temphand = hand.reduce((allNames, name) => {
    allNames[name.value] = ++allNames[name.value] || 1;
    return allNames;
  }, {});
  return Object.values(temphand); // array from given object
}

function checkHand(hand) {
  let a = straightFlush(hand);
  let b = checkStraight(hand);
  let c = colorCase(hand);
  let ak = royalFlush(hand);
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
console.log("Hand of Player no 1 :  " + checkHand(hand1), hand1);
console.log("Hand of Player no 2 :  " + checkHand(hand2), hand2);
console.log("Hand of Player no 3 :  " + checkHand(hand3), hand3);
console.log("Hand of Player no 4 :  " + checkHand(hand4), hand4);
console.log("Hand of Player no 5 :  " + checkHand(Strit), Strit);
