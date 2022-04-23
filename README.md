# JetSet

A micro library for getting, setting, and watching object properties.

---

## Installation

    npm install --save jet-set

## Usage Highlights

Here's JetSet's quick/dirty expressed in code; check out the [full documentation](https://phillipluther.github.io/jet-set) for a deeper dive.

```js
import jetSet from 'jet-set';

let fruitBasket = jetSet({
  apples: 3,
  oranges: 5,
  bananas: 6,
});

fruitBasket.limes = 4;
fruitBasket.lemons = 2;

// no big deal so far? let's add a derived/dynamic property
fruitBasket.totalFruit = () => {
  let sum = 0;

  for (let fruit in fruitBasket) {
    sum += fruitBasket[fruit];
  }

  return sum;
};

console.log(fruitBasket.totalFruit); // 20

// watch for changes, even on dynamic properties
const buyMoreCitrus = () => {
  const { oranges, limes, lemons } = fruitBasket;

  if (oranges < 2 || limes < 2 || lemons < 2) {
    console.log('Buy more citrus!');
  }
};

fruitBasket.onChange('totalFruit', buyMoreCitrus);

fruitBasket.lemons = 1; // > "Buy more citrus!"
```

## About JetSet

This library aims to be three things: simple, tiny, and stateful.

- Interacting with a JetSet object should feel familiar, mirroring how you set and get properties on a vanilla JavaScript object.
- It's 496 bytes with no dependencies.
- It treats derived/dynamic properties as static snapshots, making it great for managing state.

Deeper details can be found in the [official documentation](https://phillipluther.github.io/jet-set).

## Bugs and Feature Requests

JetSet is a fledgling project. If you want to contribute or report an issue, please do! It's all tracked via GitHub.

[Report an Issue/Bug](https://github.com/phillipluther/jet-set/issues)
