"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLatencyProbe = handleLatencyProbe;
/**
 * 处理延迟测量消息
 * @param ws WebSocket连接
 * @param message 延迟测量消息
 */
function handleLatencyProbe(ws, message) {
    // 发送延迟测量响应
    ws.send(JSON.stringify({
        type: 'latency_probe_response',
        timestamp: Date.now(),
        clientTimestamp: message.timestamp
    }));
}
//# sourceMappingURL=latencyProbe.js.map