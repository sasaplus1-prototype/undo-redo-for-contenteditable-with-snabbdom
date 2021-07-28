import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  toVNode
} from 'snabbdom';

import { HistoryStack } from './history-stack';

import type { VNode } from 'snabbdom';

type EditStack = {
  vdom: VNode
}

const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
]);

const hs = new HistoryStack<EditStack>();

const editor = document.querySelector<HTMLDivElement>('#js-editor');
const undoButton = document.querySelector<HTMLButtonElement>('#js-undo');
const redoButton = document.querySelector<HTMLButtonElement>('#js-redo');

function undoEdit() {
  if (!editor) {
    return;
  }

  if (!hs.canRedo()) {
    hs.undo();
  }

  const { vdom } = hs.undo();

  patch(toVNode(editor), vdom);

  if (undoButton) {
    undoButton.disabled = !hs.canUndo();
  }
  if (redoButton) {
    redoButton.disabled = !hs.canRedo();
  }
}

function redoEdit() {
  if (!editor) {
    return;
  }

  if (!hs.canUndo()) {
    hs.redo();
  }

  const { vdom } = hs.redo();

  patch(toVNode(editor), vdom);

  if (undoButton) {
    undoButton.disabled = !hs.canUndo();
  }
  if (redoButton) {
    redoButton.disabled = !hs.canRedo();
  }
}

function onInput(event: Event) {
  if (!editor) {
    return;
  }

  if ('isComposing' in event && !(event as InputEvent).isComposing) {
    hs.add({
      vdom: toVNode(editor)
    });

    if (undoButton) {
      undoButton.disabled = !hs.canUndo();
    }
    if (redoButton) {
      redoButton.disabled = !hs.canRedo();
    }
  }
}

if (editor) {
  hs.add({
    vdom: toVNode(editor)
  });

  editor.addEventListener('input', onInput, false);

  if (undoButton) {
    undoButton.addEventListener('click', undoEdit, false);
  }
  if (redoButton) {
    redoButton.addEventListener('click', redoEdit, false);
  }
}
