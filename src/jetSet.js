
//
//
function _val(val) {
    return (typeof val === 'function') ? val() : val;
}

//
//
function createStore(defaults) {

    function Store() {
        for (let prop in defaults) {
            this[prop] = defaults[prop];
        }
    }

    let prototypeHooks = {
        watchers: {},
        snapshot: {},

        //
        //
        on: function (prop, action) {
            let watchers = this.watchers;
            watchers[prop] = watchers.prop || [];
            watchers[prop].push(action);
            this.snapshot[prop] = _val(this[prop]);
        },
        //
        //
        off: function (prop, actionToRemove) {
            this.watchers[prop] = this.watchers[prop].filter(
                (action) => action !== actionToRemove
            );
        },
    };

    for (let hook in prototypeHooks) {
        Store.prototype[hook] = prototypeHooks[hook];
    }

    let store = new Store();

    return store;
}

//
//
function jetSet(defaults) {
    let store = createStore(defaults);

    return new Proxy(store, {
        set: (store, prop, val) => {
            store[prop] = val;

            let watchers = store.watchers;

            for (let prop in watchers) {
                let newVal = _val(store[prop]);
                let actions = watchers[prop];
                let oldVal = store.snapshot[prop];

                if (newVal !== oldVal) {
                    actions.map((action) => action(newVal, oldVal));
                    store.snapshot[prop] = newVal;
                }
            };

            return true;
        },
        //
        get: (store, prop) => {
            return store.hasOwnProperty(prop) ? _val(store[prop]) : store[prop];
        }
    });
};

module.exports = jetSet;
