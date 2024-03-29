const Obj = Object;
const _eval = (val) => (typeof val === 'function' ? val() : val);

const createStore = () => {
  return Obj.create({
    snapshot: {},
    watchers: {},
    onChange(prop, action) {
      const { watchers } = this;

      watchers[prop] = watchers[prop] || [];
      watchers[prop].push(action);
      this.snapshot[prop] = _eval(this[prop]);
    },
    offChange(prop, actionToRemove) {
      const { watchers } = this;
      watchers[prop] = watchers[prop].filter(
        (action) => action !== actionToRemove
      );
    },
  });
};

module.exports = (defaults) =>
  new Proxy(Obj.assign(createStore(), defaults), {
    set(store, prop, val) {
      let { watchers, snapshot } = store;

      store[prop] = val;

      for (let prop in watchers) {
        const oldVal = snapshot[prop];
        const newVal = _eval(store[prop]);
        const actions = watchers[prop];

        if (newVal !== oldVal) {
          actions.map((action) => action(newVal, oldVal));
          snapshot[prop] = newVal;
        }
      }

      return true;
    },
    get(store, prop) {
      return Obj.hasOwnProperty.call(store, prop) ? _eval(store[prop]) : store[prop];
    },
  });
