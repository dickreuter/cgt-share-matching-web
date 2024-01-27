
import { Route, Routes } from "react-router-dom"
import Main from "../views/Main"


function Routing() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Main />} />
            </Routes>
        </div>
    )
}

export default Routing