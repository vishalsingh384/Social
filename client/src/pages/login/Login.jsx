import { Link, useNavigate } from 'react-router-dom'
import './login.scss'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/authContext'

const Login = () => {
    
    const navigate=useNavigate();

    const { login } = useContext(AuthContext);

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    })
    const [err, setErr] = useState(null);

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(inputs);
            navigate("/");
        } catch (error) {
            setErr(error.response.data);
        }
    }

    return (
        <div className='login'>
            <div className='card'>
                <div className='left'>
                    <h1>Welcome Again.</h1>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam placeat totam vero, aliquid, qui distinctio optio omnis asperiores id magnam neque nesciunt itaque. Praesentium voluptatibus cupiditate inventore explicabo voluptatum quaerat!
                    </p>
                    <span>Don't have an account?</span>
                    <Link to="/register"><button>Register</button></Link>
                </div>
                <div className='right'>
                    <h1>Login</h1>
                    <form>
                        <input type="email" placeholder='Email' name='email' onChange={handleChange} />
                        <input type="password" placeholder='Password' name='password' onChange={handleChange} />
                        {err&&err}
                        <button onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login