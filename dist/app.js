"use strict";
// 入口文件，启动服务
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./ws/server");
const executor_1 = require("./input/executor");
const stateStore_1 = require("./input/stateStore");
const applyScheduler_1 = require("./input/applyScheduler");
const dotenv_1 = __importDefault(require("dotenv"));
// 加载环境变量
dotenv_1.default.config();
// 初始化状态存储
const stateStore = new stateStore_1.StateStore();
// 启动WebSocket服务器
(0, server_1.startWsServer)();
// 启动输入执行器
(0, executor_1.startInputExecutor)();
// 初始化并启动ApplyScheduler
const executorManager = (0, executor_1.getExecutorManager)();
const applyScheduler = new applyScheduler_1.ApplyScheduler(executorManager, stateStore);
applyScheduler.start();
// 导出全局实例，供其他模块使用
global.stateStore = stateStore;
// 启动日志
console.log('WMMT Controller Server started successfully');
// 处理进程终止
try {
    process.on('SIGINT', () => {
        console.log('\nShutting down server...');
        applyScheduler.stop();
        process.exit(0);
    });
}
catch (error) {
    console.error('Error setting up process handlers:', error);
}
//# sourceMappingURL=app.js.map