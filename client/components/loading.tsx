import {Styles} from 'react-modal';
import ReactModal from "react-modal";
import {CircularProgress} from '@mui/material';

// Fix for TypeScript error: 'Modal' cannot be used as a JSX component
const Modal = ReactModal as any;

const Loading = () => {
    const customStyles: Styles = {
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            zIndex: 26,
        },
        content: {
            top: "50%",
            left: "50%",
            borderStyle: "hidden",
            backgroundColor: "rgba(0, 0, 0, 0)",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        },
    };
    return <Modal
        isOpen={true}
        style={customStyles}
        ariaHideApp={true}
    >
        <CircularProgress size="5rem" />
    </Modal>
}

export default Loading;