# JetSet

A micro library for setting, getting, and watching application state.

-----------------------------------------------

## Installation

    npm install --save jet-set

## Usage

    import jetSet from 'jet-set';

    // create a data store with some defaults
    let fruitBasket = jetSet({
        apples: 3,
        oranges: 5,
        bananas: 6
    });

    // interact with your JetSet as if it was a regular ol' JS object.

    console.log(fruitBasket.apples); // 3
    fruitBasket.limes = 4;

    // make a little function reminding us to buy more oranges
    let checkOranges = (oranges) => {
        if (oranges < 2) {
            console.log('Oranges are running low!');
        }
    };

    // watch 'oranges' in our data store
    fruitBasket.on('oranges', checkOranges);

    fruitBasket.oranges = 1; // shows the warning above

    // stop watching 'oranges'
    fruitBasket.off('oranges', checkOranges);

    // add a derived/dynamic property
    fruitBasket.totalFruit = () => {
        let {apples, oranges, bananas, limes} = fruitBasket;
        return apples + oranges + bananas + limes;
    }

    // it behaves as a static value
    console.log(fruitBasket.totalFruit); // 14


## Neater Stuff

Since derived properties on our JetSet object act just like static values, we can watch/unwatch/use 'em like anything else. Continuing from above:

    // watch for changes to our 'totalFruit' derived prop
    fruitBasket.on('totalFruit', (newCount, oldCount) => {
        console.log(`Fruit count changed from ${oldCount} to ${newCount}.`);
    });

    fruitBasket.apples = 10;
    // console outputs 'Fruit count changed from 14 to 21.'

    let {totalFruit} = fruitBasket;
    totalFruit === 21; //true
    typeof totalFruit === 'function'; // false


## Bugs and Feature Requests

JetSet is a fledgling project. If you want to contribute or report an issue, please do! It's all tracked via GitHub.

[Report an Issue/Bug](https://github.com/phillipluther/jet-set/issues)
