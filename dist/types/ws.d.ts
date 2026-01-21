/**
 * WebSocket消息类型定义
 */
export interface WsMessage {
    type: string;
}
export interface InputMetadata {
    clientId: string;
    timestamp: number;
    latency?: number;
}
export interface InputEvent {
    type: 'key_down' | 'key_up' | 'mouse_move' | 'mouse_click' | 'joystick_move' | 'gyroscope_update';
    data: any;
    metadata: InputMetadata;
}
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
        x: number;
        y: number;
        deadzone: number;
        smoothing: number;
    };
    gyroscope: {
        pitch: number;
        roll: number;
        yaw: number;
        deadzone: number;
        smoothing: number;
    };
}
export interface WelcomeMessage extends WsMessage {
    type: 'welcome';
    message: string;
}
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
export interface InputDeltaMessage extends WsMessage {
    type: 'input_delta';
    data: InputDelta;
    metadata: InputMetadata;
}
export interface InputEventMessage extends WsMessage {
    type: 'input_event';
    data: InputEvent;
}
export interface LatencyProbeMessage extends WsMessage {
    type: 'latency_probe';
    timestamp: number;
}
export interface LatencyProbeResponseMessage extends WsMessage {
    type: 'latency_probe_response';
    timestamp: number;
    clientTimestamp: number;
}
export interface DebugMessage extends WsMessage {
    type: 'debug';
    level: 'info' | 'warn' | 'error';
    message: string;
    data?: any;
}
export interface ErrorMessage extends WsMessage {
    type: 'error';
    code: string;
    message: string;
    details?: any;
}
export interface AckMessage extends WsMessage {
    type: 'ack';
    messageId: string;
    status: 'success' | 'error';
    message?: string;
}
export interface ConfigGetMessage extends WsMessage {
    type: 'config_get';
}
export interface ConfigSetMessage extends WsMessage {
    type: 'config_set';
    data: Partial<Config>;
}
export interface ConfigMessage extends WsMessage {
    type: 'config';
    data: Config;
}
export interface ConfigAckMessage extends WsMessage {
    type: 'config_ack';
    message: string;
    data: Config;
}
export interface ConfigErrorMessage extends WsMessage {
    type: 'config_error';
    message: string;
}
export interface PingMessage extends WsMessage {
    type: 'ping';
}
export interface PongMessage extends WsMessage {
    type: 'pong';
}
export interface Config {
    inputUpdateInterval: number;
    heartbeatInterval: number;
    pingInterval: number;
    safeStateTimeout: number;
    enableLogging: boolean;
}
export type ClientMessage = WelcomeMessage | InputMessage | InputDeltaMessage | InputEventMessage | ConfigGetMessage | ConfigSetMessage | LatencyProbeMessage | DebugMessage | PingMessage;
export type ServerMessage = WelcomeMessage | ConfigMessage | ConfigAckMessage | ConfigErrorMessage | LatencyProbeResponseMessage | ErrorMessage | DebugMessage | AckMessage | PongMessage;
//# sourceMappingURL=ws.d.ts.map