import React from "react";
import "./style.scss";
import {Modal} from "../modal/Modal";
import {Spinner} from "react-bootstrap";

interface Props {
    showSpinner: boolean;
}

export const Loader: React.FC<Props> = ({showSpinner}) => (
    <Modal isOpen={showSpinner}>
        <div className="spinnerWrapper">
            <Spinner animation="border" variant="primary" className="spinnerWrapper__spinner"/>
            <p className="spinnerWrapper__text">Loading</p>
        </div>
    </Modal>
);
