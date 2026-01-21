"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputState = void 0;
// 输入状态管理
exports.inputState = {
    keyboard: new Set(), // 存储当前按下的键
    mouse: {
        x: 0,
        y: 0,
        left: false,
        right: false,
        middle: false
    },
    joystick: {
        x: 0,
        y: 0,
        deadzone: 0.1,
        smoothing: 0.5
    },
    gyroscope: {
        pitch: 0,
        roll: 0,
        yaw: 0,
        deadzone: 1.0,
        smoothing: 0.3
    }
};
//# sourceMappingURL=state.js.map