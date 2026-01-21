"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupHeartbeat = setupHeartbeat;
const config_1 = require("../config/config");
/**
 * 心跳管理器
 * @param ws WebSocket连接
 */
function setupHeartbeat(ws) {
    // 标记连接为活跃状态
    ws.isAlive = true;
    // 心跳定时器
    const heartbeatTimer = setInterval(() => {
        if (ws.readyState !== 1) { // WebSocket.OPEN = 1
            clearInterval(heartbeatTimer);
            return;
        }
        if (!ws.isAlive) {
            // 连接已超时，关闭连接
            console.log('Client heartbeat timeout, closing connection');
            clearInterval(heartbeatTimer);
            ws.terminate();
            return;
        }
        // 发送ping
        ws.isAlive = false;
        ws.ping();
    }, config_1.config.pingInterval);
    // 处理pong响应
    ws.on('pong', () => {
        ws.isAlive = true;
    });
    // 连接关闭时清理定时器
    ws.on('close', () => {
        clearInterval(heartbeatTimer);
    });
    // 连接错误时清理定时器
    ws.on('error', () => {
        clearInterval(heartbeatTimer);
    });
}
//# sourceMappingURL=heartbeat.js.map