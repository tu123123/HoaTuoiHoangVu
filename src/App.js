import logo from './logo.svg';
import './App.css';
import Setting from './page/Setting';
import Main from './page';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (

    <BrowserRouter basename = "/" >
    <Routes>
      <Route path="/" exact element={<Main />}>
      </Route>
      <Route path="/setting" exact element={<Setting />}>
      </Route>
    </Routes>
  </BrowserRouter>
  
  );
}

export default App;
