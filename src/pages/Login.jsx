import './login.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login=()=>{
    const [loginData,setLoginData]=useState({id:"",pw:""});
    const nav=useNavigate();

    return (
        <div className='Login'>
            <h1>이화이언 운영진<br/> 주소록 사이트</h1>
            <div className='loginForm'>
                <input placeholder='id를 입력해주세요'value={loginData.id} onChange={(e)=>setLoginData({...loginData,id:e.target.value})}/>
                <input placeholder='pw를 입력해주세요' value={loginData.pw} onChange={(e)=>setLoginData({...loginData,pw:e.target.value})}/>
            </div>
            <div className='buttons'>
                <button>LOGIN</button>
                <button onClick={()=>nav("/signup")}>회원가입</button>
            </div>
        </div>
    )
}

export default Login;