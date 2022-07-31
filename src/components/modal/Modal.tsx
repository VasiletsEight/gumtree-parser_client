import React from "react";
import ReactDOM from "react-dom";
import "./style.scss";

interface Props {
    isOpen: boolean;
    children: JSX.Element;
}

const modalRoot = document.getElementById('modal-root');

const ModalContent = ({children}: Pick<Props, "children">) => (
    <div className="modalWrapper">
        <div className="modalWrapper__background"/>
        <div className="modalWrapper__content">
            {children}
        </div>
    </div>
);

export const Modal = ({isOpen, children}: Props) => {
    const element = React.useRef(document.createElement("div"));

    return ReactDOM.createPortal(isOpen ? <ModalContent children={children}/> : <></>, modalRoot || element.current);
};