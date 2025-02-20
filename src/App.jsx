import './App.css'
import {Routes,Route} from "react-router-dom";
import { useState } from 'react';
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import Signup from "./pages/Signup";

function App() {
  const [data,setData]=useState([{id:"1234",pw:"",name:"곽성은",num:"46기",team:"웹개발팀",phoneNum:"",address:"경기도 군포시 삼성로",email:""}]);
  
  const onUpdate=(input)=>{
    const updatedData= data.map((item)=>item.id===input.id ? input:item)
    setData(updatedData);
    console.log(data);
  }

  const onCreate=(input)=>{
    const newData={...input,phoneNum:"",address:"",email:""}
    setData([...data,newData])
    console.log(data);
  }

  const onDelete=(id)=>{
    const deletedData=data.filter((item)=>item.id!==id)
    setData(deletedData);
    console.log(data);
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/MainPage" element={<MainPage/>}/>
        <Route path="/MyPage" element={<MyPage data={data} onUpdate={onUpdate} onDelete={onDelete}/>}/>
        <Route path="/Signup" element={<Signup onCreate={onCreate}/>}/>
      </Routes>
    </>
  )
}

export default App
