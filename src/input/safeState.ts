import { InputState } from "../types/ws";

// 安全状态（客户端断开时回退到此状态）
export const safeState: InputState = {
    keyboard: new Set<string>(),
    mouse: {
        x: 0,
        y: 0,
        left: false,
        right: false,
        middle: false,
    },
    joystick: {
        x: 0,
        y: 0,
        deadzone: 0.1,
        smoothing: 0.5,
    },
};
