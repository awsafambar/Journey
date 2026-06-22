import { useEffect, useRef, useState } from "react";

type Message = { sender: string; text: string; time: string };


export const WebSocketBasic = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [input, setInput] = useState('');
    const ws = useRef<WebSocket | null>(null);

    const addMessage = (sender: string, text: string) => {
        setMessages(prev => [...prev, { sender, text, time: new Date().toLocaleTimeString() }]);
    };

    useEffect(() => {
        ws.current = new WebSocket('wss://echo.websocket.org')

        ws.current.onopen = () => {
            console.log('✅ Connected to WebSocket');
            setIsConnected(true);
            addMessage('System', 'Connected to server');
        };


        // 👇 STEP 3: Listen for messages
        ws.current.onmessage = (event) => {
            console.log('📨 Received:', event.data);
            addMessage('Server', event.data);
        };

        ws.current.onclose = () => {
            console.log('🔌 Disconnected');
            setIsConnected(false);
            addMessage('System', 'Disconnected from server');
        };


        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };

    }, [])

    const sendMessage = () => {
    if (input.trim() && ws.current?.readyState === WebSocket.OPEN) {
      console.log('📤 Sending:', input);
      ws.current.send(input);
      addMessage('You', input);
      setInput('');
    }
  };



   return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>📻 WebSocket Basics</h1>
      
      {/* Connection Status */}
      <div style={{
        padding: '10px',
        background: isConnected ? '#d4edda' : '#f8d7da',
        color: isConnected ? '#155724' : '#721c24',
        borderRadius: '4px',
        marginBottom: '20px'
      }}>
        Status: {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
      </div>

      {/* Messages */}
      <div style={{
        height: '300px',
        overflowY: 'auto',
        border: '1px solid #ddd',
        padding: '10px',
        marginBottom: '20px',
        background: '#f9f9f9'
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            marginBottom: '8px',
            textAlign: msg.sender === 'You' ? 'right' : 'left'
          }}>
            <div style={{
              display: 'inline-block',
              padding: '8px 12px',
              background: msg.sender === 'You' ? '#007bff' : '#e9ecef',
              color: msg.sender === 'You' ? 'white' : 'black',
              borderRadius: '12px',
              maxWidth: '80%'
            }}>
              <small>{msg.sender}</small>
              <br />
              {msg.text}
              <br />
              <small>{msg.time}</small>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          style={{ flex: 1, padding: '8px' }}
          disabled={!isConnected}
        />
        <button
          onClick={sendMessage}
          disabled={!isConnected || !input.trim()}
          style={{
            padding: '8px 16px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Send
        </button>
      </div>

      <div style={{ marginTop: '20px', background: '#e3f2fd', padding: '15px', borderRadius: '4px' }}>
        <h4>🎯 What's happening?</h4>
        <ol>
          <li>Connection opens (handshake)</li>
          <li>Both sides can send messages anytime</li>
          <li>Messages arrive instantly</li>
          <li>Connection stays open until closed</li>
        </ol>
      </div>
    </div>
  );
}

export default WebSocketBasic;
