import './Signup.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [inputData, setInputData] = useState({ id: "", pw: "", name: "", num: "", team: "", phoneNum: "", address: "", email: "" });
  const nav = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', inputData);
      const data = response.data;
      if (data.message === '회원가입이 완료되었습니다.') {
        nav("/");
      } else {
        alert('Error creating user');
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="Signup">
      <div className='id'>
        <h3>ID</h3>
        <input placeholder="id를 입력해주세요" value={inputData.id} onChange={(e) => setInputData({ ...inputData, id: e.target.value })} />
      </div>
      <div className='pw'>
        <h3>PW</h3>
        <input placeholder="pw를 입력해주세요" type="password" value={inputData.pw} onChange={(e) => setInputData({ ...inputData, pw: e.target.value })} />
      </div>
      <div>
        <h3>이름</h3>
        <input placeholder="이름을 입력해주세요" value={inputData.name} onChange={(e) => setInputData({ ...inputData, name: e.target.value })} />
      </div>
      <div>
        <h3>기수</h3>
        <input placeholder="기수를 입력해주세요" value={inputData.num} onChange={(e) => setInputData({ ...inputData, num: e.target.value })} />
      </div>
      <div>
        <h3>팀명</h3>
        <input placeholder="소속된 팀을 입력해주세요" value={inputData.team} onChange={(e) => setInputData({ ...inputData, team: e.target.value })} />
      </div>
      <div>
        <h3>연락처</h3>
        <input placeholder="000-0000-0000으로 써주세요" value={inputData.phoneNum} onChange={(e) => setInputData({ ...inputData, phoneNum: e.target.value })} />
      </div>
      <div className="address">
        <h3>주소</h3>
        <input value={inputData.address} onChange={(e) => setInputData({ ...inputData, address: e.target.value })} />
      </div>
      <div>
        <h3>이메일</h3>
        <input value={inputData.email} onChange={(e) => setInputData({ ...inputData, email: e.target.value })} />
      </div>
      <button onClick={handleSignup}>이화이언 운영진으로 가입하기</button>
    </div>
  )
}

export default Signup;
