"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultInputExecutorManager = void 0;
exports.startInputExecutor = startInputExecutor;
exports.getExecutorManager = getExecutorManager;
exports.getSafetyController = getSafetyController;
exports.triggerSafetyClear = triggerSafetyClear;
exports.triggerExceptionClear = triggerExceptionClear;
exports.handleDisconnect = handleDisconnect;
exports.recordValidState = recordValidState;
const config_1 = require("../config/config");
const state_1 = require("./state");
const keyboard_1 = require("./keyboard");
const mouse_1 = require("./mouse");
const joystick_1 = require("./joystick");
const safetyController_1 = require("./safetyController");
/**
 * 输入执行器管理器实现
 */
class DefaultInputExecutorManager {
    constructor() {
        this.executors = [];
    }
    /**
     * 添加输入执行器
     * @param executor 输入执行器
     */
    addExecutor(executor) {
        this.executors.push(executor);
    }
    /**
     * 移除输入执行器
     * @param executor 输入执行器
     */
    removeExecutor(executor) {
        this.executors = this.executors.filter(e => e !== executor);
    }
    /**
     * 应用完整输入状态到所有执行器
     * @param state 输入状态
     */
    applyState(state) {
        this.executors.forEach(executor => executor.applyState(state));
    }
    /**
     * 应用输入增量到所有执行器
     * @param delta 输入增量
     */
    applyDelta(delta) {
        this.executors.forEach(executor => executor.applyDelta(delta));
    }
    /**
     * 应用输入事件到所有执行器
     * @param event 输入事件
     */
    applyEvent(event) {
        this.executors.forEach(executor => executor.applyEvent(event));
    }
    /**
     * 重置所有执行器
     */
    reset() {
        this.executors.forEach(executor => executor.reset());
    }
}
exports.DefaultInputExecutorManager = DefaultInputExecutorManager;
// 创建输入执行器管理器实例
const executorManager = new DefaultInputExecutorManager();
// 添加默认的输入执行器
executorManager.addExecutor(new keyboard_1.KeyboardExecutor());
executorManager.addExecutor(new mouse_1.MouseExecutor());
executorManager.addExecutor(new joystick_1.JoystickExecutor());
// 创建安全控制器
const safetyController = new safetyController_1.SafetyController(executorManager);
/**
 * 开始输入执行循环
 * @returns 定时器ID，用于后续清理
 */
function startInputExecutor() {
    console.log(`Starting input executor with interval: ${config_1.config.inputUpdateInterval}ms`);
    // 输入执行循环（125Hz）
    return setInterval(() => {
        executeInput();
    }, config_1.config.inputUpdateInterval);
}
/**
 * 执行输入
 */
function executeInput() {
    // 应用当前输入状态到所有执行器
    executorManager.applyState(state_1.inputState);
    // 记录有效状态时间
    safetyController.recordValidState(state_1.inputState);
}
/**
 * 获取输入执行器管理器
 * @returns 输入执行器管理器实例
 */
function getExecutorManager() {
    return executorManager;
}
/**
 * 获取安全控制器
 * @returns 安全控制器实例
 */
function getSafetyController() {
    return safetyController;
}
/**
 * 触发安全清零
 */
function triggerSafetyClear() {
    safetyController.triggerSafetyClear();
}
/**
 * 触发异常清零
 * @param reason 异常原因
 */
function triggerExceptionClear(reason) {
    safetyController.triggerExceptionClear(reason);
}
/**
 * 处理WebSocket断开连接
 */
function handleDisconnect() {
    safetyController.handleDisconnect();
}
/**
 * 记录有效状态
 * @param state 有效状态
 */
function recordValidState(state) {
    safetyController.recordValidState(state);
}
//# sourceMappingURL=executor.js.map