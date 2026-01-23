import { StateStore } from './stateStore';
import { InputExecutorManager } from './interfaces';
/**
 * ApplyScheduler配置
 */
interface ApplySchedulerConfig {
    applyIntervalMs: number;
}
/**
 * ApplyScheduler
 * 负责固定频率（125Hz）状态应用，实现接收与应用解耦
 */
export declare class ApplyScheduler {
    private readonly executorManager;
    private readonly stateStore;
    private readonly config;
    private applyTimer;
    private _isRunning;
    private applyCount;
    /**
     * 构造函数
     * @param executorManager 执行器管理器
     * @param stateStore 状态存储
     * @param config 配置
     */
    constructor(executorManager: InputExecutorManager, stateStore: StateStore, config?: Partial<ApplySchedulerConfig>);
    /**
     * 启动ApplyScheduler
     */
    start(): void;
    /**
     * 停止ApplyScheduler
     */
    stop(): void;
    /**
     * 应用当前状态
     */
    private applyCurrentState;
    /**
     * 提取序列号
     * @param state 状态对象
     * @returns 序列号
     */
    private extractSequenceNumber;
    /**
     * 获取运行状态
     * @returns 是否运行中
     */
    isRunning(): boolean;
    /**
     * 获取应用计数
     * @returns 应用计数
     */
    getApplyCount(): number;
}
export {};
//# sourceMappingURL=applyScheduler.d.ts.map