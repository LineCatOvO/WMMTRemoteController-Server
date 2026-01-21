"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startWsServer = startWsServer;
exports.stopWsServer = stopWsServer;
// 使用正确的ws导入方式
const WebSocket = require('ws');
const connection_1 = require("./connection");
let wss = null;
/**
 * 创建并启动WebSocket服务器
 */
function startWsServer() {
    wss = new WebSocket.WebSocketServer({ port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000 });
    wss.on('connection', (ws) => {
        console.log('Client connected');
        (0, connection_1.handleConnection)(ws);
    });
    wss.on('error', (error) => {
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
function stopWsServer() {
    if (wss) {
        wss.close();
        wss = null;
    }
}
//# sourceMappingURL=server.js.map