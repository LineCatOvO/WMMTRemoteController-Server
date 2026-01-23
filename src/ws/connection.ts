import { setupHeartbeat } from '../heartbeat/heartbeat';
import { handleMessage } from './router';

/**
 * 处理单个WebSocket连接的生命周期
 * @param ws WebSocket连接对象
 */
export function handleConnection(ws: any) {
  // 发送欢迎消息
  ws.send(JSON.stringify({ type: 'welcome', message: 'Connected to WMMT Controller Server' }));
  
  // 设置心跳检测
  setupHeartbeat(ws);
  
  // 处理客户端消息
  ws.on('message', (data: any) => {
    try {
      // 正确处理WebSocket消息数据类型
      const messageStr = typeof data === 'string' ? data : data.toString();
      const message = JSON.parse(messageStr);
      
      // 检查消息是否为null或undefined
      if (message === null || message === undefined) {
        console.debug('Ignoring null or undefined message:', data);
        return;
      }
      
      handleMessage(ws, message);
    } catch (error: any) {
      console.error('Error parsing message:', error, 'Original message:', data);
      // 发送解析错误消息给客户端
      ws.send(JSON.stringify({
        type: 'error',
        code: 'PARSE_ERROR',
        message: 'Invalid JSON format'
      }));
    }
  });
  
  // 客户端断开连接
  ws.on('close', () => {
    // 在测试环境中，避免在服务器关闭后执行日志和模块操作
    // 只在正常运行时执行这些操作
    if (process.env.NODE_ENV !== 'test') {
      if (typeof console !== 'undefined') {
        console.log('Client disconnected');
        // 回退到安全状态
        try {
          revertToSafeState();
        } catch (error) {
          console.debug('Failed to revert to safe state:', error);
        }
      }
    }
  });
  
  // 连接错误
  ws.on('error', (error: any) => {
    console.error('Client error:', error);
  });
}

/**
 * 回退到安全状态
 */
function revertToSafeState() {
  // 避免在测试环境销毁后执行日志和导入
  if (typeof console !== 'undefined') {
    console.log('Reverting to safe state');
    // 导入需要在运行时使用的模块，避免循环依赖
    try {
      // 检查是否能安全访问模块系统
      if (typeof require === 'function') {
        const { inputState } = require('../input/state');
        const { safeState } = require('../input/safeState');
        
        // 重置输入状态到安全状态
        if (safeState && safeState.keyboard) {
          inputState.keyboard = new Set(safeState.keyboard);
          inputState.mouse = { ...safeState.mouse };
          inputState.joystick = { ...safeState.joystick };
        }
      }
    } catch (error) {
      console.debug('Failed to revert to safe state (possibly test environment destroyed):', error);
    }
  }
}