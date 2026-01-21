"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMessage = handleMessage;
const input_1 = require("./handlers/input");
const inputDelta_1 = require("./handlers/inputDelta");
const inputEvent_1 = require("./handlers/inputEvent");
const config_1 = require("./handlers/config");
const ping_1 = require("./handlers/ping");
const welcome_1 = require("./handlers/welcome");
const latencyProbe_1 = require("./handlers/latencyProbe");
// 消息处理器映射
const handlers = {
    welcome: welcome_1.handleWelcome,
    input: input_1.handleInput,
    input_delta: inputDelta_1.handleInputDelta,
    input_event: inputEvent_1.handleInputEvent,
    config_get: config_1.handleConfigGet,
    config_set: config_1.handleConfigSet,
    latency_probe: latencyProbe_1.handleLatencyProbe,
    ping: ping_1.handlePing
};
/**
 * 处理WebSocket消息
 * @param ws WebSocket连接
 * @param message 消息对象
 */
function handleMessage(ws, message) {
    const handler = handlers[message.type];
    if (handler) {
        try {
            handler(ws, message);
        }
        catch (error) {
            console.error(`Error handling message type ${message.type}:`, error);
        }
    }
    else {
        console.log('Unknown message type:', message.type);
        // 发送错误消息
        ws.send(JSON.stringify({
            type: 'error',
            code: 'UNSUPPORTED_MESSAGE_TYPE',
            message: `Unsupported message type: ${message.type}`
        }));
    }
}
//# sourceMappingURL=router.js.map