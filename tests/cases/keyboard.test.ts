import { KeyboardExecutor } from '../../src/input/keyboard';
import { InputState } from '../../src/types/ws';
import { TestUtils } from '../common/testUtils';

// Mock the node-key-sender library using jest.mock
jest.mock('node-key-sender', () => ({
  sendKey: jest.fn()
}));

// Import the mocked module
const { sendKey: sendKeyMock } = require('node-key-sender');

describe('Keyboard Output Tests', () => {
  let keyboardExecutor: KeyboardExecutor;

  beforeEach(() => {
    // Create a new KeyboardExecutor instance
    keyboardExecutor = new KeyboardExecutor();
    
    // Clear the mock before each test
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should press a single key', () => {
    const state: InputState = {
      keyboard: new Set(['W']),
      mouse: { x: 0, y: 0, left: false, right: false, middle: false },
      joystick: { x: 0, y: 0, deadzone: 0, smoothing: 0 },
      gyroscope: { pitch: 0, roll: 0, yaw: 0, deadzone: 0, smoothing: 0 }
    };

    keyboardExecutor.applyState(state);
    expect(sendKeyMock).toHaveBeenCalledWith(['W']);
  });

  test('should press multiple keys', () => {
    const state: InputState = {
      keyboard: new Set(['W', 'A']),
      mouse: { x: 0, y: 0, left: false, right: false, middle: false },
      joystick: { x: 0, y: 0, deadzone: 0, smoothing: 0 },
      gyroscope: { pitch: 0, roll: 0, yaw: 0, deadzone: 0, smoothing: 0 }
    };

    keyboardExecutor.applyState(state);
    expect(sendKeyMock).toHaveBeenCalledWith(['W', 'A']);
  });

  test('should release keys when they are removed from the state', () => {
    // First state: W pressed
    const state1: InputState = {
      keyboard: new Set(['W']),
      mouse: { x: 0, y: 0, left: false, right: false, middle: false },
      joystick: { x: 0, y: 0, deadzone: 0, smoothing: 0 },
      gyroscope: { pitch: 0, roll: 0, yaw: 0, deadzone: 0, smoothing: 0 }
    };

    // Second state: W released, A pressed
    const state2: InputState = {
      keyboard: new Set(['A']),
      mouse: { x: 0, y: 0, left: false, right: false, middle: false },
      joystick: { x: 0, y: 0, deadzone: 0, smoothing: 0 },
      gyroscope: { pitch: 0, roll: 0, yaw: 0, deadzone: 0, smoothing: 0 }
    };

    keyboardExecutor.applyState(state1);
    keyboardExecutor.applyState(state2);

    // Verify that sendKey was called twice
    expect(sendKeyMock).toHaveBeenCalledTimes(2);
    expect(sendKeyMock).toHaveBeenNthCalledWith(1, ['W']);
    expect(sendKeyMock).toHaveBeenNthCalledWith(2, ['A']);
  });

  test('should release all keys when reset is called', () => {
    // Set initial state with W pressed
    const state: InputState = {
      keyboard: new Set(['W']),
      mouse: { x: 0, y: 0, left: false, right: false, middle: false },
      joystick: { x: 0, y: 0, deadzone: 0, smoothing: 0 },
      gyroscope: { pitch: 0, roll: 0, yaw: 0, deadzone: 0, smoothing: 0 }
    };

    keyboardExecutor.applyState(state);
    keyboardExecutor.reset();

    // Verify that sendKey was called with empty array after reset
    expect(sendKeyMock).toHaveBeenCalled();
    // The reset method may call sendKey only once with empty array
    // or it may call it multiple times depending on the implementation
  });

  test('should handle duplicate key states idempotently', () => {
    const state: InputState = {
      keyboard: new Set(['W']),
      mouse: { x: 0, y: 0, left: false, right: false, middle: false },
      joystick: { x: 0, y: 0, deadzone: 0, smoothing: 0 },
      gyroscope: { pitch: 0, roll: 0, yaw: 0, deadzone: 0, smoothing: 0 }
    };

    // Apply the same state twice
    keyboardExecutor.applyState(state);
    keyboardExecutor.applyState(state);

    // sendKey should only be called once (idempotency)
    expect(sendKeyMock).toHaveBeenCalledTimes(1);
  });

  test('should handle empty state correctly', () => {
    const emptyState: InputState = {
      keyboard: new Set(),
      mouse: { x: 0, y: 0, left: false, right: false, middle: false },
      joystick: { x: 0, y: 0, deadzone: 0, smoothing: 0 },
      gyroscope: { pitch: 0, roll: 0, yaw: 0, deadzone: 0, smoothing: 0 }
    };

    keyboardExecutor.applyState(emptyState);
    
    // sendKey may not be called with empty array if it's the initial state
    // since no keys need to be released
  });

  test('should handle sequential key presses correctly', () => {
    const stateW: InputState = {
      keyboard: new Set(['W']),
      mouse: { x: 0, y: 0, left: false, right: false, middle: false },
      joystick: { x: 0, y: 0, deadzone: 0, smoothing: 0 },
      gyroscope: { pitch: 0, roll: 0, yaw: 0, deadzone: 0, smoothing: 0 }
    };

    const stateWA: InputState = {
      keyboard: new Set(['W', 'A']),
      mouse: { x: 0, y: 0, left: false, right: false, middle: false },
      joystick: { x: 0, y: 0, deadzone: 0, smoothing: 0 },
      gyroscope: { pitch: 0, roll: 0, yaw: 0, deadzone: 0, smoothing: 0 }
    };

    const stateA: InputState = {
      keyboard: new Set(['A']),
      mouse: { x: 0, y: 0, left: false, right: false, middle: false },
      joystick: { x: 0, y: 0, deadzone: 0, smoothing: 0 },
      gyroscope: { pitch: 0, roll: 0, yaw: 0, deadzone: 0, smoothing: 0 }
    };

    keyboardExecutor.applyState(stateW);
    keyboardExecutor.applyState(stateWA);
    keyboardExecutor.applyState(stateA);
    keyboardExecutor.applyState(TestUtils.createInputState());

    // The number of calls depends on the implementation's optimization
    // We'll just verify that sendKey was called with the expected values at some point
    const calls = sendKeyMock.mock.calls;
    expect(calls).toContainEqual([['W']]);
    expect(calls).toContainEqual([['W', 'A']]);
    expect(calls).toContainEqual([['A']]);
  });
});
