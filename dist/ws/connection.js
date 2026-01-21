"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleConnection = handleConnection;
const heartbeat_1 = require("../heartbeat/heartbeat");
const router_1 = require("./router");
/**
 * 处理单个WebSocket连接的生命周期
 * @param ws WebSocket连接对象
 */
function handleConnection(ws) {
    // 发送欢迎消息
    ws.send(JSON.stringify({ type: 'welcome', message: 'Connected to WMMT Controller Server' }));
    // 设置心跳检测
    (0, heartbeat_1.setupHeartbeat)(ws);
    // 处理客户端消息
    ws.on('message', (data) => {
        try {
            // 正确处理WebSocket消息数据类型
            const messageStr = typeof data === 'string' ? data : data.toString();
            const message = JSON.parse(messageStr);
            (0, router_1.handleMessage)(ws, message);
        }
        catch (error) {
            console.error('Error parsing message:', error);
        }
    });
    // 客户端断开连接
    ws.on('close', () => {
        console.log('Client disconnected');
        // 回退到安全状态
        revertToSafeState();
    });
    // 连接错误
    ws.on('error', (error) => {
        console.error('Client error:', error);
    });
}
/**
 * 回退到安全状态
 */
function revertToSafeState() {
    console.log('Reverting to safe state');
    // 导入需要在运行时使用的模块，避免循环依赖
    const { inputState } = require('../input/state');
    const { safeState } = require('../input/safeState');
    // 重置输入状态到安全状态
    inputState.keyboard = new Set(safeState.keyboard);
    inputState.mouse = { ...safeState.mouse };
    inputState.joystick = { ...safeState.joystick };
}
//# sourceMappingURL=connection.js.map