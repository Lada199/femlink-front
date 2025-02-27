import React from 'react'
import ReactDOM from "react-dom";
import { Modal } from '../modal'
import { CloseIcon } from '../close-icon'
import { Button } from '../button'
type Props = {
    isOpen: boolean;
    onClose: () => void;
    handleDelete: () => void;
}

export const ConfirmModal: React.FC<Props> = ({
    isOpen,
    onClose,
    handleDelete
}) => {
    if (!isOpen) return null;
    return ReactDOM.createPortal(
        <Modal>
            <div className="modal__header">
                <div className="form__title">Do you really want to delete this event?</div>
                <div className="modal__close" onClick={onClose}>
                    <CloseIcon />
                </div>
            </div>
            <div className="modal__footer">
                <div className="btns__wrapper">
                    <Button className='btn-link' onClick={handleDelete} >
                        Delete
                    </Button>
                    <Button className='btn-link' onClick={onClose} >
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>,
        document.getElementById("modal-root") as HTMLElement
    )
}
