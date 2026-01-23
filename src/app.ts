// 入口文件，启动服务

import { startWsServer } from './ws/server';
import { startInputExecutor, getExecutorManager } from './input/executor';
import { StateStore } from './input/stateStore';
import { ApplyScheduler } from './input/applyScheduler';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

// 初始化状态存储
const stateStore = new StateStore();

// 启动WebSocket服务器
startWsServer();

// 启动输入执行器
startInputExecutor();

// 初始化并启动ApplyScheduler
const executorManager = getExecutorManager();
const applyScheduler = new ApplyScheduler(executorManager, stateStore);
applyScheduler.start();

// 导出全局实例，供其他模块使用
(global as any).stateStore = stateStore;

// 启动日志
console.log('WMMT Controller Server started successfully');

// 处理进程终止
try {
  process.on('SIGINT', () => {
    console.log('\nShutting down server...');
    applyScheduler.stop();
    process.exit(0);
  });
} catch (error) {
  console.error('Error setting up process handlers:', error);
}