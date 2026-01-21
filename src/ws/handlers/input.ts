import { InputMessage } from '../../types/ws';
import { inputState } from '../../input/state';

/**
 * 处理输入消息
 * @param ws WebSocket连接
 * @param message 输入消息
 */
export function handleInput(ws: any, message: InputMessage) {
  // 更新输入状态
  if (message.data.keyboard) {
    // 更新键盘状态
    inputState.keyboard = new Set(message.data.keyboard);
  }
  
  if (message.data.mouse) {
    // 更新鼠标状态
    inputState.mouse = { ...inputState.mouse, ...message.data.mouse };
  }
  
  if (message.data.joystick) {
    // 更新摇杆状态
    inputState.joystick = { ...inputState.joystick, ...message.data.joystick };
  }
  
  if (message.data.gyroscope) {
    // 更新陀螺仪状态
    inputState.gyroscope = { ...inputState.gyroscope, ...message.data.gyroscope };
  }
  
  // 处理metadata（目前仅记录日志）
  if (message.metadata) {
    console.log(`Input received from ${message.metadata.clientId} at ${message.metadata.timestamp}`);
  }
}