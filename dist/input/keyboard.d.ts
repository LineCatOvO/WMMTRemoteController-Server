import { InputExecutor } from './interfaces';
import { InputState, InputDelta, InputEvent } from '../types/ws';
/**
 * 键盘输入执行器
 * 负责将键盘输入状态转换为系统键盘事件
 */
export declare class KeyboardExecutor implements InputExecutor {
    private currentKeyboardState;
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
     * 更新键盘状态
     * @param newState 新的键盘状态
     */
    private updateKeyboardState;
}
//# sourceMappingURL=keyboard.d.ts.map