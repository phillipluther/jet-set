# JetSet

A tiny, dynamic library for setting, getting, and watching application state. It behaves just like a Javascript object ({}).

1. [Installation](#installation)
2. [Usage](#usage)
3. [The Neat Stuff](#neatStuff)
4. [About the Project](#about)
5. [Issues and Feature Requests](#issues)

-----------------------------------------------

<a name="installation"></a>
## Installation

Via npm:

    npm install --save jet-set

Or, download jet-set.js or jet-set.min.js and include it.

    <script src="jetSet.min.js"></script>

<a name="usage"></a>
## Usage

Create a JetSet store.

    let appState = jetSet();

You can create a store with default values, too.

    let appState = jetSet({
        firstName: 'Benjamin',
        lastName: 'Benson',
        age: 20
    });

### Getting and Setting Values

You interact with your JetSet as if it was a regular ol' JS object.

    // get a value ... outputs 'Benjamin'
    console.log(appState.firstName);
    // set a value
    appState.middleName = 'Benjin';


### Watching for Changes

Your JetSet object has an `.on()` method for executing actions when values change.

    // create a handler for age changes
    let handleAgeChange = () => console.log('Age changed!');
    // attach it to our `age` property
    appState.on('age', handleAgeChange);

### Unwatching Changes

To stop watching our age value from the example above, just `.off()` it.

    appState.off('age', handleAgeChange);


<a name="neatStuff"></a>
## The Neat Stuff

You can create dynamic and derived values within a JetSet object, as well.

    appState.apples = 3;
    appState.oranges = 5;
    appState.totalFruit = () => appState.oranges + appState.apples;

Groovy. What's exceptionally neat is that you can `.on()` and `.off()` derived values as if they were static.

    appState.on('totalFruit', (totalFruit) => console.log('More fruit!', totalFruit));
    appState.apples = 10;

    // console outputs "More fruit! 15"


<a name="about"></a>
## Good Lord; Another State Library?

Yup. A dead-simple-yet-powerful one. In JetSet everything behaves as a static value, even if it's derived from other things or a function. No reducers, no actions ... just a straight-forward API for getting, setting, watching, and unwatching.

### Project Goals

JetSet serves specific purposes. It's not right for everything. Specifically, it aims to be:

#### Simple

Interact with your JetSet as a JavaScript object. It has added convenience for observing and ignoring values via `.on()` and `.off()`.

JetSet provides the bare essentials for creating unopinionated, semi-advanced state management and isn't trying to go over-the-top with a slew of convenience wrappers.

The answer to, "Well, can I X when Y if Z?" is YES ... programmatically.

#### Tiny

JetSet is about 600 bytes. I'm working to shave that down further, but this lib wants to be lean.


<a name="issues"></a>
## Bugs and Feature Requests

JetSet is a fledgling project. If you want to contribute or report an issue, please do! It's all tracked via GitHub.

[Report an Issue/Bug](https://github.com/phillipluther/jet-set/issues)
