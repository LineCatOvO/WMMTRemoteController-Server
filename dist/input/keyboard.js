"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyboardExecutor = void 0;
const keySender = require('node-key-sender');
/**
 * 键盘输入执行器
 * 负责将键盘输入状态转换为系统键盘事件
 */
class KeyboardExecutor {
    constructor() {
        // 记录当前键盘状态
        this.currentKeyboardState = new Set();
    }
    /**
     * 应用完整输入状态
     * @param state 输入状态
     */
    applyState(state) {
        this.updateKeyboardState(state.keyboard);
    }
    /**
     * 应用输入增量
     * @param delta 输入增量
     */
    applyDelta(delta) {
        if (delta.keyboard) {
            // 创建新的键盘状态副本
            const newState = new Set(this.currentKeyboardState);
            // 处理按下的键
            if (delta.keyboard.pressed) {
                delta.keyboard.pressed.forEach(key => newState.add(key));
            }
            // 处理释放的键
            if (delta.keyboard.released) {
                delta.keyboard.released.forEach(key => newState.delete(key));
            }
            // 更新键盘状态
            this.updateKeyboardState(newState);
        }
    }
    /**
     * 应用输入事件
     * @param event 输入事件
     */
    applyEvent(event) {
        if (event.type === 'key_down' || event.type === 'key_up') {
            // 创建新的键盘状态副本
            const newState = new Set(this.currentKeyboardState);
            const key = event.data.key;
            if (event.type === 'key_down') {
                newState.add(key);
            }
            else {
                newState.delete(key);
            }
            // 更新键盘状态
            this.updateKeyboardState(newState);
        }
    }
    /**
     * 重置输入状态
     */
    reset() {
        // 释放所有按键
        this.updateKeyboardState(new Set());
    }
    /**
     * 更新键盘状态
     * @param newState 新的键盘状态
     */
    updateKeyboardState(newState) {
        // 找出新增的按键（需要按下）
        const keysToPress = new Set([...newState].filter(key => !this.currentKeyboardState.has(key)));
        // 找出移除的按键（需要释放）
        const keysToRelease = new Set([...this.currentKeyboardState].filter(key => !newState.has(key)));
        // 执行按键按下
        if (keysToPress.size > 0) {
            const keysArray = Array.from(keysToPress);
            console.log('Pressing keys:', keysArray);
            try {
                // node-key-sender 的 sendKey 方法支持单个键或键数组
                keySender.sendKey(keysArray);
            }
            catch (error) {
                console.error('Error pressing keys:', error);
            }
        }
        // 注意：node-key-sender 没有直接的释放键方法，
        // 它会自动释放按键。对于需要持续按住的情况，
        // 我们需要使用其他库或方法。
        // 更新当前键盘状态
        this.currentKeyboardState = newState;
    }
}
exports.KeyboardExecutor = KeyboardExecutor;
//# sourceMappingURL=keyboard.js.map