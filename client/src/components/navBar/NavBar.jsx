import React, { useContext } from 'react';
import './navBar.scss';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const NavBar = () => {
    const { currentUser, logout } = useContext(AuthContext);
    const navigate=useNavigate();

    const handleClick=async(e)=>{
        e.preventDefault();
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            alert(error.message);
        } 
    }

    return (
        <div className='navbar'>
            <div className="left">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span>Social Media</span>
                </Link>
                <HomeOutlinedIcon />
                <GridViewOutlinedIcon />
                <div className="search">
                    <SearchOutlinedIcon />
                    <input type='text' placeholder='Search...' />
                </div>
            </div>
            <div className="right">
                <PersonOutlinedIcon />
                <EmailOutlinedIcon />
                <NotificationsOutlinedIcon />
                <div className='user'>
                    <Link to={'/profile/' + currentUser.id} style={{ textDecoration: "none", color: 'black' }}>
                        <img src={'../uploads/' + currentUser.profilePic} alt='' />
                    </Link>
                    <button onClick={handleClick}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default NavBar