import { PingMessage } from '../../types/ws';

/**
 * 处理ping消息
 * @param ws WebSocket连接
 * @param message ping消息
 */
export function handlePing(ws: any, message: PingMessage) {
  // 发送pong响应
  ws.send(JSON.stringify({ type: 'pong' }));
}