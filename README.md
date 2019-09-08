# JetSet

A micro library for creating dynamically-static, observable state objects.

-----------------------------------------------

## Installation

    npm install --save jet-set

## Usage Highlights

This is a snapshot of some neat features; check out the [full documentation](https://phillipluther.github.io/jet-set) for all the nitty-gritty.

    import jetSet from 'jet-set';

    // create a data store with some defaults
    let fruitBasket = jetSet({
        apples: 3,
        oranges: 5,
        bananas: 6
    });

    // add new values just like a JS object
    fruitBasket.limes = 4;
    fruitBasket.lemons = 2;

    // add a derived/dynamic property
    fruitBasket.totalFruit = () => {
        let {apples, oranges, bananas, limes, lemons} = fruitBasket;
        return apples + oranges + bananas + limes + lemons;
    }

    // watch for changes, even on a dynamic value
    let buyMoreCitrus = () => {
        let {oranges, limes, lemons} = fruitBasket;

        if ((oranges < 2) || (limes < 2) || (lemons < 2)) {
            console.log('Buy more citrus!');
        }
    };

    fruitBasket.onChange('totalFruit', buyMoreCitrus);

    fruitBasket.lemons = 1;
    // console triggers above, "Buy more citrus!"


## About JetSet

This library aims to be three things: simple, tiny, and stateful.

* Interacting with a JetSet object should feel familiar, mirroring how you set and get properties on a vanilla JavaScript object.
* It's 496 bytes with no dependencies.
* It treats derived/dynamic properties as static snapshots, making it great for managing state.

Deeper details can be found in the [official documentation](https://phillipluther.github.io/jet-set).


## Bugs and Feature Requests

JetSet is a fledgling project. If you want to contribute or report an issue, please do! It's all tracked via GitHub.

[Report an Issue/Bug](https://github.com/phillipluther/jet-set/issues)
