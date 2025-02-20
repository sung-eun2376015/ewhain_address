import PropTypes from "prop-types";
import {useState} from 'react';
import "./MyPage.css"
import { useNavigate } from "react-router-dom";

const MyPage=({data,onUpdate,onDelete})=>{
    const myid="1234"
    const mydata=data.find((item)=>item.id===myid)
    const [myinput,setmyInput]=useState(mydata)
    const nav=useNavigate();

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
                <input placeholder="000-0000-0000으로 써주세요"value={myinput.phoneNum} onChange={(e)=>setmyInput({...myinput,phoneNum:e.target.value})}/>
            </div>
            <div className="address">
                <label>주소</label>
                <input value={myinput.address} onChange={(e)=>setmyInput({...myinput,address:e.target.value})}/>
            </div>
            <div>
                <label>이메일</label>
                <input value={myinput.email} onChange={(e)=>setmyInput({...myinput,email:e.target.value})}/>
            </div>
            <button onClick={()=>{onUpdate(myinput); nav("/MainPage")}}>수정완료</button>
            <button onClick={()=>{
                onDelete(myid);
                nav("/MainPage");
            }}>회원탈퇴</button>
        </div>
    )
}

MyPage.propTypes = {
    data: PropTypes.array.isRequired, 
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default MyPage;