"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleInputEvent = handleInputEvent;
const executor_1 = require("../../input/executor");
/**
 * 处理输入事件消息
 * @param ws WebSocket连接
 * @param message 输入事件消息
 */
function handleInputEvent(ws, message) {
    // 获取输入执行器管理器
    const executorManager = (0, executor_1.getExecutorManager)();
    // 应用输入事件到所有执行器
    executorManager.applyEvent(message.data);
    // 处理metadata（目前仅记录日志）
    console.log(`Input event received: ${message.data.type}`);
}
//# sourceMappingURL=inputEvent.js.map