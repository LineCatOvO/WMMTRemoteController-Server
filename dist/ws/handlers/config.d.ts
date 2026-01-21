import { ConfigGetMessage, ConfigSetMessage } from '../../types/ws';
/**
 * 处理配置获取消息
 * @param ws WebSocket连接
 * @param message 配置获取消息
 */
export declare function handleConfigGet(ws: any, message: ConfigGetMessage): void;
/**
 * 处理配置设置消息
 * @param ws WebSocket连接
 * @param message 配置设置消息
 */
export declare function handleConfigSet(ws: any, message: ConfigSetMessage): void;
//# sourceMappingURL=config.d.ts.map