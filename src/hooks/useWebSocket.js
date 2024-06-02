import { useEffect, useRef } from 'react';
import Cookies from 'js-cookie';

let ws = null;
const listeners = [];

export const useWebSocket = () => {
  const wsRef = useRef(null);

  useEffect(() => {
    const token = Cookies.get('access');
    ws = new WebSocket(`ws://localhost:8000/websocket/${token}`);

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      listeners.forEach(listener => listener(message));
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error', error);
    };

    wsRef.current = ws;

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const sendMessage = (message) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  };

  const addListener = (listener) => {
    listeners.push(listener);
  };

  const removeListener = (listener) => {
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };

  return { sendMessage, addListener, removeListener };
};
