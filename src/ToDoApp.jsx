import React, { useEffect, useState } from 'react'
import axios from 'axios';
//import { button } from 'react-validation';
import "./ToDoApp.css";

const ToDoApp = () => {
    const [activity, setActivity] = useState('');
    const [listData, setListData] = useState([]);
    const [userData, setUserData] = useState([]);

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
    
    const addActivity = () => {
        //setListData([...listData, activity])          //asynchronously working state
        setListData((listData) => {
            const updatedList = [...listData, activity]     //synchronously working state
            //console.log(updatedList);
            setActivity('')            //list become empty again
            return updatedList
        });
    };

    function removeActivity(i) {
        const updatedListNew = listData.filter((elem, id) => {
            return i !== id;
        })
        setListData(updatedListNew)
        console.log(updatedListNew)
        //setActivity('')
        //return updatedListNew
    }

    const otherRemoveActivity = ((rm) => {
        const updatedListNew = userData.filter((elem, id) => {
            return rm !== id;
        })
        setUserData(updatedListNew)
    })

    function removeAll() {
        setUserData([])
        setListData([])
    }

    const handleSearching = ((event) => {
        const filterData = userData.filter((e) => e.name.toLowerCase().includes(event.target.value))
        setUserData(filterData);
    })

    return (
        <>
            <h1 className='header'>ToDo List</h1>
            <div className='container'>
                <input type='text' className="inputxt" placeholder='add activity' value={activity} onChange={(event) => setActivity(event.target.value)} required />
                <button onClick={addActivity}>Add</button>
                <input type='text' className='search' placeholder='search here...' onChange={handleSearching} />
                <div className='list-heading'><p><u>This is your list</u></p></div>
                <div className='list-items'>
                    {userData.sort((a,b)=>(a.name-b.name)).map((data, rm) => {
                        return (
                            <>
                                <div key={data.id} className='listData'><p>{data.name}</p></div>
                                <div className="btn-position">
                                    <button onClick={() => otherRemoveActivity(rm)}>remove task</button>
                                </div>
                            </>
                        )
                    })}
                    {listData.length !== 0 && listData.map((data, i) => {
                        return <>
                            <p key={i}>
                                <div className="listData">{data}</div>
                                <div className="btn-position">
                                    <button onClick={() => removeActivity(i)}>remove task</button>
                                </div>
                            </p>
                        </>
                    })}
                </div>
                {userData.length >1 && listData.length >= 1 &&
                    <button onClick={removeAll}>Remove All</button>
                }
            </div>
        </>
    )
}

export default ToDoApp