import React, { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { getWindowMeta } from '../data/windows.js';

const WindowManagerStateContext = createContext(null);
const WindowManagerDispatchContext = createContext(null);

const initialState = {
  windows: {}, // id -> { id, x, y, width, height, zIndex, minimized, maximized, prevRect }
  order: [],   // ids in the order they were opened, drives the taskbar
  zTop: 10,
  cascade: 0,
};

function focus(state, id) {
  if (!state.windows[id]) return state;
  const zTop = state.zTop + 1;
  return {
    ...state,
    windows: { ...state.windows, [id]: { ...state.windows[id], zIndex: zTop } },
    zTop,
  };
}

function minimizeOff(state, id) {
  if (!state.windows[id]) return state;
  return { ...state, windows: { ...state.windows, [id]: { ...state.windows[id], minimized: false } } };
}

function reducer(state, action) {
  switch (action.type) {
    case 'OPEN': {
      const { id } = action;
      if (state.windows[id]) {
        return focus(minimizeOff(state, id), id);
      }
      const meta = getWindowMeta(id);
      if (!meta) return state;
      const offset = (state.cascade % 6) * 28;
      const width = meta.w;
      const height = meta.h;
      const x = Math.max(20, (window.innerWidth - width) / 2 + offset - 60);
      const y = Math.max(20, (window.innerHeight - height) / 2 + offset - 80);
      const zTop = state.zTop + 1;
      return {
        ...state,
        windows: {
          ...state.windows,
          [id]: { id, x, y, width, height, zIndex: zTop, minimized: false, maximized: false, prevRect: null },
        },
        order: [...state.order, id],
        zTop,
        cascade: state.cascade + 1,
      };
    }
    case 'CLOSE': {
      const { id } = action;
      if (!state.windows[id]) return state;
      const windows = { ...state.windows };
      delete windows[id];
      return { ...state, windows, order: state.order.filter((w) => w !== id) };
    }
    case 'FOCUS':
      return focus(state, action.id);
    case 'MINIMIZE': {
      const { id } = action;
      if (!state.windows[id]) return state;
      return { ...state, windows: { ...state.windows, [id]: { ...state.windows[id], minimized: true } } };
    }
    case 'RESTORE':
      return focus(minimizeOff(state, action.id), action.id);
    case 'TOGGLE_MINIMIZE': {
      const { id } = action;
      const w = state.windows[id];
      if (!w) return state;
      if (w.minimized) return focus(minimizeOff(state, id), id);
      const visibleIds = Object.keys(state.windows).filter((wid) => !state.windows[wid].minimized);
      const topId = visibleIds.reduce((top, wid) => (
        !top || state.windows[wid].zIndex > state.windows[top].zIndex ? wid : top
      ), null);
      if (topId === id) {
        return { ...state, windows: { ...state.windows, [id]: { ...w, minimized: true } } };
      }
      return focus(state, id);
    }
    case 'TOGGLE_MAXIMIZE': {
      const { id } = action;
      const w = state.windows[id];
      if (!w) return state;
      if (w.maximized) {
        return {
          ...state,
          windows: { ...state.windows, [id]: { ...w, maximized: false, ...w.prevRect, prevRect: null } },
        };
      }
      return {
        ...state,
        windows: {
          ...state.windows,
          [id]: { ...w, maximized: true, prevRect: { x: w.x, y: w.y, width: w.width, height: w.height } },
        },
      };
    }
    case 'MOVE': {
      const { id, x, y } = action;
      if (!state.windows[id]) return state;
      return { ...state, windows: { ...state.windows, [id]: { ...state.windows[id], x, y } } };
    }
    case 'RESIZE': {
      const { id, width, height } = action;
      if (!state.windows[id]) return state;
      return { ...state, windows: { ...state.windows, [id]: { ...state.windows[id], width, height } } };
    }
    case 'SHOW_DESKTOP': {
      const windows = {};
      Object.keys(state.windows).forEach((id) => {
        windows[id] = { ...state.windows[id], minimized: true };
      });
      return { ...state, windows };
    }
    default:
      return state;
  }
}

export function WindowManagerProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <WindowManagerStateContext.Provider value={state}>
      <WindowManagerDispatchContext.Provider value={dispatch}>
        {children}
      </WindowManagerDispatchContext.Provider>
    </WindowManagerStateContext.Provider>
  );
}

function useWindowManagerState() {
  const ctx = useContext(WindowManagerStateContext);
  if (!ctx) throw new Error('useWindowManagerState must be used within WindowManagerProvider');
  return ctx;
}

function useWindowManagerDispatch() {
  const ctx = useContext(WindowManagerDispatchContext);
  if (!ctx) throw new Error('useWindowManagerDispatch must be used within WindowManagerProvider');
  return ctx;
}

/** Bundles state + action helpers — the hook every component actually uses. */
export function useWindowManager() {
  const state = useWindowManagerState();
  const dispatch = useWindowManagerDispatch();

  const openWindow = useCallback((id) => dispatch({ type: 'OPEN', id }), [dispatch]);
  const closeWindow = useCallback((id) => dispatch({ type: 'CLOSE', id }), [dispatch]);
  const focusWindow = useCallback((id) => dispatch({ type: 'FOCUS', id }), [dispatch]);
  const minimizeWindow = useCallback((id) => dispatch({ type: 'MINIMIZE', id }), [dispatch]);
  const restoreWindow = useCallback((id) => dispatch({ type: 'RESTORE', id }), [dispatch]);
  const toggleMinimize = useCallback((id) => dispatch({ type: 'TOGGLE_MINIMIZE', id }), [dispatch]);
  const toggleMaximize = useCallback((id) => dispatch({ type: 'TOGGLE_MAXIMIZE', id }), [dispatch]);
  const moveWindow = useCallback((id, x, y) => dispatch({ type: 'MOVE', id, x, y }), [dispatch]);
  const resizeWindow = useCallback((id, width, height) => dispatch({ type: 'RESIZE', id, width, height }), [dispatch]);
  const showDesktop = useCallback(() => dispatch({ type: 'SHOW_DESKTOP' }), [dispatch]);

  const topId = useMemo(() => {
    const visible = state.order.filter((id) => state.windows[id] && !state.windows[id].minimized);
    return visible.reduce((top, id) => (
      !top || state.windows[id].zIndex > state.windows[top].zIndex ? id : top
    ), null);
  }, [state.order, state.windows]);

  return {
    windows: state.windows,
    openIds: state.order,
    topId,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    restoreWindow,
    toggleMinimize,
    toggleMaximize,
    moveWindow,
    resizeWindow,
    showDesktop,
  };
}
