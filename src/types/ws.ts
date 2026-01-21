/**
 * WebSocket消息类型定义
 */

// WebSocket消息基础接口
export interface WsMessage {
  type: string;
}

// 输入元数据接口
export interface InputMetadata {
  clientId: string;
  timestamp: number;
  latency?: number;
}

// 输入事件接口
export interface InputEvent {
  type: 'key_down' | 'key_up' | 'mouse_move' | 'mouse_click' | 'joystick_move' | 'gyroscope_update';
  data: any;
  metadata: InputMetadata;
}

// 输入增量接口
export interface InputDelta {
  keyboard?: {
    pressed?: string[];
    released?: string[];
  };
  mouse?: {
    x?: number;
    y?: number;
    left?: boolean;
    right?: boolean;
    middle?: boolean;
  };
  joystick?: {
    x?: number;
    y?: number;
  };
  gyroscope?: {
    pitch?: number;
    roll?: number;
    yaw?: number;
  };
}

// 输入状态接口
export interface InputState {
  keyboard: Set<string>;
  mouse: {
    x: number;
    y: number;
    left: boolean;
    right: boolean;
    middle: boolean;
  };
  joystick: {
    x: number; // -1~1
    y: number; // -1~1
    deadzone: number;
    smoothing: number;
  };
  gyroscope: {
    pitch: number; // -180~180
    roll: number;  // -180~180
    yaw: number;   // -180~180
    deadzone: number;
    smoothing: number;
  };
}

// 欢迎消息
export interface WelcomeMessage extends WsMessage {
  type: 'welcome';
  message: string;
}

// 输入数据消息
export interface InputMessage extends WsMessage {
  type: 'input';
  data: {
    keyboard?: string[];
    mouse?: {
      x?: number;
      y?: number;
      left?: boolean;
      right?: boolean;
      middle?: boolean;
    };
    joystick?: {
      x?: number;
      y?: number;
      deadzone?: number;
      smoothing?: number;
    };
    gyroscope?: {
      pitch?: number;
      roll?: number;
      yaw?: number;
      deadzone?: number;
      smoothing?: number;
    };
  };
  metadata: InputMetadata;
}

// 输入增量消息
export interface InputDeltaMessage extends WsMessage {
  type: 'input_delta';
  data: InputDelta;
  metadata: InputMetadata;
}

// 输入事件消息
export interface InputEventMessage extends WsMessage {
  type: 'input_event';
  data: InputEvent;
}

// 延迟测量消息
export interface LatencyProbeMessage extends WsMessage {
  type: 'latency_probe';
  timestamp: number;
}

// 延迟测量响应消息
export interface LatencyProbeResponseMessage extends WsMessage {
  type: 'latency_probe_response';
  timestamp: number;
  clientTimestamp: number;
}

// 调试消息
export interface DebugMessage extends WsMessage {
  type: 'debug';
  level: 'info' | 'warn' | 'error';
  message: string;
  data?: any;
}

// 错误消息
export interface ErrorMessage extends WsMessage {
  type: 'error';
  code: string;
  message: string;
  details?: any;
}

// 确认消息
export interface AckMessage extends WsMessage {
  type: 'ack';
  messageId: string;
  status: 'success' | 'error';
  message?: string;
}

// 配置获取消息
export interface ConfigGetMessage extends WsMessage {
  type: 'config_get';
}

// 配置设置消息
export interface ConfigSetMessage extends WsMessage {
  type: 'config_set';
  data: Partial<Config>;
}

// 配置返回消息
export interface ConfigMessage extends WsMessage {
  type: 'config';
  data: Config;
}

// 配置更新确认消息
export interface ConfigAckMessage extends WsMessage {
  type: 'config_ack';
  message: string;
  data: Config;
}

// 配置错误消息
export interface ConfigErrorMessage extends WsMessage {
  type: 'config_error';
  message: string;
}

// Ping消息
export interface PingMessage extends WsMessage {
  type: 'ping';
}

// Pong消息
export interface PongMessage extends WsMessage {
  type: 'pong';
}

// 配置对象接口
export interface Config {
  inputUpdateInterval: number;
  heartbeatInterval: number;
  pingInterval: number;
  safeStateTimeout: number;
  enableLogging: boolean;
}

// 客户端消息联合类型
export type ClientMessage = 
  | WelcomeMessage
  | InputMessage
  | InputDeltaMessage
  | InputEventMessage
  | ConfigGetMessage
  | ConfigSetMessage
  | LatencyProbeMessage
  | DebugMessage
  | PingMessage;

// 服务器消息联合类型
export type ServerMessage = 
  | WelcomeMessage
  | ConfigMessage
  | ConfigAckMessage
  | ConfigErrorMessage
  | LatencyProbeResponseMessage
  | ErrorMessage
  | DebugMessage
  | AckMessage
  | PongMessage;