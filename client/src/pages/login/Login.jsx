import './login.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [loginData, setLoginData] = useState({ id: "", pw: "" });
  const nav = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', loginData);
      const data = response.data;
      if (data.token) {
        localStorage.setItem('token', data.token);
        nav("/MainPage");
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className='Login'>
      <h1>이화이언 운영진<br/> 주소록 사이트</h1>
      <div className='loginForm'>
        <input placeholder='id를 입력해주세요' value={loginData.id} onChange={(e) => setLoginData({ ...loginData, id: e.target.value })} />
        <input placeholder='pw를 입력해주세요' type="password" value={loginData.pw} onChange={(e) => setLoginData({ ...loginData, pw: e.target.value })} />
      </div>
      <div className='buttons'>
        <button onClick={handleLogin}>LOGIN</button>
        <button onClick={() => nav("/signup")}>회원가입</button>
      </div>
    </div>
  )
}

export default Login;
