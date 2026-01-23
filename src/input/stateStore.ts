import { InputState } from '../types/ws';

/**
 * 状态存储配置
 */
interface StateStoreConfig {
  maxHistorySize: number; // 最大历史状态记录数
}

/**
 * 状态存储
 * 负责管理ControlResultState的存储、时间语义和序列号校验
 */
export class StateStore {
  // 最新状态
  private latestState: InputState | null = null;
  
  // 状态历史记录
  private stateHistory: Array<{
    state: InputState;
    receivedTime: number;
    appliedTime: number | null;
    sequenceNumber: number;
  }> = [];
  
  // 最后应用的序列号
  private lastAppliedSequenceNumber: number = 0;
  
  // 配置
  private readonly config: StateStoreConfig;
  
  /**
   * 构造函数
   * @param config 状态存储配置
   */
  constructor(config?: Partial<StateStoreConfig>) {
    this.config = {
      maxHistorySize: 100, // 默认保留100条历史记录
      ...config
    };
  }
  
  /**
   * 存储新状态
   * @param state 新状态
   * @returns 是否成功存储
   */
  storeState(state: InputState): boolean {
    // 验证状态完整性
    if (!this.isValidState(state)) {
      console.error('StateStoreError: Invalid state received');
      return false;
    }
    
    // 验证序列号单调性
    const sequenceNumber = this.extractSequenceNumber(state);
    if (!this.isValidSequenceNumber(sequenceNumber)) {
      console.error(`StateStoreError: Invalid sequence number ${sequenceNumber}, last applied: ${this.lastAppliedSequenceNumber}`);
      return false;
    }
    
    // 存储状态
    const receivedTime = Date.now();
    this.latestState = state;
    
    // 添加到历史记录
    this.stateHistory.push({
      state,
      receivedTime,
      appliedTime: null,
      sequenceNumber
    });
    
    // 限制历史记录大小
    if (this.stateHistory.length > this.config.maxHistorySize) {
      this.stateHistory.shift();
    }
    
    // 只记录关键状态信息，不重复打印完整状态
    return true;
  }
  
  /**
   * 获取最新状态
   * @returns 最新状态
   */
  getLatestState(): InputState | null {
    return this.latestState;
  }
  
  /**
   * 记录状态应用时间
   * @param sequenceNumber 序列号
   */
  recordAppliedState(sequenceNumber: number): void {
    // 更新最后应用的序列号
    this.lastAppliedSequenceNumber = sequenceNumber;
    
    // 更新历史记录中的应用时间
    const historyEntry = this.stateHistory.find(entry => entry.sequenceNumber === sequenceNumber);
    if (historyEntry) {
      historyEntry.appliedTime = Date.now();
      // 移除重复的应用状态日志
    }
  }
  
  /**
   * 验证状态完整性
   * @param state 要验证的状态
   * @returns 是否有效
   */
  private isValidState(state: InputState): boolean {
    // 基本验证：状态对象必须存在
    if (!state) return false;
    
    // 验证必要字段
    // InputState requires keyboard, mouse, joystick, and gyroscope fields
    if (!state.keyboard || !state.mouse || !state.joystick || !state.gyroscope) {
      return false;
    }
    
    // frameId is optional but recommended, so we don't validate it here
    
    return true;
  }
  
  /**
   * 提取序列号
   * @param state 状态对象
   * @returns 序列号
   */
  private extractSequenceNumber(state: InputState): number {
    // 这里假设state中有frameId字段作为序列号
    // 如果没有，则使用时间戳作为序列号
    return (state as any).frameId || Date.now();
  }
  
  /**
   * 验证序列号单调性
   * @param sequenceNumber 要验证的序列号
   * @returns 是否有效
   */
  private isValidSequenceNumber(sequenceNumber: number): boolean {
    // If no state has been stored yet, any sequence number is valid
    if (!this.latestState) {
      return true;
    }
    
    // Get the sequence number of the latest stored state
    const latestSequenceNumber = this.extractSequenceNumber(this.latestState);
    
    // 序列号必须大于最后存储的序列号
    // 不允许相同或更小的序列号
    return sequenceNumber > latestSequenceNumber;
  }
  
  /**
   * 获取状态历史记录
   * @returns 状态历史记录
   */
  getStateHistory(): Array<{
    state: InputState;
    receivedTime: number;
    appliedTime: number | null;
    sequenceNumber: number;
  }> {
    return [...this.stateHistory];
  }
  
  /**
   * 获取最后应用的序列号
   * @returns 最后应用的序列号
   */
  getLastAppliedSequenceNumber(): number {
    return this.lastAppliedSequenceNumber;
  }
  
  /**
   * 获取最后接收时间
   * @returns 最后接收时间
   */
  getLastReceivedTime(): number {
    return this.latestState ? Date.now() : 0;
  }
  
  /**
   * 清空所有状态
   */
  clear(): void {
    this.latestState = null;
    this.stateHistory = [];
    this.lastAppliedSequenceNumber = 0;
    console.log('StateStore: All states cleared');
  }
}
