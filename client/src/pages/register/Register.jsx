import { Link } from 'react-router-dom';
import './register.scss'
import axios from 'axios';
import { useState } from 'react';
const Register = () => {

    const [inputs, setInputs]=useState({
        username:"",
        email:"",
        password:"",
        name:""
    })    
    const [err, setErr]=useState(null);

    const handleChange=(e)=>{
        setInputs((prev)=>({...prev,[e.target.name]:e.target.value}));
    }

    console.log(inputs);
    

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            await axios.post("https://unsocial.onrender.com/api/auth/register", inputs);
        } catch (error) {
            console.log(error);
            setErr(error.response.data);
        }
    }
    return (
        <div className='register'>
            <div className='card'>
                <div className='left'>
                    <h1>Social Media</h1>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam placeat totam vero, aliquid, qui distinctio optio omnis asperiores id magnam neque nesciunt itaque. Praesentium voluptatibus cupiditate inventore explicabo voluptatum quaerat!
                    </p>
                    <span>Do you have an account?</span>
                    <Link to="/login"><button>Login</button></Link>
                </div>
                <div className='right'>
                    <h1>Register</h1>
                    <form>
                        <input type="text" placeholder='Username' name="username" onChange={handleChange}/>
                        <input type="email" placeholder='Email' name="email" onChange={handleChange}/>
                        <input type="password" placeholder='Password' name="password" onChange={handleChange}/>
                        <input type="text" placeholder='Name' name="name" onChange={handleChange}/>
                        {err&&err}
                        <button onClick={handleSubmit}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;
