"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePing = handlePing;
/**
 * 处理ping消息
 * @param ws WebSocket连接
 * @param message ping消息
 */
function handlePing(ws, message) {
    // 发送pong响应
    ws.send(JSON.stringify({ type: 'pong' }));
}
//# sourceMappingURL=ping.js.map