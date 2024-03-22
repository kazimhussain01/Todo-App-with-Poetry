import React from 'react'

// InterFace for ModelProps
interface ModalProps {
    modalOpen: boolean;
    setModalOpen: (open: boolean) => boolean | void;
    children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
    return (
        // Pop-up Model
        <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
            <div className='modal-box relative'>
                {/* Adding Cross Button Label */}
                <label
                    className='bg-violet-600 hover:bg-violet-500 flex items-center justify-center cursor-pointer text-lg text-white font-poppins btn-sm btn-circle absolute right-2 top-2'
                    onClick={() => setModalOpen(false)}
                >
                    x
                </label>
                {children}
            </div>
        </div>
    )
}

export default Modal