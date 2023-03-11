export interface IEventBus {
  listeners: Record<string, Array<Function>>,
  on: (event: string, callback: (...args: unknown[]) => void) => void,
  off: (event: string, callback: (...args: unknown[]) => void) => void,
  emit: (event: string, ...args: unknown[]) => void
}

class EventBus implements IEventBus {
  readonly listeners: { [key: string]: Array<Function> };

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: (...args: unknown[]) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(callback);
  }

  off(event: string, callback: (...args: unknown[]) => void) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event]!.filter(
      (listener) => listener !== callback,
    );
  }

  emit(event: string, ...args: unknown[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event]!.forEach((listener) => {
      listener(...args);
    });
  }
}
export { EventBus };
