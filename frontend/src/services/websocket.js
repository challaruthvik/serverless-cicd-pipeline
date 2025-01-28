import { createContext, useContext, useEffect, useState } from 'react';

const WS_URL = 'wss://rt4brt6jwe.execute-api.us-east-1.amazonaws.com/production';

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState({
    deployments: 0,
    successRate: 0,
    activeServices: 0,
    recentDeployments: [],
    error: null
  });

  const connect = () => {
    try {
      console.log('Attempting to connect to:', WS_URL);
      const ws = new WebSocket(WS_URL);
      
      ws.onopen = () => {
        console.log('Successfully connected to WebSocket');
        setIsConnected(true);
      };

      ws.onmessage = (event) => {
        console.log('Received message:', event.data);
        try {
          const message = JSON.parse(event.data);
          console.log('Received message:', message);
          
          switch(message.type) {
            case 'DEPLOYMENT_UPDATE':
              setData(prev => ({
                ...prev,
                deployments: message.totalDeployments,
                successRate: message.successRate,
                recentDeployments: [
                  message.latestDeployment,
                  ...prev.recentDeployments.slice(0, 4)
                ]
              }));
              break;
            
            case 'SERVICE_UPDATE':
              setData(prev => ({
                ...prev,
                activeServices: message.activeServices
              }));
              break;

            default:
              console.log('Unknown message type:', message.type);
          }
        } catch (error) {
          console.error('Failed to parse message:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        console.log('Connection URL:', WS_URL);
        setIsConnected(false);
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed');
        setIsConnected(false);
        setTimeout(connect, 5000);
      };

      setSocket(ws);
    } catch (error) {
      console.error('Connection error:', error);
      setIsConnected(false);
      setTimeout(connect, 5000);
    }
  };

  useEffect(() => {
    connect();
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ ...data, isConnected }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);