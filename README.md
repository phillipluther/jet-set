# JetSet

A tiny, dynamic library for setting, getting, and watching application state. It behaves just like a Javascript object { ... }.

-----------------------------------------------

## Installation

    npm install --save jet-set

## Usage

Create a JetSet store.

    let appState = jetSet();

You can create a store with default values, too.

    let appState = jetSet({
        firstName: 'Benjamin',
        lastName: 'Benson',
        age: 20
    });

You interact with your JetSet as if it was a regular ol' JS object.

    // get a value ... outputs 'Benjamin'
    console.log(appState.firstName);

    // set a value
    appState.middleName = 'Benjin';


Your JetSet object has an `.on()` method for executing actions when values change.

    // create a handler for age changes
    let handleAgeChange = () => console.log('Age changed!');

    // attach it to our `age` property
    appState.on('age', handleAgeChange);

To stop watching our age value from the example above, `.off()` it.

    appState.off('age', handleAgeChange);


## The Neat Stuff

You can create dynamic and derived values within a JetSet object, as well.

    appState.apples = 3;
    appState.oranges = 5;
    appState.totalFruit = () => appState.oranges + appState.apples;

    // outputs 8
    console.log(appState.totalFruit);

Groovy. What's exceptionally neat is that you can `.on()` and `.off()` derived values as if they were static.

    ... ctd from above ...

    appState.on('totalFruit', (totalFruit) => console.log('More fruit!', totalFruit));
    appState.apples = 10;

    // console outputs "More fruit! 15"


## Bugs and Feature Requests

JetSet is a fledgling project. If you want to contribute or report an issue, please do! It's all tracked via GitHub.

[Report an Issue/Bug](https://github.com/phillipluther/jet-set/issues)
