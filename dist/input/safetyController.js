"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SafetyController = void 0;
/**
 * 安全控制器
 * 负责在异常情况下（超时、断连、状态校验失败等）立即清零所有输入状态
 */
class SafetyController {
    /**
     * 构造函数
     * @param executorManager 执行器管理器
     * @param config 安全控制器配置
     */
    constructor(executorManager, config) {
        // 最后一次成功接收状态的时间戳
        this.lastValidStateTime = 0;
        // 超时定时器
        this.timeoutTimer = null;
        // 清零计数
        this.clearCount = 0;
        // 异常清零计数
        this.exceptionClearCount = 0;
        this.executorManager = executorManager;
        this.config = {
            timeoutMs: 500, // 默认超时时间500ms
            ...config
        };
        // 启动超时检查
        this.startTimeoutCheck();
    }
    /**
     * 记录有效状态接收时间
     * @param state 接收到的状态
     */
    recordValidState(state) {
        this.lastValidStateTime = Date.now();
        console.log('SafetyController: Valid state received, resetting timeout');
    }
    /**
     * 触发显式清零
     */
    triggerSafetyClear() {
        this.clearAllInputs();
        this.clearCount++;
        console.log('SafetyController: Safety clear triggered, total clears:', this.clearCount);
    }
    /**
     * 触发异常清零
     * @param reason 异常原因
     */
    triggerExceptionClear(reason) {
        this.clearAllInputs();
        this.clearCount++;
        this.exceptionClearCount++;
        console.log(`SafetyController: Exception clear triggered: ${reason}, total clears: ${this.clearCount}, exception clears: ${this.exceptionClearCount}`);
    }
    /**
     * 处理显式零状态
     */
    handleZeroState() {
        this.clearAllInputs();
        this.clearCount++;
        console.log('SafetyController: Zero state handled, total clears:', this.clearCount);
    }
    /**
     * 处理WebSocket断开连接
     */
    handleDisconnect() {
        this.clearAllInputs();
        this.clearCount++;
        console.log('SafetyController: WebSocket disconnected, total clears:', this.clearCount);
    }
    /**
     * 启动超时检查
     */
    startTimeoutCheck() {
        // 每100ms检查一次超时
        this.timeoutTimer = setInterval(() => {
            this.checkTimeout();
        }, 100);
        console.log(`SafetyController: Timeout check started with timeout: ${this.config.timeoutMs}ms`);
    }
    /**
     * 检查超时
     */
    checkTimeout() {
        const now = Date.now();
        const elapsed = now - this.lastValidStateTime;
        if (elapsed > this.config.timeoutMs) {
            this.triggerSafetyClear();
            console.log(`SafetyController: Timeout detected, elapsed: ${elapsed}ms, timeout: ${this.config.timeoutMs}ms`);
        }
    }
    /**
     * 清零所有输入
     */
    clearAllInputs() {
        // 创建零状态
        const zeroState = {
            keyboard: new Set(),
            mouse: {
                x: 0,
                y: 0,
                left: false,
                right: false,
                middle: false
            },
            joystick: {
                x: 0,
                y: 0,
                deadzone: 0,
                smoothing: 0
            },
            gyroscope: {
                pitch: 0,
                roll: 0,
                yaw: 0,
                deadzone: 0,
                smoothing: 0
            }
        };
        // 应用零状态到所有执行器
        this.executorManager.applyState(zeroState);
        // 调用执行器的reset方法，确保彻底清零
        this.executorManager.reset();
    }
    /**
     * 获取清零计数
     * @returns 清零计数
     */
    getClearCount() {
        return this.clearCount;
    }
    /**
     * 获取异常清零计数
     * @returns 异常清零计数
     */
    getExceptionClearCount() {
        return this.exceptionClearCount;
    }
    /**
     * 获取最后一次有效状态时间
     * @returns 最后一次有效状态时间戳
     */
    getLastValidStateTime() {
        return this.lastValidStateTime;
    }
    /**
     * 停止超时检查
     */
    stopTimeoutCheck() {
        if (this.timeoutTimer) {
            clearInterval(this.timeoutTimer);
            this.timeoutTimer = null;
        }
    }
    /**
     * 销毁安全控制器
     */
    destroy() {
        // 清除超时定时器
        this.stopTimeoutCheck();
        console.log('SafetyController: Destroyed, total clears:', this.clearCount);
    }
}
exports.SafetyController = SafetyController;
//# sourceMappingURL=safetyController.js.map