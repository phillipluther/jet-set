
let Obj = Object;

//
//
function _eval(val) {
    return (typeof val === 'function') ? val() : val;
}

//
//
function createStore() {
    return Obj.create({
        snapshot: {},
        watchers: {},

        //
        //
        on: function (prop, action) {
            let $this = this;
            let watchers = $this.watchers;

            watchers[prop] = watchers[prop] || [];
            watchers[prop].push(action);
            $this.snapshot[prop] = _eval($this[prop]);
        },
        //
        //
        off: function (prop, actionToRemove) {
            let watchers = this.watchers;
            watchers[prop] = watchers[prop].filter(
                (action) => action !== actionToRemove
            );
        },
    });
}

//
//
function jetSet(defaults) {
    let store = createStore();
    Obj.assign(store, defaults);

    return new Proxy(store, {
        set: (store, prop, val) => {
            let watchers = store.watchers;
            let snapshot = store.snapshot;

            store[prop] = val;

            for (let prop in watchers) {
                let oldVal = snapshot[prop];
                let newVal = _eval(store[prop]);
                let actions = watchers[prop];

                if (newVal !== oldVal) {
                    actions.map((action) => action(newVal, oldVal));
                    snapshot[prop] = newVal;
                }
            }

            return true;
        },
        //
        get: (store, prop) => {
            return store.hasOwnProperty(prop) ? _eval(store[prop]) : store[prop];
        }
    });
}

module.exports = jetSet;
