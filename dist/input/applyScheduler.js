"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplyScheduler = void 0;
const executor_1 = require("./executor");
/**
 * ApplyScheduler
 * 负责固定频率（125Hz）状态应用，实现接收与应用解耦
 */
class ApplyScheduler {
    /**
     * 构造函数
     * @param executorManager 执行器管理器
     * @param stateStore 状态存储
     * @param config 配置
     */
    constructor(executorManager, stateStore, config) {
        // 应用定时器
        this.applyTimer = null;
        // 运行状态
        this._isRunning = false;
        // 应用计数
        this.applyCount = 0;
        this.executorManager = executorManager;
        this.stateStore = stateStore;
        this.config = {
            applyIntervalMs: 8, // 默认8ms，对应125Hz
            ...config
        };
    }
    /**
     * 启动ApplyScheduler
     */
    start() {
        if (this._isRunning) {
            console.warn('ApplyScheduler: Already running');
            return;
        }
        this._isRunning = true;
        this.applyTimer = setInterval(() => {
            this.applyCurrentState();
        }, this.config.applyIntervalMs);
        console.log(`ApplyScheduler: Started with interval ${this.config.applyIntervalMs}ms (${1000 / this.config.applyIntervalMs}Hz)`);
    }
    /**
     * 停止ApplyScheduler
     */
    stop() {
        if (!this._isRunning) {
            console.warn('ApplyScheduler: Already stopped');
            return;
        }
        this._isRunning = false;
        if (this.applyTimer) {
            clearInterval(this.applyTimer);
            this.applyTimer = null;
        }
        console.log(`ApplyScheduler: Stopped, total applies: ${this.applyCount}`);
    }
    /**
     * 应用当前状态
     */
    applyCurrentState() {
        try {
            // 获取最新状态
            const latestState = this.stateStore.getLatestState();
            if (latestState) {
                // 提取序列号
                const sequenceNumber = this.extractSequenceNumber(latestState);
                // 应用状态到所有执行器
                this.executorManager.applyState(latestState);
                // 记录应用时间
                this.stateStore.recordAppliedState(sequenceNumber);
                // 记录有效状态时间到安全控制器
                const safetyController = (0, executor_1.getSafetyController)();
                safetyController.recordValidState(latestState);
                this.applyCount++;
                // 每100次应用输出一次日志
                if (this.applyCount % 100 === 0) {
                    console.log(`ApplyScheduler: Applied ${this.applyCount} states, last sequence: ${sequenceNumber}`);
                }
            }
            else {
                // 没有最新状态，不执行任何操作
                console.debug('ApplyScheduler: No latest state available');
            }
        }
        catch (error) {
            console.error('ApplyScheduler: Error applying state:', error);
            // 发生异常时触发安全清零
            const safetyController = (0, executor_1.getSafetyController)();
            safetyController.triggerExceptionClear('ApplyScheduler error');
        }
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
     * 获取运行状态
     * @returns 是否运行中
     */
    isRunning() {
        return this._isRunning;
    }
    /**
     * 获取应用计数
     * @returns 应用计数
     */
    getApplyCount() {
        return this.applyCount;
    }
}
exports.ApplyScheduler = ApplyScheduler;
//# sourceMappingURL=applyScheduler.js.map