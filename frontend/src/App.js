import logo from './logo.svg';

import "primereact/resources/themes/lara-light-indigo/theme.css";
        
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home/Home';
import View from "./Components/Home/Viewusers";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/users" element={<View />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
