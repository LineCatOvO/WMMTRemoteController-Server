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
 * 获取输入执行器管理器
 * @returns 输入执行器管理器实例
 */
export declare function getExecutorManager(): InputExecutorManager;
//# sourceMappingURL=executor.d.ts.map