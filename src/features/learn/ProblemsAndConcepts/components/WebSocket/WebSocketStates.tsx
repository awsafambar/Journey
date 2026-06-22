import  { useState, useRef } from 'react';

function WebSocketStates() {
  const [connectionState, setConnectionState] = useState('CLOSED');
  const ws = useRef<WebSocket|null>(null);

  // WebSocket ready states
  const states: Record<0 | 1 | 2 | 3, { name: string; color: string; description: string }> = {
    0: { name: 'CONNECTING', color: 'orange', description: 'Connecting to server...' },
    1: { name: 'OPEN', color: 'green', description: 'Connected and ready' },
    2: { name: 'CLOSING', color: 'orange', description: 'Closing connection...' },
    3: { name: 'CLOSED', color: 'red', description: 'Not connected' }
  };

  const connect = () => {
    ws.current = new WebSocket('wss://echo.websocket.org');
    
    ws.current.onopen = () => updateState();
    ws.current.onclose = () => updateState();
    ws.current.onerror = () => updateState();
    
    // Update state every second to show changes
    const interval = setInterval(() => updateState(), 100);
    
    // Cleanup
    return () => {
      clearInterval(interval);
      ws.current?.close();
    };
  };

  const updateState = () => {
    if (ws.current) {
      setConnectionState(states[ws.current.readyState as 0 | 1 | 2 | 3].name);
    }
  };

  const disconnect = () => {
    ws.current?.close();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🔄 WebSocket States</h2>
      
      <div style={{
        padding: '20px',
        background: '#f0f0f0',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <div style={{
          padding: '20px',
          background: (Object.values(states).find(state => state.name === connectionState)?.color ?? 'gray') + '20',
          borderLeft: `4px solid ${Object.values(states).find(state => state.name === connectionState)?.color ?? 'gray'}`,
          borderRadius: '4px'
        }}>
          <h3>Current State: {connectionState}</h3>
          <p>{Object.values(states).find(state => state.name === connectionState)?.description ?? ''}</p>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button onClick={connect} style={{ padding: '8px 16px' }}>Connect</button>
          <button onClick={disconnect} style={{ padding: '8px 16px' }}>Disconnect</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        {Object.entries(states).map(([code, state]) => (
          <div key={code} style={{
            padding: '15px',
            background: '#f8f9fa',
            borderLeft: `4px solid ${state.color}`,
            borderRadius: '4px'
          }}>
            <strong>{state.name}</strong>
            <p style={{ fontSize: '12px', marginTop: '5px' }}>Code: {code}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WebSocketStates;