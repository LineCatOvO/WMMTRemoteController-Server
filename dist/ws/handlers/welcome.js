"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleWelcome = handleWelcome;
/**
 * 处理welcome消息
 * @param ws WebSocket连接
 * @param message welcome消息
 */
function handleWelcome(ws, message) {
    // 发送欢迎消息
    ws.send(JSON.stringify({ type: 'welcome', message: 'Connected to WMMT Controller Server' }));
}
//# sourceMappingURL=welcome.js.map