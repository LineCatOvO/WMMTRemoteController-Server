/**
 * Test utility functions for creating test states
 */
import { InputState } from '../../src/types/ws';

export class TestUtils {
  /**
   * Create a complete InputState object with all required properties
   * @param overrides Partial state to override default values
   * @returns Complete InputState object
   */
  static createInputState(overrides?: Partial<InputState>): InputState {
    return {
      keyboard: new Set(),
      mouse: { x: 0, y: 0, left: false, right: false, middle: false },
      joystick: { x: 0, y: 0, deadzone: 0, smoothing: 0 },
      gyroscope: { pitch: 0, roll: 0, yaw: 0, deadzone: 0, smoothing: 0 },
      ...overrides
    };
  }

  /**
   * Create a complete test state with frameId and optional keyboard state
   * @param frameId Frame ID
   * @param pressedKeys Array of pressed keys
   * @returns Complete InputState object
   */
  static createTestState(frameId: number, pressedKeys?: string[]): InputState {
    return {
      frameId,
      keyboard: new Set(pressedKeys || []),
      mouse: { x: 0, y: 0, left: false, right: false, middle: false },
      joystick: { x: 0, y: 0, deadzone: 0, smoothing: 0 },
      gyroscope: { pitch: 0, roll: 0, yaw: 0, deadzone: 0, smoothing: 0 }
    };
  }
}
