import React from 'react';
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import {ParserView} from "../view/parserView/ParserView";

export const Navigation = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<ParserView/>}/>
        </Routes>
    </BrowserRouter>
);
