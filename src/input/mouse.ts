import { InputExecutor } from './interfaces';
import { InputState, InputDelta, InputEvent } from '../types/ws';

/**
 * 鼠标输入执行器
 * 负责将鼠标输入状态转换为系统鼠标事件
 */
export class MouseExecutor implements InputExecutor {
  /**
   * 应用完整输入状态
   * @param state 输入状态
   */
  applyState(state: InputState): void {
    // 鼠标状态处理（待实现）
    console.log('MouseExecutor: Applying state', state.mouse);
  }
  
  /**
   * 应用输入增量
   * @param delta 输入增量
   */
  applyDelta(delta: InputDelta): void {
    // 鼠标增量处理（待实现）
    if (delta.mouse) {
      console.log('MouseExecutor: Applying delta', delta.mouse);
    }
  }
  
  /**
   * 应用输入事件
   * @param event 输入事件
   */
  applyEvent(event: InputEvent): void {
    // 鼠标事件处理（待实现）
    if (event.type === 'mouse_move' || event.type === 'mouse_click') {
      console.log('MouseExecutor: Applying event', event.type, event.data);
    }
  }
  
  /**
   * 重置输入状态
   */
  reset(): void {
    // 鼠标状态重置（待实现）
    console.log('MouseExecutor: Resetting');
  }
}