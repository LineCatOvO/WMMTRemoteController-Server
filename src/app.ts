// 入口文件，启动服务

import { startWsServer } from './ws/server';
import { startInputExecutor, getExecutorManager } from './input/executor';
import { StateStore } from './input/stateStore';
import { ApplyScheduler } from './input/applyScheduler';
import { TerminalMonitor } from './utils/terminalMonitor';
import { inputState } from './input/state';
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

// 启动终端监控器（如果启用）
let terminalMonitor: TerminalMonitor | null = null;
if (process.env.INPUT_MONITOR === '1') {
  // 只在非测试环境启用
  if (process.env.NODE_ENV !== 'test') {
    terminalMonitor = new TerminalMonitor(inputState);
    terminalMonitor.start();
    
    // 将监控器实例导出到全局，供其他模块使用
    (global as any).terminalMonitor = terminalMonitor;
  }
}

// 启动日志
console.log('WMMT Controller Server started successfully');

// 处理进程终止
try {
  process.on('SIGINT', () => {
    console.log('\nShutting down server...');
    
    // 停止终端监控器
    if (terminalMonitor) {
      terminalMonitor.stop();
    }
    
    applyScheduler.stop();
    process.exit(0);
  });
} catch (error) {
  console.error('Error setting up process handlers:', error);
}