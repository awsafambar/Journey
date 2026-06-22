import { useState } from 'react'
import { Axios } from './components/Axios/Axios'
import ListLoader from './components/InfiniteScrolling/ListLoader'
import { ProgressBar } from './components/ProgressBar/ProgressBar'
import { SSL } from './components/SSL/SSL'
import { TodoList } from './components/TodoList/TodoList'
import { VirtualizedContainer } from './components/VirtualizedList/VirtualizedContainer'
import { WebRtc } from './components/WEBRTC/WebRtc'
// Update the import path to match the actual file name and extension
import WebSocket from './components/WebSocket/WebSocket'
import { Accessible } from './components/Accessibility/Accessible'

const componentsConfig = [
    { name: 'SSL', component: <SSL /> },
    { name: 'WebRTC', component: <WebRtc /> },
    { name: 'ProgressBar', component: <ProgressBar mainColor={''} progressBarColor={''} /> },
    { name: 'ListLoader', component: <ListLoader /> },
    { name: 'VirtualizedContainer', component: <VirtualizedContainer /> },
    { name: 'TodoList', component: <TodoList /> },
    { name: 'Axios', component: <Axios /> },
    { name: 'WebSocket', component: <WebSocket /> },
    {name: 'Accessibility', component: <Accessible />}
]

export const Problems = () => {
    const [selected, setSelected] = useState<number | null>(null)

    return (
        <>
            <div style={{ display: 'flex', flexDirection:"column",marginBottom: 16 }}>
                {componentsConfig.map((item, idx) => (
                    <button
                        key={item.name}
                        onClick={() => setSelected(idx)}
                        style={{
                            marginRight: 8,
                            textDecoration: selected === idx ? 'underline' : 'none',
                        }}
                    >
                        {item.name}
                    </button>
                ))}
            </div>
            {selected !== null ? componentsConfig[selected].component : null}
        </>
    )
}