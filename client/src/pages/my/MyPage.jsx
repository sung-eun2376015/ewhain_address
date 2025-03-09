import PropTypes from "prop-types";
import { useState, useEffect } from 'react';
import "./MyPage.css"
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'; // 중괄호로 감싸서 import
import axios from 'axios';

const MyPage = () => {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token); // jwtDecode 사용
  const myid = decodedToken.id;
  const [myinput, setMyInput] = useState({ name: "", num: "", team: "", phoneNum: "", address: "", email: "" });
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/info/all', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = response.data;
        const mydata = data.find((item) => item.id === myid);
        setMyInput(mydata || { name: "", num: "", team: "", phoneNum: "", address: "", email: "" });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await axios.put('http://localhost:5000/api/info/update', myinput, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = response.data;
      if (data.message === '정보가 성공적으로 수정되었습니다.') {
        nav("/MainPage");
      } else {
        alert('Error updating user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        'http://localhost:5000/api/auth/delete-account', 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      
      if (response.data.message === '계정이 성공적으로 삭제되었습니다.') {
        localStorage.removeItem('token');
        nav("/");
      } else {
        alert('계정 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('계정 삭제 오류:', error);
      alert('계정 삭제 중 오류가 발생했습니다.');
    }
  };
  
  

  return (
    <div className="MyPage">
      <h1>My Page</h1>
      <div>
        <label>이름</label>
        <label>{myinput.name}</label>
      </div>
      <div>
        <label>기수</label>
        <label>{myinput.num}</label>
      </div>
      <div>
        <label>팀명</label>
        <label>{myinput.team}</label>
      </div>
      <div>
        <label>연락처</label>
        <input placeholder="000-0000-0000으로 써주세요" value={myinput.phoneNum || ''} onChange={(e) => setMyInput({ ...myinput, phoneNum: e.target.value })} />
      </div>
      <div className="address">
        <label>주소</label>
        <input value={myinput.address || ''} onChange={(e) => setMyInput({ ...myinput, address: e.target.value })} />
      </div>
      <div>
        <label>이메일</label>
        <input value={myinput.email || ''} onChange={(e) => setMyInput({ ...myinput, email: e.target.value })} />
      </div>
      <button onClick={handleUpdate}>수정완료</button>
      <button onClick={handleDelete}>회원탈퇴</button>
    </div>
  )
}

MyPage.propTypes = {
  // data: PropTypes.array.isRequired, 
  // onUpdate: PropTypes.func.isRequired,
  // onDelete: PropTypes.func.isRequired
};

export default MyPage;
