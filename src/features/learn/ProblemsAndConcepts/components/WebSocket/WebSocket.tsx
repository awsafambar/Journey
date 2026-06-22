import WebSocketBasic from './WebSocketBasic'
import WebSocketStates from './WebSocketStates'
import WebSocketTutorial from './WebSocketTutorial'

const WebSocket = () => {
  return (
        <>
            <div><WebSocketTutorial /></div>
            <div><WebSocketBasic /></div>
            <div><WebSocketStates /></div>
        </>
    )
}

export default WebSocket