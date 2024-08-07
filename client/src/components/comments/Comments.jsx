import './comments.scss';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

const Comments = () => {

    const {currentUser}=useContext(AuthContext);

    const comments=[
        {
            id:4,
            name:"Dua Lipa",
            userId:1,
            profilePic:"https://images.pexels.com/photos/307847/pexels-photo-307847.jpeg?auto=compress&cs=tinysrgb&w=600",
            desc:"lorem asdkfuhiodrvf iosrf fnwe foiwq efoquwernfpqwef",
            img:"https://images.pexels.com/photos/307847/pexels-photo-307847.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
          id:5,
          name:"Beyonce",
          userId:2,
          profilePic:"https://images.pexels.com/photos/307847/pexels-photo-307847.jpeg?auto=compress&cs=tinysrgb&w=600",
          desc:"lorem asdkfuhiodrvf iosrf fnwe foiwq efoquwernfpqwef",
          img:"https://images.pexels.com/photos/307847/pexels-photo-307847.jpeg?auto=compress&cs=tinysrgb&w=600"
      }
    ]
  return (
    <div className="comments">
        <div className="write">
            <img src={currentUser.profilePic} alt="" />
            <input type="text" placeholder='write a comment'/>
            <button>Send</button>
        </div>
        {comments.map((comment)=>(
            <div className="comment">
                <img src={comment.profilePic} alt="" />
                <div className="info">
                    <span>{comment.name}</span>
                    <p>{comment.desc}</p>
                </div>
                <span className='date'>1 hour ago</span>
            </div>
        ))}
    </div>
  )
}

export default Comments