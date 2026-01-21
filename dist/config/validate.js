"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateConfig = validateConfig;
/**
 * 验证配置对象的有效性
 * @param config 要验证的配置对象
 * @returns 是否有效
 */
function validateConfig(config) {
    // 验证输入更新间隔
    if (config.inputUpdateInterval !== undefined &&
        (typeof config.inputUpdateInterval !== 'number' || config.inputUpdateInterval <= 0)) {
        return false;
    }
    // 验证心跳间隔
    if (config.heartbeatInterval !== undefined &&
        (typeof config.heartbeatInterval !== 'number' || config.heartbeatInterval <= 0)) {
        return false;
    }
    // 验证ping间隔
    if (config.pingInterval !== undefined &&
        (typeof config.pingInterval !== 'number' || config.pingInterval <= 0)) {
        return false;
    }
    // 验证安全状态超时
    if (config.safeStateTimeout !== undefined &&
        (typeof config.safeStateTimeout !== 'number' || config.safeStateTimeout < 0)) {
        return false;
    }
    // 验证日志开关
    if (config.enableLogging !== undefined &&
        typeof config.enableLogging !== 'boolean') {
        return false;
    }
    return true;
}
//# sourceMappingURL=validate.js.map