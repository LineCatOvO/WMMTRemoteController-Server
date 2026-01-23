"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateStore = void 0;
/**
 * 状态存储
 * 负责管理ControlResultState的存储、时间语义和序列号校验
 */
class StateStore {
    /**
     * 构造函数
     * @param config 状态存储配置
     */
    constructor(config) {
        // 最新状态
        this.latestState = null;
        // 状态历史记录
        this.stateHistory = [];
        // 最后应用的序列号
        this.lastAppliedSequenceNumber = 0;
        this.config = {
            maxHistorySize: 100, // 默认保留100条历史记录
            ...config
        };
    }
    /**
     * 存储新状态
     * @param state 新状态
     * @returns 是否成功存储
     */
    storeState(state) {
        // 验证状态完整性
        if (!this.isValidState(state)) {
            console.error('StateStore: Invalid state received');
            return false;
        }
        // 验证序列号单调性
        const sequenceNumber = this.extractSequenceNumber(state);
        if (!this.isValidSequenceNumber(sequenceNumber)) {
            console.error(`StateStore: Invalid sequence number ${sequenceNumber}, last applied: ${this.lastAppliedSequenceNumber}`);
            return false;
        }
        // 存储状态
        const receivedTime = Date.now();
        this.latestState = state;
        // 添加到历史记录
        this.stateHistory.push({
            state,
            receivedTime,
            appliedTime: null,
            sequenceNumber
        });
        // 限制历史记录大小
        if (this.stateHistory.length > this.config.maxHistorySize) {
            this.stateHistory.shift();
        }
        console.log(`StateStore: State stored, sequence: ${sequenceNumber}, received time: ${receivedTime}`);
        return true;
    }
    /**
     * 获取最新状态
     * @returns 最新状态
     */
    getLatestState() {
        return this.latestState;
    }
    /**
     * 记录状态应用时间
     * @param sequenceNumber 序列号
     */
    recordAppliedState(sequenceNumber) {
        // 更新最后应用的序列号
        this.lastAppliedSequenceNumber = sequenceNumber;
        // 更新历史记录中的应用时间
        const historyEntry = this.stateHistory.find(entry => entry.sequenceNumber === sequenceNumber);
        if (historyEntry) {
            historyEntry.appliedTime = Date.now();
            console.log(`StateStore: State applied, sequence: ${sequenceNumber}, applied time: ${historyEntry.appliedTime}`);
        }
    }
    /**
     * 验证状态完整性
     * @param state 要验证的状态
     * @returns 是否有效
     */
    isValidState(state) {
        // 基本验证：状态对象必须存在
        if (!state)
            return false;
        // 验证必要字段
        // InputState requires keyboard, mouse, joystick, and gyroscope fields
        if (!state.keyboard || !state.mouse || !state.joystick || !state.gyroscope) {
            return false;
        }
        // frameId is optional but recommended, so we don't validate it here
        return true;
    }
    /**
     * 提取序列号
     * @param state 状态对象
     * @returns 序列号
     */
    extractSequenceNumber(state) {
        // 这里假设state中有frameId字段作为序列号
        // 如果没有，则使用时间戳作为序列号
        return state.frameId || Date.now();
    }
    /**
     * 验证序列号单调性
     * @param sequenceNumber 要验证的序列号
     * @returns 是否有效
     */
    isValidSequenceNumber(sequenceNumber) {
        // If no state has been stored yet, any sequence number is valid
        if (!this.latestState) {
            return true;
        }
        // Get the sequence number of the latest stored state
        const latestSequenceNumber = this.extractSequenceNumber(this.latestState);
        // 序列号必须大于最后存储的序列号
        // 不允许相同或更小的序列号
        return sequenceNumber > latestSequenceNumber;
    }
    /**
     * 获取状态历史记录
     * @returns 状态历史记录
     */
    getStateHistory() {
        return [...this.stateHistory];
    }
    /**
     * 获取最后应用的序列号
     * @returns 最后应用的序列号
     */
    getLastAppliedSequenceNumber() {
        return this.lastAppliedSequenceNumber;
    }
    /**
     * 获取最后接收时间
     * @returns 最后接收时间
     */
    getLastReceivedTime() {
        return this.latestState ? Date.now() : 0;
    }
    /**
     * 清空所有状态
     */
    clear() {
        this.latestState = null;
        this.stateHistory = [];
        this.lastAppliedSequenceNumber = 0;
        console.log('StateStore: All states cleared');
    }
}
exports.StateStore = StateStore;
//# sourceMappingURL=stateStore.js.map