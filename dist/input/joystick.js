"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoystickExecutor = void 0;
/**
 * Xbox 360手柄输入执行器
 * 负责将手柄输入状态转换为系统输入事件
 */
class JoystickExecutor {
    constructor() {
        // 记录当前手柄状态
        this.currentJoystickState = {
            axes: {
                lx: 0, ly: 0, rx: 0, ry: 0
            },
            buttons: {
                a: false, b: false, x: false, y: false,
                lb: false, rb: false, back: false, start: false,
                ls: false, rs: false,
                up: false, down: false, left: false, right: false
            },
            triggers: {
                lt: 0, rt: 0
            }
        };
        // 虚拟设备连接状态
        this.isDeviceConnected = false;
    }
    /**
     * 应用完整输入状态
     * @param state 输入状态
     */
    applyState(state) {
        if (state.joystick) {
            // 更新轴状态
            this.updateAxes(state.joystick);
            // 这里可以添加按钮和扳机的处理
            // 提交整帧状态到虚拟设备
            this.submitFullState();
        }
    }
    /**
     * 应用输入增量
     * @param delta 输入增量
     */
    applyDelta(delta) {
        if (delta.joystick) {
            console.log('JoystickExecutor: Applying delta', delta.joystick);
            // 增量处理（待实现）
        }
    }
    /**
     * 应用输入事件
     * @param event 输入事件
     */
    applyEvent(event) {
        if (event.type === 'joystick_move') {
            console.log('JoystickExecutor: Applying event', event.type, event.data);
            // 事件处理（待实现）
        }
    }
    /**
     * 重置输入状态
     */
    reset() {
        // 所有轴归零
        this.currentJoystickState.axes = {
            lx: 0, ly: 0, rx: 0, ry: 0
        };
        // 所有按钮释放
        this.currentJoystickState.buttons = {
            a: false, b: false, x: false, y: false,
            lb: false, rb: false, back: false, start: false,
            ls: false, rs: false,
            up: false, down: false, left: false, right: false
        };
        // 所有扳机归零
        this.currentJoystickState.triggers = {
            lt: 0, rt: 0
        };
        // 提交归零状态
        this.submitFullState();
        console.log('JoystickExecutor: Resetting to zero state');
    }
    /**
     * 更新轴状态
     * @param joystickState 摇杆状态
     */
    updateAxes(joystickState) {
        // 处理摇杆轴状态
        if (joystickState.x !== undefined) {
            this.currentJoystickState.axes.lx = this.clampAxisValue(joystickState.x);
        }
        if (joystickState.y !== undefined) {
            this.currentJoystickState.axes.ly = this.clampAxisValue(joystickState.y);
        }
        // 这里可以添加更多轴的处理
    }
    /**
     * 限制轴值范围在[-1.0, 1.0]
     * @param value 原始值
     * @returns 限制后的值
     */
    clampAxisValue(value) {
        return Math.max(-1.0, Math.min(1.0, value));
    }
    /**
     * 限制扳机值范围在[0.0, 1.0]
     * @param value 原始值
     * @returns 限制后的值
     */
    clampTriggerValue(value) {
        return Math.max(0.0, Math.min(1.0, value));
    }
    /**
     * 提交整帧状态到虚拟设备
     */
    submitFullState() {
        try {
            // 模拟提交状态到虚拟设备
            console.log('JoystickExecutor: Submitting full state', this.currentJoystickState);
            // 这里将在有vigemclient环境时替换为真实的vigemclient调用
            // 例如：
            // vigemclient.setAxis(0, this.currentJoystickState.axes.lx);
            // vigemclient.setAxis(1, this.currentJoystickState.axes.ly);
            // ...
            this.isDeviceConnected = true;
        }
        catch (error) {
            console.error('JoystickExecutor: Error submitting state', error);
            this.isDeviceConnected = false;
        }
    }
}
exports.JoystickExecutor = JoystickExecutor;
//# sourceMappingURL=joystick.js.map