import React, { useState, useEffect } from 'react';
import axios from "axios"
import { Dialog } from 'primereact/dialog';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from "primereact/button";
import { Link } from 'react-router-dom';

const View = () => {
    const [users, setUsers] = useState([])
    const [visible, setVisible] = useState(false)
    const [deleteVisible, setDeleteVisible] = useState(false)
    const [deleter, setDeleter] = useState(false)
    const [loading, setLoading] = useState(false)
    const [credentials, setCredentials] = useState({
        id: null,
        firstname: "",
        lastname: '',
        age: "",
        town: "",
        gender: "Male"
    })

    const [id, setId] = useState(null)
 
    const handleFirstName = event => setCredentials({ ...credentials, firstname:event.target.value });
    const handleLastName = event => setCredentials({ ...credentials, lastname:event.target.value });
    const handleAge= event => setCredentials({ ...credentials, age:event.target.value });
    const handleTown = event => setCredentials({ ...credentials, town:event.target.value });
    const handleGender = event => setCredentials({ ...credentials, gender:event.target.value });


    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            try {
                let users = null;
                let response = await axios.get(process.env.REACT_APP_API_URL + "/api/v1/accounts/", {
                            headers: {
                                "Content-Type": "application/json"
                            }
                })
    
                if (response.data) {
                    users=response.data;
                    setLoading(false)
                }
                console.log(users)
                setUsers(users)
                return users;
            } catch(error){
                setLoading(false)
                return error.response;
            }
        }
        
        fetchData()
    },[])

    const handleUpdate = (e) => {
        e.preventDefault()
        toast.promise(axios.put(process.env.REACT_APP_API_URL + `/api/v1/accounts/${credentials.id}/`, credentials, {
            headers: {
                "Content-Type": "application/json"
            }
        }),
         {
            loading: "Updating user",
            success: (resp) => {
                let idx = users.findIndex(item=> resp.data.id === item.id);
                users.splice(idx, 1, resp.data)
                setVisible(false)
                return "Users updated successfully"
            },
            error: (error)=> {
                console.log(error)
                return "There was an error updating the user"
            }
         }
        )
    }

    const openModal = (item) => {
        setCredentials({
            id: item.id,
            firstname: item.firstname,
            lastname: item.lastname,
            age: item.age,
            town: item.town,
            gender: item.gender
        })
        setVisible(true)
    }

    const handleDelete = (item) => {
        console.log(item)
        setId(item)
        setDeleteVisible(true)
        
    }

    const deleteUser = () => {
        setDeleter(true)
        toast.promise(axios.delete(process.env.REACT_APP_API_URL + `/api/v1/accounts/${id}/`, {
            headers: {
                "Content-Type": "application/json"
            }
        }),
        
        {
            loading: "Deleting user",
            success: (resp) => {
                let idx = users.findIndex(item=> id == item.id)
                users.splice(idx, 1)
                setDeleter(false)
                setId(null)
                setDeleteVisible(false)
                
            },
            error: (error)=> {
                setId(null)
                setDeleter(false)
                setDeleteVisible(false)
                console.log(error);
            }
        })
        
    }

    return (
        <div>
            <Toaster />
            <Dialog header="Header" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <form onSubmit={e=> handleUpdate(e)}>
                <div>
                    <p>Update</p>
                    <div>
                        <label>Enter your firstname*</label>
                        <input  onChange={handleFirstName} required type="text" value={credentials.firstname} placeholder="Enter your firstname" />
                    </div>
                    <div>
                        <label>Enter your lastname*</label>
                        <input  onChange={handleLastName} required type="text" value={credentials.lastname} placeholder="Enter your lastname" />
                    </div>
                    <div>
                        <label>Enter your age*</label>
                        <input  onChange={handleAge} required type="number" value={credentials.age} placeholder="Enter your age" />
                    </div>
                </div>
            <div>
                <div>
                    <label>Enter your town*</label>
                    <input onChange={handleTown} required type="text" value={credentials.town} placeholder="Enter your town" />
                </div>
                <div>
                    <label>Select*</label>
                    <select required onSelect={handleGender} onChange={handleGender}  value={credentials.gender}>
                        <option value={"Male"}>Male</option>
                        <option value={"Female"}>Female</option>
                        <option value={"Other"}>Other</option>
                    </select>
                </div>
            </div>
            <button>update</button>
            </form>
            </Dialog>
            <Dialog header="Confirm" visible={deleteVisible} style={{ width: '50vw' }} onHide={() => setDeleteVisible(false)}>
            
                <h1>Are you sure you want to delete?</h1>
                <div> <Button severity="danger"  onClick={deleteUser} label='Yes'loading={deleter} />{" "} <Button onClick={(e)=> setDeleteVisible(false)} severity="success" label='No' loading={deleter} /> </div>
            </Dialog>
            <p><Link to="/">Go back home</Link></p>
            <p>Here is a list of users</p>
            <ul>
            {users.length ? users.map(item=>{
                return (
                    <li key={item.id}>{item.firstname} {item.lastname} <button onClick={()=>openModal(item)}>update</button> <button onClick={()=>handleDelete(item.id)}>delete</button></li>
                )
            }): <p>{loading ? "Loading" : "There is no user data available"}</p>}
            </ul>
        </div>
    )
}

export default View;