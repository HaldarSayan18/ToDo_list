import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Axiom = () => {
    //const [Data, setData] = useState([])
    const [userData, setUserData] =useState([])
    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then((response) => {
                console.log(response.data)
                //console.log(response.data.name)
                setUserData(response.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    const handleSearch = ((event) => {
        const filterData = userData.filter((e) => e.name.toLowerCase().includes(event.target.value))
        setUserData(filterData);
        //console.log(e);
    })


    return (
        <center>
        <input type='text' placeholder='search here' onChange={handleSearch}/>
            <p><u>This is your list</u></p>
            {userData.map((data) => {
                return (
                    <div key={data.id} className='okay'>{data.name}</div>
                )
            })}
        </center>
    )
}

export default Axiom
