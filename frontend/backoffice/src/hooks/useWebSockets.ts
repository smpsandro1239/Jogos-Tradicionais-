import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const useWebSockets = (aldeiaId?: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [lastEvent, setLastEvent] = useState<{ type: string; data: any } | null>(null);

  useEffect(() => {
    if (!aldeiaId) return;

    const newSocket = io(SOCKET_URL);

    newSocket.on('connect', () => {
      console.log('Connected to WebSocket');
      newSocket.emit('join_aldeia', aldeiaId);
    });

    newSocket.on('jogo_sorteado', (data) => {
      setLastEvent({ type: 'jogo_sorteado', data });
    });

    newSocket.on('nova_participacao', (data) => {
      setLastEvent({ type: 'nova_participacao', data });
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [aldeiaId]);

  return { socket, lastEvent };
};
