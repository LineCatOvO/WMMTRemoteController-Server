import { InputMessage } from '../../types/ws';

/**
 * 处理输入消息
 * @param ws WebSocket连接
 * @param message 输入消息
 */
export function handleInput(ws: any, message: InputMessage) {
  // 获取全局状态存储实例
  const stateStore = (global as any).stateStore;
  
  // 检查状态存储是否可用
  if (!stateStore) {
    console.error('StateStore not available');
    return;
  }
  
  // 存储状态
  const stored = stateStore.storeState(message.data);
  
  if (stored) {
    // 处理metadata
    if (message.metadata) {
      console.log(`Input received from ${message.metadata.clientId} at ${message.metadata.timestamp}`);
    }
    
    // 发送ACK消息
    const ackMessage = {
      type: 'ack',
      data: {
        sequenceNumber: message.data?.frameId || Date.now(),
        timestamp: Date.now(),
        status: 'success'
      }
    };
    
    try {
      ws.send(JSON.stringify(ackMessage));
      console.log(`ACK sent for sequence ${message.data?.frameId || Date.now()}`);
    } catch (error) {
      console.error('Error sending ACK:', error);
    }
  } else {
    // 发送错误ACK消息
    const errorAckMessage = {
      type: 'ack',
      data: {
        sequenceNumber: message.data?.frameId || Date.now(),
        timestamp: Date.now(),
        status: 'error',
        reason: 'Invalid state'
      }
    };
    
    try {
      ws.send(JSON.stringify(errorAckMessage));
      console.error(`Error ACK sent for sequence ${message.data?.frameId || Date.now()}`);
    } catch (error) {
      console.error('Error sending error ACK:', error);
    }
  }
}