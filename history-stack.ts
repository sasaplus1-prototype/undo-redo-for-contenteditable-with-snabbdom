export class HistoryStack<T> {
  private _index = -1;
  private _stack: T[] = [];

  add(history: T): void {
    this._stack.splice(this._index + 1, Infinity, history);
    this._index = this._stack.length - 1;
  }

  canRedo(): boolean {
    return this._index < this._stack.length - 1;
  }

  canUndo(): boolean {
    return this._index >= 0;
  }

  redo(): T {
    if (this._index >= this._stack.length - 1) {
      throw new Error('Cannot redo');
    }

    return this._stack[++this._index];
  }

  undo(): T {
    if (this._index < 0) {
      throw new Error('Cannot undo');
    }

    return this._stack[this._index--];
  }
}
