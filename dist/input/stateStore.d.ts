import { InputState } from '../types/ws';
/**
 * 状态存储配置
 */
interface StateStoreConfig {
    maxHistorySize: number;
}
/**
 * 状态存储
 * 负责管理ControlResultState的存储、时间语义和序列号校验
 */
export declare class StateStore {
    private latestState;
    private stateHistory;
    private lastAppliedSequenceNumber;
    private readonly config;
    /**
     * 构造函数
     * @param config 状态存储配置
     */
    constructor(config?: Partial<StateStoreConfig>);
    /**
     * 存储新状态
     * @param state 新状态
     * @returns 是否成功存储
     */
    storeState(state: InputState): boolean;
    /**
     * 获取最新状态
     * @returns 最新状态
     */
    getLatestState(): InputState | null;
    /**
     * 记录状态应用时间
     * @param sequenceNumber 序列号
     */
    recordAppliedState(sequenceNumber: number): void;
    /**
     * 验证状态完整性
     * @param state 要验证的状态
     * @returns 是否有效
     */
    private isValidState;
    /**
     * 提取序列号
     * @param state 状态对象
     * @returns 序列号
     */
    private extractSequenceNumber;
    /**
     * 验证序列号单调性
     * @param sequenceNumber 要验证的序列号
     * @returns 是否有效
     */
    private isValidSequenceNumber;
    /**
     * 获取状态历史记录
     * @returns 状态历史记录
     */
    getStateHistory(): Array<{
        state: InputState;
        receivedTime: number;
        appliedTime: number | null;
        sequenceNumber: number;
    }>;
    /**
     * 获取最后应用的序列号
     * @returns 最后应用的序列号
     */
    getLastAppliedSequenceNumber(): number;
    /**
     * 获取最后接收时间
     * @returns 最后接收时间
     */
    getLastReceivedTime(): number;
    /**
     * 清空所有状态
     */
    clear(): void;
}
export {};
//# sourceMappingURL=stateStore.d.ts.map