var HistoryStack = /** @class */ (function () {
    function HistoryStack() {
        this._index = -1;
        this._stack = [];
    }
    HistoryStack.prototype.add = function (history) {
        this._stack.splice(this._index + 1, Infinity, history);
        this._index = this._stack.length - 1;
    };
    HistoryStack.prototype.canRedo = function () {
        return this._index < this._stack.length - 1;
    };
    HistoryStack.prototype.canUndo = function () {
        return this._index >= 0;
    };
    HistoryStack.prototype.redo = function () {
        if (this._index >= this._stack.length - 1) {
            throw new Error('Cannot redo');
        }
        return this._stack[++this._index];
    };
    HistoryStack.prototype.undo = function () {
        if (this._index < 0) {
            throw new Error('Cannot undo');
        }
        return this._stack[this._index--];
    };
    return HistoryStack;
}());
export { HistoryStack };
