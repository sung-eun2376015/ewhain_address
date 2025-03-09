import './App.css'
import { Routes, Route } from "react-router-dom";
import Login from './pages/login/Login.jsx';
import MyPage from './pages/my/MyPage.jsx';
import Mainpage from './pages/main/MainPage.jsx';
import Signup from './pages/signup/Signup.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/MainPage" element={<Mainpage />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App;
