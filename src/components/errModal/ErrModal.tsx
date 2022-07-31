import React from "react";
import {Modal} from "../modal/Modal";
import Button from 'react-bootstrap/Button';
import "./style.scss";

interface Props {
    text: string;
    showModal: boolean;
    closeModal: () => void;
}

export const ErrModal: React.FC<Props> = ({showModal, closeModal, text}) => (
    <Modal isOpen={showModal}>
        <div className="errModal">
            <div className="errModal__textContainer">
                <h2 className="errModal__title">Error !</h2>
                <p className="errModal__text">{text}</p>
            </div>
            <Button variant="danger" onClick={closeModal}>Close</Button>
        </div>
    </Modal>
);
