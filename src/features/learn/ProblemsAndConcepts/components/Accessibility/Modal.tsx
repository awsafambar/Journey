import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

export const AccessibleModal = ({
    isOpen,
    onClose,
    children,
}: {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const CancelButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const root = document.getElementById('root');
        if (isOpen && modalRef.current) {
            closeButtonRef?.current?.focus();
        }
        if (root) {
            if (isOpen) {
                root.setAttribute('aria-hidden', 'true');
            } else {
                root.removeAttribute('aria-hidden');
            }
        }
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            if (root) {
                root.removeAttribute('aria-hidden');
            }
        };
    }, [isOpen, onClose]);
    const onKeyPress = (e: React.KeyboardEvent) => {
        console.log(e.key);
        if (!isOpen) return;

        const isEsc = e.key === 'Escape';
        if (isEsc) {
            onClose();
        }
        const isTab = e.key === 'Tab';
        const isShiftKey = e.shiftKey

        const firstElement = closeButtonRef.current;
        const lastElement = CancelButtonRef.current;

        if (isTab) {
            if (e.target === lastElement && !isShiftKey) {
                e.preventDefault();
                firstElement?.focus();
            }
            if (e.target === firstElement && isShiftKey) {
                e.preventDefault();
                lastElement?.focus();
            }

        }

    }

    if (!isOpen) return null;

    const modalContent = (
        <div
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            ref={modalRef}
            onKeyDown={onKeyPress}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
            }}
        >
            <div
                style={{
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '8px',
                    minWidth: '300px',
                    position: 'relative',
                }}
            >
                <button
                    onClick={onClose}
                    aria-label="Close modal"
                    style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        background: 'transparent',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                    }}
                    ref={closeButtonRef}
                >
                    &times;
                </button>
                <div>{children}</div>
                <button style={{ border: "1px solid black", background: "blue", color: "white", padding: "8px 14px", marginRight: "8px" }}>Save changes</button>
                <button style={{ border: "1px solid black", background: "red", color: "white", padding: "8px 14px" }} ref={CancelButtonRef}>Cancel</button>
            </div>
        </div>
    );

    return ReactDOM.createPortal(
        modalContent,
        document.body
    );
};
