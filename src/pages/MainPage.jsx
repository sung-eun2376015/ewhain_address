import Info from "../component/Info"
import "./Mainpage.css"
import { useNavigate } from "react-router-dom"

const MainPage = ({ data }) => {
    const nav = useNavigate()

    //기수순으로 뜨도록
    const getsortedData = () => {
        return (
            data.toSorted((a, b) => {
                return Number(a.num) - Number(b.num);
            })
        )
    };
    const sortedData = getsortedData();

    return (
        <>
            <div className="Mainpage">
                <div className="Mainpage-head">
                    <h1>이화이언 주소록</h1>
                    <button onClick={()=>nav("/MyPage")}>MyPage</button>
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