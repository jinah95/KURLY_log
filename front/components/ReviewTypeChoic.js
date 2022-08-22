import React from "react";
import ReviewTypeChoic from "./ReviewTypeChoic";
import Modal from "@mui/material/Modal";

const ReviewTypeChoic = ({ open, handleClose }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <ReviewTypeChoic handleClose={handleClose} />
        </Modal>
    );
};

export default LoginOrRegisterModal;
