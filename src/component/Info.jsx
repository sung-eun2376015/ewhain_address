const Info = ({ id,pw,name,num,team,phoneNum,address,email }) => {

    return (
        <>
            <tr className="Info">
                <th>{num}</th>
                <th>{team}</th>
                <th>{name}</th>
                <th>{phoneNum}</th>
                <th>{email}</th>
                <th>{address}</th>
            </tr>
        </>
    )
}
export default Info