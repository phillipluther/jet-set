# JetSet

A tiny, simple, powerful, dynamic library for setting, getting, and watching application state.

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

    <script src="jet-set.min.js"></script>

<a name="usage"></a>
## Usage

First, init JetSet.

    let appState = new JetSet();

### Setting Values `.set()`

    appState.set({
        firstName: 'Jack',
        lastName: 'Jackson',
        age: 28
    });

### Getting Values `.get()`

    let myValue = appState.get('firstName');

`myValue` is now `Jack`.

You can get as many values as you want.

    let myValues = appState.get('firstName', 'lastName', 'age');

`myValues` is now an object that looks like this:

    {
        firstName: 'Jack',
        lastName: 'Jackson',
        age: 28
    }

### Watching for Changes `.on()`

    // create a callback to execute when age changes
    let canDrive = (age) => {
        if (age >= 16) {
            console.log('Drive yourself!');
        } else {
            console.log('Enjoy the ride ...');
        }
    };

    // attach the callback to age
    appState.on({
        age: canDrive
    });

### Unwatching Watched Changes `.off()`

To stop watching our age value from the example above, just off it.

    appState.off({
        age: canDrive
    });

<a name="neatStuff"></a>
## The Neat Stuff

You can create dynamic and derived values within a JetSet instance, as well.

    appState.set({
        apples: 3,
        oranges: 5,
        bestFruit: () => {
            let {apples, oranges} = this.get('apples', 'oranges');
            // oranges win in a tie
            return (apples > oranges) ? 'Apples!' : 'Oranges!';
        }
    });

Groovy. What's exceptionally neat is that you can watch derived values as if they were static.

    appState.watch({
        bestFruit: (fruit) => console.log('Best fruit?', fruit);
    });

    appState.set({
        apples: 100
    });

As you've watched the `bestFruit` property and updated `apples` -- which `bestFruit` is derived from -- your callback will execute.

<a name="about"></a>
## Good Lord; Another State Library?

Yup. A dead-simple-yet-powerful one. In JetSet everything behaves as a static value, even if it's derived from other things or a function. No reducers, no actions ... just a straight-forward API for getting, setting, watching, and unwatching.

### Project Goals

JetSet serves specific purposes. It's not right for everything. Specifically, it aims to be:

#### Simple

The API is small. A JetSet instance does four things: get, set, on, and off. It provides the bare essentials for creating semi-advanced state management and isn't trying to go over-the-top with convenience.

The answer to, "Well, can I X when Y if Z?" is YES ... programmatically. Not via the library itself.

#### Tiny

JetSet is about 800 bytes. I'm working to shave that down further, but this lib wants to be lean.

<a name="issues"></a>
## Bugs and Feature Requests

JetSet is a fledgling project. If you want to contribute or report an issue, please do! It's all tracked via GitHub.

[Report an Issue/Bug](https://github.com/phillipluther/jet-set/issues)
