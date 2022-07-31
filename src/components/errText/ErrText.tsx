import React from "react";
import "./style.scss";

interface Props{
    text: string;
}

export const ErrText:React.FC<Props> = ({text}) => (<p className="errText">{text}</p>)
