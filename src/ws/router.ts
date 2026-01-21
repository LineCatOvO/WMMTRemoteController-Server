import { WsMessage } from '../types/ws';
import { handleInput } from './handlers/input';
import { handleInputDelta } from './handlers/inputDelta';
import { handleInputEvent } from './handlers/inputEvent';
import { handleConfigGet, handleConfigSet } from './handlers/config';
import { handlePing } from './handlers/ping';
import { handleWelcome } from './handlers/welcome';
import { handleLatencyProbe } from './handlers/latencyProbe';

// 消息处理器映射
const handlers: Record<string, (ws: any, message: any) => void> = {
  welcome: handleWelcome,
  input: handleInput,
  input_delta: handleInputDelta,
  input_event: handleInputEvent,
  config_get: handleConfigGet,
  config_set: handleConfigSet,
  latency_probe: handleLatencyProbe,
  ping: handlePing
};

/**
 * 处理WebSocket消息
 * @param ws WebSocket连接
 * @param message 消息对象
 */
export function handleMessage(ws: any, message: WsMessage) {
  const handler = handlers[message.type];
  
  if (handler) {
    try {
      handler(ws, message);
    } catch (error) {
      console.error(`Error handling message type ${message.type}:`, error);
    }
  } else {
    console.log('Unknown message type:', message.type);
    // 发送错误消息
    ws.send(JSON.stringify({
      type: 'error',
      code: 'UNSUPPORTED_MESSAGE_TYPE',
      message: `Unsupported message type: ${message.type}`
    }));
  }
}