"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleInput = handleInput;
const state_1 = require("../../input/state");
/**
 * 处理输入消息
 * @param ws WebSocket连接
 * @param message 输入消息
 */
function handleInput(ws, message) {
    // 更新输入状态
    if (message.data.keyboard) {
        // 更新键盘状态
        state_1.inputState.keyboard = new Set(message.data.keyboard);
    }
    if (message.data.mouse) {
        // 更新鼠标状态
        state_1.inputState.mouse = { ...state_1.inputState.mouse, ...message.data.mouse };
    }
    if (message.data.joystick) {
        // 更新摇杆状态
        state_1.inputState.joystick = { ...state_1.inputState.joystick, ...message.data.joystick };
    }
    if (message.data.gyroscope) {
        // 更新陀螺仪状态
        state_1.inputState.gyroscope = { ...state_1.inputState.gyroscope, ...message.data.gyroscope };
    }
    // 处理metadata（目前仅记录日志）
    if (message.metadata) {
        console.log(`Input received from ${message.metadata.clientId} at ${message.metadata.timestamp}`);
    }
}
//# sourceMappingURL=input.js.map