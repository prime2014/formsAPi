import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";



const Home = props => {
    const [credentials, setCredentials] = useState({
        firstname: "",
        lastname: '',
        age: "",
        town: "",
        gender: "Male"
    })

    const navigate = useNavigate()

    const handleFirstName = event => setCredentials({ ...credentials, firstname:event.target.value });
    const handleLastName = event => setCredentials({ ...credentials, lastname:event.target.value });
    const handleAge= event => setCredentials({ ...credentials, age:event.target.value });
    const handleTown = event => setCredentials({ ...credentials, town:event.target.value });
    const handleGender = event => setCredentials({ ...credentials, gender:event.target.value });

    const handleSubmit = () => {
        toast.promise (axios.post(process.env.REACT_APP_API_URL + '/api/v1/accounts/', credentials, {
            headers: {
                "Content-Type": "application/json"
            }
        }), {
            loading: "Creating user...",
            success: ()=>{
                navigate("/users")
            },
            error: (error) => {
                
                return error.response.data.lastname[0];
            }
        })
        
    }
    return (
        <React.Fragment>
            <Toaster />
            <div>Welcome to MY APP</div>
            <p>To view users, click the following link <Link to="/users">users</Link> </p>
        <form onSubmit={(e => e.preventDefault())}>
            <div>
                <div>
                    <label>Enter your firstname*</label>
                    <input onChange={handleFirstName} required type="text" value={credentials.firstname} placeholder="Enter your firstname" />
                </div>
                <div>
                    <label>Enter your lastname*</label>
                    <input onChange={handleLastName} required type="text" value={credentials.lastname} placeholder="Enter your lastname" />
                </div>
                <div>
                    <label>Enter your age*</label>
                    <input onChange={handleAge} required type="number" value={credentials.age} placeholder="Enter your age" />
                </div>
            </div>
            <div>
                <div>
                    <label>Enter your town*</label>
                    <input onChange={handleTown} required type="text" value={credentials.town} placeholder="Enter your town" />
                </div>
                <div>
                    <label>Select*</label>
                    <select onSelect={handleGender} onChange={handleGender} required value={credentials.gender}>
                        <option value={"Male"}>Male</option>
                        <option value={"Female"}>Female</option>
                        <option value={"Other"}>Other</option>
                    </select>
                </div>
            </div>
            <button onClick={handleSubmit}>submit</button>
            
        </form>
        </React.Fragment>
    )
}


export default Home;