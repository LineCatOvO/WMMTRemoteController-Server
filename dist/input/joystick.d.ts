import { InputExecutor } from './interfaces';
import { InputState, InputDelta, InputEvent } from '../types/ws';
/**
 * 摇杆输入执行器
 * 负责将摇杆输入状态转换为系统输入事件
 */
export declare class JoystickExecutor implements InputExecutor {
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
}
//# sourceMappingURL=joystick.d.ts.map