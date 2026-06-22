import React, { useEffect } from 'react'
import { Form } from './Form'
import { AccessibleModal } from './Modal'

const children = <div style={{ background: 'white', padding: 20, borderRadius: 8 }}>
    <h2>Accessible Modal</h2>
    <p>This is an accessible modal dialog. It traps focus and can be closed with the Escape key.</p>
</div>

export const Accessible = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const toggleModal = (open: boolean) => {
        setIsOpen(open)
    };
    useEffect(() => {
        if (!isOpen) {
            buttonRef.current?.focus();
        }
    }, [isOpen])
    
    return (
        <div>
            <h2>Accessibility practice</h2>
            <Form />
            <button onClick={() => toggleModal(true)} ref={buttonRef}>Open accessible modal</button>
            <AccessibleModal isOpen={isOpen} onClose={() => toggleModal(false)} children={children} />
        </div>
    )
}
