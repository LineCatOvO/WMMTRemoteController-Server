"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleConfigGet = handleConfigGet;
exports.handleConfigSet = handleConfigSet;
const config_1 = require("../../config/config");
const validate_1 = require("../../config/validate");
/**
 * 处理配置获取消息
 * @param ws WebSocket连接
 * @param message 配置获取消息
 */
function handleConfigGet(ws, message) {
    // 发送当前配置
    ws.send(JSON.stringify({ type: 'config', data: config_1.config }));
}
/**
 * 处理配置设置消息
 * @param ws WebSocket连接
 * @param message 配置设置消息
 */
function handleConfigSet(ws, message) {
    // 合并新配置到当前配置
    const updatedConfig = { ...config_1.config, ...message.data };
    // 验证配置有效性
    if ((0, validate_1.validateConfig)(updatedConfig)) {
        // 应用新配置
        Object.assign(config_1.config, updatedConfig);
        // 发送确认消息
        ws.send(JSON.stringify({
            type: 'config_ack',
            message: 'Config updated successfully',
            data: config_1.config
        }));
        console.log('Config updated:', config_1.config);
        // 如果更新了输入更新间隔，需要重新设置定时器
        if (message.data.inputUpdateInterval && message.data.inputUpdateInterval !== config_1.config.inputUpdateInterval) {
            console.log(`Input update interval changed to ${config_1.config.inputUpdateInterval}ms`);
            // 注意：在实际实现中，需要保存定时器ID以便清除和重新创建
        }
    }
    else {
        // 配置无效，发送错误消息
        ws.send(JSON.stringify({
            type: 'config_error',
            message: 'Invalid configuration'
        }));
    }
}
//# sourceMappingURL=config.js.map