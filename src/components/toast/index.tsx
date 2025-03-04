import ReactDOM from "react-dom";
import './style.css'

type Props = {
  children: React.ReactElement[] | React.ReactElement | string;
  successMessage: boolean;
}

export const Toast: React.FC<Props> = ({ children, successMessage }) => {
  return ReactDOM.createPortal(
    <div className={`toast__wrapper ${successMessage ? "show" : "hide"}`}>
      {children}
    </div>,
      document.getElementById("modal-root") as HTMLElement
  )
}
