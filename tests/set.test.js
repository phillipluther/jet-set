const jetSet = require('../src/jet-set');

describe('Setting (state.someProp = someVal)', function() {
  let state;
  beforeEach(() => state = jetSet());

  test('sets a value', () => {
    expect(state.someVal).toBeUndefined();

    state.someVal = true;
    expect(state.someVal).toBe(true);
  });

  test('creates an Object-like signature after setting', () => {
    state.someVal = true;
    state.someOtherVal = 'Y';

    expect(Object.keys(state).length).toEqual(2);
  });

  test('accepts primitive types like an Object', () => {
    state.someString = 'Y';
    state.someBool = true;
    state.someNum = 1;
    state.someNull = null;

    // expect no exceptions
  });

  test('accepts a function for creating derived properties', () => {
    state.derived = () => 1 + 1;
    //expect no exceptions
  });

  test('sets derived properties as static values', () => {
    state.derived = () => 1 + 1;
    expect(typeof state.derived).toEqual('number'); // not a function
  });

  test('overwrites an existing value', () => {
    state.val = 'Hello!';
    state.val = 'Changed';

    expect(state.val).toEqual('Changed');
  });

  test('triggers an action when an observed property changes', () => {
    let isChanged = false;
    state.onChange('changeMe', () => isChanged = true);
    state.changeMe = 'anything else';

    expect(isChanged).toBe(true);
  });

  test('triggers actions when an observerd property changes', () => {
    let isChanged1 = false;
    let isChanged2 = false;

    state.onChange('changeMe', () => isChanged1 = true);
    state.onChange('changeMe', () => isChanged2 = true);

    state.changeMe = 'ok';
    expect(isChanged1).toBe(true);
    expect(isChanged2).toBe(true);
  });

  test('takes no action when an observerd property does not change', () => {
    let isChanged = false;
    state.changeMe = true;

    state.onChange('changeMe', () => isChanged = true);
    state.changeMe = true;

    expect(isChanged).toBe(false);
  });
});
