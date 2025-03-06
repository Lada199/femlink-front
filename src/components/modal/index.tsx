import './style.css'
import { AnimatePresence, motion } from "framer-motion";
const modalVariants = {
    hidden: { opacity: 0, },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
};

type Props = {
    children: React.ReactElement[] | React.ReactElement | string;
}

export const Modal: React.FC<Props> = ({ children }) => {
    return (
        <motion.div
            className="modal__wrapper"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <div className="modal__content">
                {children}
            </div>
        </motion.div>
    )
}
