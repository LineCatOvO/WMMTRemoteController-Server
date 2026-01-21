"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeState = void 0;
// 安全状态（客户端断开时回退到此状态）
exports.safeState = {
    keyboard: new Set(),
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
//# sourceMappingURL=safeState.js.map