import './Signup.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";

const Signup=({onCreate})=>{
    const [inputData,setInputData]=useState({id:"",pw:"",name:"",num:"",team:""});
    const nav=useNavigate();

    return (
        <div className="Signup">
            <div className='id'>
                <h3>ID</h3>
                <input placeholder="id를 입력해주세요" value={inputData.id} onChange={(e)=>{setInputData({...inputData,id:e.target.value})}
                    }/>
            </div>
            <div className='pw'>
                <h3>PW</h3>
                <input placeholder="pw를 입력해주세요"  value={inputData.pw} onChange={(e)=>setInputData({...inputData,pw:e.target.value})}/>
            </div>
            <div>
                <h3>이름</h3>
                <input placeholder="이름을 입력해주세요"  value={inputData.name} onChange={(e)=>setInputData({...inputData,name:e.target.value})}/>
            </div>
            <div>
                <h3>기수</h3>
                <input placeholder="기수를 입력해주세요"  value={inputData.num} onChange={(e)=>setInputData({...inputData,num:e.target.value})}/>
            </div>
            <div>
                <h3>팀명</h3>
                <input placeholder="소속된 팀을 입력해주세요"  value={inputData.team} onChange={(e)=>setInputData({...inputData,team:e.target.value})}/>
            </div>
            <button onClick={()=>{onCreate(inputData);
                nav("/")}}>이화이언 운영진으로 가입하기</button>
        </div>
    )
}

Signup.propTypes={
    onCreate:PropTypes.func.isRequired,
};

export default Signup;