import { Button } from "../button";

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
    <div className="modal__wrapper" >

        <div className="modal__content">
        <Button onClick={onClose} >
              Cancel
            </Button>
            <Button onClick={handleLogout} >
              Log out
            </Button>

        </div>
    </div>
  )
}
