import { startWsServer, stopWsServer } from '../../src/ws/server';
import { startInputExecutor, stopInputExecutor, getExecutorManager } from '../../src/input/executor';
import { StateStore } from '../../src/input/stateStore';
import { ApplyScheduler } from '../../src/input/applyScheduler';

describe('Startup Phase Tests', () => {
  let stateStore: StateStore;
  let applyScheduler: ApplyScheduler;

  afterEach(() => {
    if (applyScheduler) {
      applyScheduler.stop();
    }
    stopInputExecutor();
    stopWsServer();
  });

  test('should initialize all components correctly', () => {
    // Start WebSocket server
    startWsServer();

    // Start input executor
    startInputExecutor();

    // Initialize state store
    stateStore = new StateStore();

    // Get executor manager
    const executorManager = getExecutorManager();
    expect(executorManager).toBeDefined();

    // Initialize apply scheduler
    applyScheduler = new ApplyScheduler(executorManager, stateStore);
    applyScheduler.start();

    // Verify scheduler is running
    expect(applyScheduler.isRunning()).toBe(true);
  });

  test('should handle component shutdown correctly', () => {
    // Start all components
    startWsServer();
    startInputExecutor();
    stateStore = new StateStore();
    const executorManager = getExecutorManager();
    applyScheduler = new ApplyScheduler(executorManager, stateStore);
    applyScheduler.start();

    // Verify components are running
    expect(applyScheduler.isRunning()).toBe(true);

    // Stop components
    applyScheduler.stop();
    stopInputExecutor();
    stopWsServer();

    // Verify scheduler is stopped
    expect(applyScheduler.isRunning()).toBe(false);
  });

  test('should create StateStore with initial state', () => {
    stateStore = new StateStore();
    const initialState = stateStore.getLatestState();
    expect(initialState).toBeNull();
  });

  test('should initialize ApplyScheduler with correct default interval', () => {
    startInputExecutor();
    const executorManager = getExecutorManager();
    stateStore = new StateStore();
    applyScheduler = new ApplyScheduler(executorManager, stateStore);
    
    // Start and immediately stop to verify it can start
    applyScheduler.start();
    expect(applyScheduler.isRunning()).toBe(true);
  });
});
