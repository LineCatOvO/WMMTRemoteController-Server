import { WelcomeMessage } from '../../types/ws';

/**
 * 处理welcome消息
 * @param ws WebSocket连接
 * @param message welcome消息
 */
export function handleWelcome(ws: any, message: WelcomeMessage) {
  // 发送欢迎消息
  ws.send(JSON.stringify({ type: 'welcome', message: 'Connected to WMMT Controller Server' }));
}