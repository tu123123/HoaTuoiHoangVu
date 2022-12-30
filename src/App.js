import logo from './logo.svg';
import './App.css';
import Setting from './page/Setting';
import Main from './page';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />}>
      </Route>
      <Route path="/setting" element={<Setting />}>
      </Route>
    </Routes>
  </BrowserRouter>
  
  );
}

export default App;
