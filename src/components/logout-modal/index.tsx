import { Button } from "../button";
import { CloseIcon } from "../close-icon";
import { Modal } from "../modal";
import './style.css'

type Props = {
  isOpen: boolean;
  onClose: () => void;
  handleLogout: () => void;
}

export const LogOutModal: React.FC<Props> = ({
  isOpen,
  onClose,
  handleLogout
}) => {
  if (!isOpen) return null;
  return (
    <Modal>
      <div className="modal__header">
        <div className="form__title">Do you really want to exit?</div>
        <div className="modal__close" onClick={onClose}>
          <CloseIcon />
        </div>
      </div>
      <div className="modal__footer">
        <div className="btns__wrapper">
          <Button className='btn-link' onClick={handleLogout} >
            Log out
          </Button>
          <Button className='btn-link' onClick={onClose} >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  )
}
