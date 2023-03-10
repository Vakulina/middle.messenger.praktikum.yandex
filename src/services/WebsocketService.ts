import { EventBus } from './EventBus';

export class WebsocketService extends EventBus {
  static EVENTS = {
    OPEN: 'open',
    CONNECTED: 'connected',
    MESSAGE: 'message',
    GET_MESSAGE: 'get-message',
    ERROR: 'error',
    CLOSE: 'close',
  } as const;

  protected connection: WebSocket | null = null;

  constructor(private wsURL: string) {
    super();

    this.connectWS();
  }

  private connectWS() {
    this.connection = new WebSocket(this.wsURL);

    this.registerEvents();

    this.registerWSEvents(this.connection);
  }

  private registerEvents() {
    this.on(WebsocketService.EVENTS.CONNECTED, () => this.loadChat());

    this.on(WebsocketService.EVENTS.ERROR, (event) => {
      console.error('Ошибка', event);
    });
  }

  private registerWSEvents(socket: WebSocket) {
    socket.onopen = () => {
      this.emit(WebsocketService.EVENTS.CONNECTED);
    };

    socket.onmessage = (message: MessageEvent) => {
      const data = JSON.parse(message.data);

      if (data.type && data.type === 'pong') {
        return;
      }

      this.emit(WebsocketService.EVENTS.GET_MESSAGE, data);
    };

    socket.onclose = () => {
      this.emit(WebsocketService.EVENTS.CLOSE);
    };

    socket.onerror = (event) => {
      this.emit(WebsocketService.EVENTS.ERROR, event);
    };
  }

  public close(code?: number, reason?: string) {
    if (!this.connection) {
      throw new Error('WS соединение не установлено');
    }
    this.connection.close(code, reason);
  }

  private async loadChat() {
    await this.ping();
    this.getOldMessages();
  }

  private async ping() {
    let pingInterval: any = setInterval(() => {
      if (!this.connection) {
        throw new Error('WS соединение не установлено');
      }
      this.connection.send(
        JSON.stringify({
          type: 'ping',
        }),
      );
    }, 10000);

    this.on(WebsocketService.EVENTS.CLOSE, () => {
      clearInterval(pingInterval);
      pingInterval = undefined;
    });
  }

  public async getOldMessages(from = 0) {
    if (!this.connection) {
      throw new Error('WS соединение не установлено');
    }
    await this.connection.send(
      JSON.stringify({
        content: from,
        type: 'get old',
      }),
    );
  }

  public sendMessage(text: string) {
    if (!this.connection) {
      throw new Error('WS соединение не установлено');
    }

    this.connection.send(
      JSON.stringify({
        content: text,
        type: 'message',
      }),
    );
  }

  public getSocket():WebsocketService {
    if (!this.connection || this.connection.readyState === this.connection.CLOSED) {
      this.connectWS();
    }
    return this;
  }
}
