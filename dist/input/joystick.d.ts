import { InputExecutor } from './interfaces';
import { InputState, InputDelta, InputEvent } from '../types/ws';
/**
 * Xbox 360手柄输入执行器
 * 负责将手柄输入状态转换为系统输入事件
 */
export declare class JoystickExecutor implements InputExecutor {
    private currentJoystickState;
    private isDeviceConnected;
    /**
     * 应用完整输入状态
     * @param state 输入状态
     */
    applyState(state: InputState): void;
    /**
     * 应用输入增量
     * @param delta 输入增量
     */
    applyDelta(delta: InputDelta): void;
    /**
     * 应用输入事件
     * @param event 输入事件
     */
    applyEvent(event: InputEvent): void;
    /**
     * 重置输入状态
     */
    reset(): void;
    /**
     * 更新轴状态
     * @param joystickState 摇杆状态
     */
    private updateAxes;
    /**
     * 限制轴值范围在[-1.0, 1.0]
     * @param value 原始值
     * @returns 限制后的值
     */
    private clampAxisValue;
    /**
     * 限制扳机值范围在[0.0, 1.0]
     * @param value 原始值
     * @returns 限制后的值
     */
    private clampTriggerValue;
    /**
     * 提交整帧状态到虚拟设备
     */
    private submitFullState;
}
//# sourceMappingURL=joystick.d.ts.map