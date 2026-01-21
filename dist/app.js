"use strict";
// 入口文件，启动服务
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./ws/server");
const executor_1 = require("./input/executor");
const dotenv_1 = __importDefault(require("dotenv"));
// 加载环境变量
dotenv_1.default.config();
// 启动WebSocket服务器
(0, server_1.startWsServer)();
// 启动输入执行器
(0, executor_1.startInputExecutor)();
//# sourceMappingURL=app.js.map