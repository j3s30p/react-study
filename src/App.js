import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "./routes/Detail";
import Home from "./routes/Home";

function App() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<Detail />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
