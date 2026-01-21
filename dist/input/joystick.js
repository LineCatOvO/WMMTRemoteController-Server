"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoystickExecutor = void 0;
/**
 * 摇杆输入执行器
 * 负责将摇杆输入状态转换为系统输入事件
 */
class JoystickExecutor {
    /**
     * 应用完整输入状态
     * @param state 输入状态
     */
    applyState(state) {
        // 摇杆状态处理（待实现）
        console.log('JoystickExecutor: Applying state', state.joystick);
    }
    /**
     * 应用输入增量
     * @param delta 输入增量
     */
    applyDelta(delta) {
        // 摇杆增量处理（待实现）
        if (delta.joystick) {
            console.log('JoystickExecutor: Applying delta', delta.joystick);
        }
    }
    /**
     * 应用输入事件
     * @param event 输入事件
     */
    applyEvent(event) {
        // 摇杆事件处理（待实现）
        if (event.type === 'joystick_move') {
            console.log('JoystickExecutor: Applying event', event.type, event.data);
        }
    }
    /**
     * 重置输入状态
     */
    reset() {
        // 摇杆状态重置（待实现）
        console.log('JoystickExecutor: Resetting');
    }
}
exports.JoystickExecutor = JoystickExecutor;
//# sourceMappingURL=joystick.js.map