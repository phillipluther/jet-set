function JetSet(defaults) {
    var
        watchers = {},
        store = {},
        snapshot = {},
        instance = this;

    //
    //
    function iterateObject(obj, callback) {
        var
            keys = Object.keys(obj),
            counter = keys.length,
            key;

        while (counter--) {
            key = keys[counter];
            callback(key, obj[key]);
        }
    }

    //
    //
    function iterateArray(arr, callback) {
        var counter = arr.length;
        while (counter--) {
            callback(arr[counter], counter);
        }
    }

    //
    //
    function notifyWatchers(updated) {
        iterateArray(updated, function(setting) {
            iterateArray(watchers[setting], function(action) {
                action(store[setting]());
            });
        });
    }

    //
    //
    function handleUpdates(isSilent) {
        var
            previousVals = snapshot,
            newVals = {},
            diffs = [];

        iterateObject(store, function(key, val) {
            var
                newVal = val(),
                isChanged = (newVal !== previousVals[key]),
                isWatched = watchers[key];

            newVals[key] = newVal;

            if (isChanged && isWatched) {
                diffs.push(key);
            }

        });

        snapshot = newVals;

        if (!isSilent) {
            notifyWatchers(diffs);
        }
    }

    // takes an object of key/val pairs to update our store. values can be
    // explicit (strings, numbers, bools) or derived (functions).
    //
    // Example:
    //      jetSet.set({
    //          name: 'Phil',
    //          hands: 2,
    //          fingersPerHand: 5,
    //          totalFingers: function() {
    //              let hands = jetSet.get('hands');
    //              let fingersPer = jetSet.get('fingersPerHand');
    //              return hands * fingersPer;
    //          },
    //      });
    //
    // it also checks our watchers and executes any actions once the
    // settings have been updated
    instance.set = function(keyedValues, isSilent) {
        iterateObject(keyedValues, function(key, val) {
            // normalize everything into a function; makes processing this
            // easier and less conditional later
            var storedVal = (typeof val === 'function') ? val : function() {
                return val;
            };

            storedVal = storedVal.bind(instance);
            store[key] = storedVal;
        });

        handleUpdates(isSilent);

        return instance;
    };

    //
    //
    instance.get = function(/* arguments */) {
        var
            requested = {},
            settings = [].slice.call(arguments);

        if (settings.length === 1) {
            return store[settings[0]]();
        }

        iterateArray(settings, function(setting) {
            requested[setting] = store[setting]();
        });

        return requested;
    };

    //
    //
    instance.on = function(keyedActions) {
        iterateObject(keyedActions, function(key, action) {
            watchers[key] = watchers[key] || [];
            watchers[key].push(action);
        });

        return instance;
    };

    //
    //
    instance.off = function(keyedActions) {
        iterateObject(keyedActions, function(setting, actionToRemove) {
            var remainingActions;

            if (watchers[setting]) {
                remainingActions = [];

                iterateArray(watchers[setting], function(action) {
                    if (action !== actionToRemove) {
                        remainingActions.push(action);
                    }
                });

                watchers[setting] = remainingActions;
            }
        });

        return instance;
    };

    //
    defaults = (defaults) || {};
    this.set(defaults, 1);
}

module.exports = JetSet;
