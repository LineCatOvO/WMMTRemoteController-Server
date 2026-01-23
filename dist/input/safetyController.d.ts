import { InputExecutorManager } from './interfaces';
import { InputState } from '../types/ws';
/**
 * 安全控制器配置
 */
interface SafetyConfig {
    timeoutMs: number;
}
/**
 * 安全控制器
 * 负责在异常情况下（超时、断连、状态校验失败等）立即清零所有输入状态
 */
export declare class SafetyController {
    private readonly executorManager;
    private readonly config;
    private lastValidStateTime;
    private timeoutTimer;
    private clearCount;
    private exceptionClearCount;
    /**
     * 构造函数
     * @param executorManager 执行器管理器
     * @param config 安全控制器配置
     */
    constructor(executorManager: InputExecutorManager, config?: Partial<SafetyConfig>);
    /**
     * 记录有效状态接收时间
     * @param state 接收到的状态
     */
    recordValidState(state: InputState): void;
    /**
     * 触发显式清零
     */
    triggerSafetyClear(): void;
    /**
     * 触发异常清零
     * @param reason 异常原因
     */
    triggerExceptionClear(reason: string): void;
    /**
     * 处理显式零状态
     */
    handleZeroState(): void;
    /**
     * 处理WebSocket断开连接
     */
    handleDisconnect(): void;
    /**
     * 启动超时检查
     */
    private startTimeoutCheck;
    /**
     * 检查超时
     */
    private checkTimeout;
    /**
     * 清零所有输入
     */
    private clearAllInputs;
    /**
     * 获取清零计数
     * @returns 清零计数
     */
    getClearCount(): number;
    /**
     * 获取异常清零计数
     * @returns 异常清零计数
     */
    getExceptionClearCount(): number;
    /**
     * 获取最后一次有效状态时间
     * @returns 最后一次有效状态时间戳
     */
    getLastValidStateTime(): number;
    /**
     * 停止超时检查
     */
    stopTimeoutCheck(): void;
    /**
     * 销毁安全控制器
     */
    destroy(): void;
}
export {};
//# sourceMappingURL=safetyController.d.ts.map