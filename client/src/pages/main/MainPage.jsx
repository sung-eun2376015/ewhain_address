import Info from '../../component/Info.jsx';
import "./Mainpage.css"
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const MainPage = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/info/all', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // 기수순으로 정렬
  const sortedData = data.sort((a, b) => Number(a.num) - Number(b.num));

  return (
    <>
      <div className="Mainpage">
        <div className="Mainpage-head">
          <h1>이화이언 주소록</h1>
          <button onClick={() => nav("/MyPage")}>MyPage</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>기수</th>
              <th>팀</th>
              <th>이름</th>
              <th>연락처</th>
              <th>이메일</th>
              <th>주소</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item) => (
              <Info key={item.id} {...item} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default MainPage;
