const jetSet = require('../src/jet-set');

describe('Ignoring (state.offChange)', () => {
  let state;
  beforeEach(() => state = jetSet());

  test('hook is available on a store', () => {
    expect(state.offChange).not.toBeUndefined();
  });

  test('removes an action from an observed property', () => {
    let toggle = false;
    const toggler = () => toggle = !toggle;

    state.onChange('changeMe', toggler);
    state.changeMe = 'ok';

    // ensure the "on" handler is working before testing removal
    expect(toggle).toBe(true);

    state.offChange('changeMe', toggler);
    state.changeMe = 'ok, again';

    expect(toggle).toBe(true); // still
  });

  test('removes an action from the action stack for a property', () => {
    const toggler1 = () => true;
    const toggler2 = () => true;

    state.onChange('changeMe', toggler1);
    state.onChange('changeMe', toggler2);

    expect(state.watchers.changeMe.length).toEqual(2);

    state.offChange('changeMe', toggler1);
    expect(state.watchers.changeMe.length).toEqual(1);
  });
});
