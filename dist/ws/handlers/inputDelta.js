"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleInputDelta = handleInputDelta;
const state_1 = require("../../input/state");
/**
 * 处理输入增量消息
 * @param ws WebSocket连接
 * @param message 输入增量消息
 */
function handleInputDelta(ws, message) {
    // 更新输入状态
    if (message.data.keyboard) {
        if (message.data.keyboard.pressed) {
            message.data.keyboard.pressed.forEach(key => state_1.inputState.keyboard.add(key));
        }
        if (message.data.keyboard.released) {
            message.data.keyboard.released.forEach(key => state_1.inputState.keyboard.delete(key));
        }
    }
    if (message.data.mouse) {
        state_1.inputState.mouse = { ...state_1.inputState.mouse, ...message.data.mouse };
    }
    if (message.data.joystick) {
        state_1.inputState.joystick = { ...state_1.inputState.joystick, ...message.data.joystick };
    }
    if (message.data.gyroscope) {
        state_1.inputState.gyroscope = { ...state_1.inputState.gyroscope, ...message.data.gyroscope };
    }
    // 处理metadata（目前仅记录日志）
    if (message.metadata) {
        console.log(`Input delta received from ${message.metadata.clientId} at ${message.metadata.timestamp}`);
    }
}
//# sourceMappingURL=inputDelta.js.map