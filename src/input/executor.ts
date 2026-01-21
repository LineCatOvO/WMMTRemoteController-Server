import { config } from '../config/config';
import { inputState } from './state';
import { KeyboardExecutor } from './keyboard';
import { MouseExecutor } from './mouse';
import { JoystickExecutor } from './joystick';
import { InputExecutor, InputExecutorManager } from './interfaces';

/**
 * 输入执行器管理器实现
 */
export class DefaultInputExecutorManager implements InputExecutorManager {
  private executors: InputExecutor[] = [];
  
  /**
   * 添加输入执行器
   * @param executor 输入执行器
   */
  addExecutor(executor: InputExecutor): void {
    this.executors.push(executor);
  }
  
  /**
   * 移除输入执行器
   * @param executor 输入执行器
   */
  removeExecutor(executor: InputExecutor): void {
    this.executors = this.executors.filter(e => e !== executor);
  }
  
  /**
   * 应用完整输入状态到所有执行器
   * @param state 输入状态
   */
  applyState(state: any): void {
    this.executors.forEach(executor => executor.applyState(state));
  }
  
  /**
   * 应用输入增量到所有执行器
   * @param delta 输入增量
   */
  applyDelta(delta: any): void {
    this.executors.forEach(executor => executor.applyDelta(delta));
  }
  
  /**
   * 应用输入事件到所有执行器
   * @param event 输入事件
   */
  applyEvent(event: any): void {
    this.executors.forEach(executor => executor.applyEvent(event));
  }
  
  /**
   * 重置所有执行器
   */
  reset(): void {
    this.executors.forEach(executor => executor.reset());
  }
}

// 创建输入执行器管理器实例
const executorManager = new DefaultInputExecutorManager();

// 添加默认的输入执行器
executorManager.addExecutor(new KeyboardExecutor());
executorManager.addExecutor(new MouseExecutor());
executorManager.addExecutor(new JoystickExecutor());

/**
 * 开始输入执行循环
 * @returns 定时器ID，用于后续清理
 */
export function startInputExecutor() {
  console.log(`Starting input executor with interval: ${config.inputUpdateInterval}ms`);
  
  // 输入执行循环（125Hz）
  return setInterval(() => {
    executeInput();
  }, config.inputUpdateInterval);
}

/**
 * 执行输入
 */
function executeInput() {
  // 应用当前输入状态到所有执行器
  executorManager.applyState(inputState);
}

/**
 * 获取输入执行器管理器
 * @returns 输入执行器管理器实例
 */
export function getExecutorManager(): InputExecutorManager {
  return executorManager;
}