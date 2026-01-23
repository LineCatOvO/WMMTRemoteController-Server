import { WsClient } from '../common/wsClient';
import { startWsServer, stopWsServer } from '../../src/ws/server';

describe('WebSocket Connection Tests', () => {
  let client: WsClient;

  beforeAll(() => {
    startWsServer();
  });

  afterAll(() => {
    stopWsServer();
  });

  afterEach(() => {
    if (client) {
      client.close();
    }
  });

  test('should establish WebSocket connection successfully', async () => {
    client = new WsClient();
    await expect(client.connect()).resolves.not.toThrow();
  });

  test('should handle multiple concurrent connections', async () => {
    const client1 = new WsClient();
    const client2 = new WsClient();
    const client3 = new WsClient();

    await Promise.all([
      expect(client1.connect()).resolves.not.toThrow(),
      expect(client2.connect()).resolves.not.toThrow(),
      expect(client3.connect()).resolves.not.toThrow()
    ]);

    client1.close();
    client2.close();
    client3.close();
  });

  test('should handle disconnection gracefully', async () => {
    client = new WsClient();
    await client.connect();
    
    const closePromise = new Promise<void>((resolve) => {
      client.onClose(() => resolve());
    });

    client.close();
    await expect(closePromise).resolves.not.toThrow();
  });

  test('should handle reconnection correctly', async () => {
    // Connect first time
    client = new WsClient();
    await client.connect();
    client.close();

    // Connect again
    client = new WsClient();
    await expect(client.connect()).resolves.not.toThrow();
  });

  test('should respond to ping messages', async () => {
    client = new WsClient();
    await client.connect();

    const pingResponse = new Promise<any>((resolve) => {
      client.onMessage((message) => {
        if (message.type === 'pong') {
          resolve(message);
        }
      });
    });

    await client.send({ type: 'ping' });
    const response = await pingResponse;
    expect(response).toHaveProperty('type', 'pong');
  });
});
