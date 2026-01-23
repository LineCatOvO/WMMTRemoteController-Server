import { SafetyController } from './safetyController';
import { InputExecutor, InputExecutorManager } from './interfaces';
/**
 * 输入执行器管理器实现
 */
export declare class DefaultInputExecutorManager implements InputExecutorManager {
    private executors;
    /**
     * 添加输入执行器
     * @param executor 输入执行器
     */
    addExecutor(executor: InputExecutor): void;
    /**
     * 移除输入执行器
     * @param executor 输入执行器
     */
    removeExecutor(executor: InputExecutor): void;
    /**
     * 应用完整输入状态到所有执行器
     * @param state 输入状态
     */
    applyState(state: any): void;
    /**
     * 应用输入增量到所有执行器
     * @param delta 输入增量
     */
    applyDelta(delta: any): void;
    /**
     * 应用输入事件到所有执行器
     * @param event 输入事件
     */
    applyEvent(event: any): void;
    /**
     * 重置所有执行器
     */
    reset(): void;
}
/**
 * 开始输入执行循环
 * @returns 定时器ID，用于后续清理
 */
export declare function startInputExecutor(): NodeJS.Timeout;
/**
 * 停止输入执行循环
 */
export declare function stopInputExecutor(): void;
/**
 * 获取输入执行器管理器
 * @returns 输入执行器管理器实例
 */
export declare function getExecutorManager(): InputExecutorManager;
/**
 * 获取安全控制器
 * @returns 安全控制器实例
 */
export declare function getSafetyController(): SafetyController;
/**
 * 触发安全清零
 */
export declare function triggerSafetyClear(): void;
/**
 * 触发异常清零
 * @param reason 异常原因
 */
export declare function triggerExceptionClear(reason: string): void;
/**
 * 处理WebSocket断开连接
 */
export declare function handleDisconnect(): void;
/**
 * 记录有效状态
 * @param state 有效状态
 */
export declare function recordValidState(state: any): void;
//# sourceMappingURL=executor.d.ts.map