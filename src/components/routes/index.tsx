import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Editor from "../../pages/Editor";
import Outliner from "../../pages/Outliner";

const index = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/editor" element={<Editor/>} />
                    <Route path="/outliner" element={<Outliner/>} />
                </Routes>
            </Router>
        </div>
    )
}

export default index;