import { InputExecutor } from './interfaces';
import { InputState, InputDelta, InputEvent } from '../types/ws';

/**
 * 摇杆输入执行器
 * 负责将摇杆输入状态转换为系统输入事件
 */
export class JoystickExecutor implements InputExecutor {
  /**
   * 应用完整输入状态
   * @param state 输入状态
   */
  applyState(state: InputState): void {
    // 摇杆状态处理（待实现）
    console.log('JoystickExecutor: Applying state', state.joystick);
  }
  
  /**
   * 应用输入增量
   * @param delta 输入增量
   */
  applyDelta(delta: InputDelta): void {
    // 摇杆增量处理（待实现）
    if (delta.joystick) {
      console.log('JoystickExecutor: Applying delta', delta.joystick);
    }
  }
  
  /**
   * 应用输入事件
   * @param event 输入事件
   */
  applyEvent(event: InputEvent): void {
    // 摇杆事件处理（待实现）
    if (event.type === 'joystick_move') {
      console.log('JoystickExecutor: Applying event', event.type, event.data);
    }
  }
  
  /**
   * 重置输入状态
   */
  reset(): void {
    // 摇杆状态重置（待实现）
    console.log('JoystickExecutor: Resetting');
  }
}