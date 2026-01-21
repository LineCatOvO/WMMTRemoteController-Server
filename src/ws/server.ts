// 使用正确的ws导入方式
const WebSocket = require('ws');
import { handleConnection } from './connection';

let wss: any = null;

/**
 * 创建并启动WebSocket服务器
 */
export function startWsServer() {
  wss = new WebSocket.WebSocketServer({ port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000 });
  
  wss.on('connection', (ws: any) => {
    console.log('Client connected');
    handleConnection(ws);
  });
  
  wss.on('error', (error: any) => {
    console.error('WebSocket server error:', error);
  });
  
  wss.on('close', () => {
    console.log('WebSocket server closed');
  });
  
  console.log(`WMMT Controller Server is running on ws://localhost:${process.env.PORT || 3000}`);
}

/**
 * 关闭WebSocket服务器
 */
export function stopWsServer() {
  if (wss) {
    wss.close();
    wss = null;
  }
}