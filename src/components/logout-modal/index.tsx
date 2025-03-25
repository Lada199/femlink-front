import ReactDOM from "react-dom";
import { Button } from "../button";
import { CloseIcon } from "../close-icon";
import { Modal } from "../modal";
import './style.css'
import { Title } from "../title";

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
  return ReactDOM.createPortal(
    <Modal>
      <div className="modal__header">
        <Title>Do you really want to exit?</Title>
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
    </Modal>,
     document.getElementById("modal-root") as HTMLElement
  )
}
