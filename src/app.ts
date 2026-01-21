// 入口文件，启动服务

import { startWsServer } from './ws/server';
import { startInputExecutor } from './input/executor';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

// 启动WebSocket服务器
startWsServer();

// 启动输入执行器
startInputExecutor();