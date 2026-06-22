import './WebSocketTutorial.css'; // We'll create this next

const WebSocketTutorial = () => {
  return (
    <div className="blog-container">
      {/* Header */}
      <header className="blog-header">
        <div className="header-content">
          <h1>📻 Understanding WebSocket Chat</h1>
          <div className="meta-info">
            <span className="author">By Your Name</span>
            <span className="date">March 2, 2026</span>
            <span className="read-time">10 min read</span>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="blog-content">
        
        {/* Introduction Block */}
        <section className="intro-section">
          <p className="lead">
            Think of WebSocket like a <strong>walkie-talkie in an office building</strong> - 
            once connected, you can talk back and forth instantly. Let me walk you through 
            exactly what happens, step by step, with no code.
          </p>
        </section>

        {/* Step 1: Connection Setup */}
        <section className="step-section">
          <h2>
            <span className="step-number">1</span>
            Connection Setup (The Handshake)
          </h2>
          
          <div className="analogy-box">
            <strong>🎯 What happens when someone joins:</strong>
          </div>

          <div className="flow-diagram">
            <div className="flow-row">
              <div className="actor">Employee A:</div>
              <div className="action">Turns on walkie-talkie</div>
            </div>
            <div className="flow-row">
              <div className="actor"></div>
              <div className="arrow">⬇️</div>
            </div>
            <div className="flow-row">
              <div className="actor">Employee A:</div>
              <div className="action">"Channel 7, anyone there?"</div>
              <div className="direction">───▶</div>
            </div>
            <div className="flow-row">
              <div className="actor">Server:</div>
              <div className="action">"Channel 7 is open"</div>
              <div className="direction">◀───</div>
            </div>
          </div>

          <div className="real-example">
            <h4>📱 Real Example:</h4>
            <div className="example-bubble">
              <p>👤 <strong>John</strong> opens chat app</p>
              <p className="indent">→ App connects to server</p>
              <p className="indent">→ Server says: "Welcome John! Current users: Alice, Bob"</p>
              <p className="indent">→ John sees: "Alice, Bob are online"</p>
              <p className="indent">→ Server tells others: "John just joined"</p>
              <p className="indent">→ Alice sees: "John joined the chat"</p>
            </div>
          </div>
        </section>

        {/* Step 2: Sending Messages */}
        <section className="step-section">
          <h2>
            <span className="step-number">2</span>
            Sending Messages (The Conversation)
          </h2>

          <div className="message-flow">
            <div className="message-row">
              <span className="sender">John:</span>
              <span className="message-content">"Hey everyone!"</span>
              <span className="arrow">→</span>
              <span className="receiver">Server</span>
            </div>
            <div className="message-row server">
              <span className="sender">Server:</span>
              <span className="message-content">"Who's online?"</span>
            </div>
            <div className="message-row">
              <span className="sender">Server → Alice:</span>
              <span className="message-content">"John says: Hey everyone!"</span>
            </div>
            <div className="message-row">
              <span className="sender">Server → Bob:</span>
              <span className="message-content">"John says: Hey everyone!"</span>
            </div>
          </div>
        </section>

        {/* Step 3: Message Flow Visualization */}
        <section className="step-section">
          <h2>
            <span className="step-number">3</span>
            Message Flow Visualization
          </h2>

          <div className="visualization">
            <table className="flow-table">
              <thead>
                <tr>
                  <th>John's Browser</th>
                  <th>Internet</th>
                  <th>Server</th>
                  <th>Internet</th>
                  <th>Bob's Browser</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="cell-content">"Hello!"</td>
                  <td className="arrow-cell">───▶</td>
                  <td className="cell-content">Received: {`{user:"John", text:"Hello!"}`}</td>
                  <td className="arrow-cell"></td>
                  <td className="cell-content"></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td className="cell-content">Look up: Who's in chat?<br/>→ Alice, Bob</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td className="cell-content">Send to Bob</td>
                  <td className="arrow-cell">───▶</td>
                  <td className="cell-content highlight">"Hello!" appears</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Step 4: Timeline View */}
        <section className="step-section">
          <h2>
            <span className="step-number">4</span>
            What Happens When You Type
          </h2>

          <div className="timeline">
            <div className="timeline-item">
              <span className="time">0.00s</span>
              <span className="event">John opens app</span>
              <span className="user-sees">"Connecting..."</span>
            </div>
            <div className="timeline-item">
              <span className="time">0.01s</span>
              <span className="event">Server accepts connection</span>
              <span className="user-sees">"Connected! Welcome John"</span>
            </div>
            <div className="timeline-item">
              <span className="time">1.00s</span>
              <span className="event">John types "H"</span>
              <span className="user-sees">Shows: "H"</span>
            </div>
            <div className="timeline-item">
              <span className="time">1.01s</span>
              <span className="event">Server broadcasts typing</span>
              <span className="user-sees">Alice sees: "John typing..."</span>
            </div>
          </div>
        </section>

        {/* Error Scenarios */}
        <section className="step-section error-section">
          <h2>
            <span className="step-number">5</span>
            What Could Go Wrong?
          </h2>

          <div className="scenario-cards">
            <div className="scenario-card">
              <div className="card-header internet">📶 Internet Drops</div>
              <div className="card-body">
                <p>John typing... → WiFi disconnects</p>
                <p>→ Server notices: "John's connection lost"</p>
                <p>→ Others see: "John left"</p>
              </div>
            </div>

            <div className="scenario-card">
              <div className="card-header failed">❌ Message Fails</div>
              <div className="card-body">
                <p>John sends: "Hello" → Message stuck</p>
                <p>→ Shows: "⏳ Sending..."</p>
                <p>→ Retries → Still fails</p>
                <p>→ Shows: "❌ Tap to retry"</p>
              </div>
            </div>

            <div className="scenario-card">
              <div className="card-header server">🔄 Server Restart</div>
              <div className="card-body">
                <p>Server maintenance → All disconnected</p>
                <p>→ App shows: "Reconnecting..."</p>
                <p>→ Auto-reconnects → Chat resumes</p>
              </div>
            </div>
          </div>
        </section>

        {/* Complete Lifecycle */}
        <section className="step-section">
          <h2>
            <span className="step-number">6</span>
            The Complete Lifecycle
          </h2>

          <div className="lifecycle-flow">
            <div className="lifecycle-step">📱 OPEN APP</div>
            <div className="arrow-down">↓</div>
            <div className="lifecycle-step">🔌 CONNECTING</div>
            <div className="arrow-down">↓</div>
            <div className="lifecycle-step">✅ CONNECTED</div>
            <div className="arrow-down">↓</div>
            <div className="lifecycle-step">📥 LOAD HISTORY</div>
            <div className="arrow-down">↓</div>
            <div className="lifecycle-step">💬 READY TO CHAT</div>
            <div className="arrow-down">↓</div>
            <div className="lifecycle-step live">
              <span>⚡ LIVE CHAT</span>
              <div className="live-features">
                • Send/receive messages instantly<br/>
                • See typing indicators<br/>
                • Join/leave notifications<br/>
              </div>
            </div>
            <div className="arrow-down">↓</div>
            <div className="lifecycle-step">👋 CLOSE APP</div>
            <div className="arrow-down">↓</div>
            <div className="lifecycle-step">🔴 DISCONNECT</div>
          </div>
        </section>

        {/* Data Format Section */}
        <section className="step-section code-section">
          <h2>
            <span className="step-number">7</span>
            Behind the Scenes - The Data
          </h2>

          <div className="code-block">
            <pre>{`// What the SERVER sees when you send a message:
{
  "type": "message",
  "user": {
    "id": "user_123",
    "name": "John"
  },
  "content": "Hello everyone!",
  "timestamp": "2024-01-15T14:30:00Z",
  "room": "general"
}

// When someone is typing:
{
  "type": "typing",
  "user": "John",
  "isTyping": true
}`}</pre>
          </div>
        </section>

        {/* Summary Table */}
        <section className="step-section">
          <h2>
            <span className="step-number">8</span>
            Summary: What You're Building
          </h2>

          <table className="summary-table">
            <thead>
              <tr>
                <th>Input</th>
                <th>Process</th>
                <th>Output</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>[John types "Hi"]</td>
                <td>→ WebSocket sends</td>
                <td>[Alice sees "Hi"]</td>
              </tr>
              <tr>
                <td>[John stops typing]</td>
                <td>→ WebSocket sends</td>
                <td>[Typing disappears]</td>
              </tr>
              <tr>
                <td>[John leaves]</td>
                <td>→ Connection closes</td>
                <td>[Others see "John left"]</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Key Components */}
        <section className="step-section components-section">
          <h2>🔧 What You'll Build</h2>
          
          <div className="components-grid">
            <div className="component-card">
              <div className="component-icon">🔌</div>
              <h4>Connection Manager</h4>
              <p>Opens connection, keeps it alive, reconnects if drops</p>
            </div>
            
            <div className="component-card">
              <div className="component-icon">💬</div>
              <h4>Message Handler</h4>
              <p>Sends/receives messages, shows in UI</p>
            </div>
            
            <div className="component-card">
              <div className="component-icon">👥</div>
              <h4>User Presence</h4>
              <p>Who's online, who joined/left, who's typing</p>
            </div>
            
            <div className="component-card">
              <div className="component-icon">🚪</div>
              <h4>Room Manager</h4>
              <p>Join/leave rooms, switch between chats</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <h3>Ready to Build This?</h3>
          <p>In the next tutorial, we'll write the actual code for each component!</p>
          <button className="cta-button">Continue to Part 2: Coding the Chat →</button>
        </section>

      </article>
    </div>
  );
};

export default WebSocketTutorial;