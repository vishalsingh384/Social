import { useContext } from 'react';
import './stories.scss';
import { AuthContext } from '../../context/authContext';

const stories=[
    {
        id:4,
        name:"Dua Lipa",
        img:"https://images.pexels.com/photos/307847/pexels-photo-307847.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
]

const Stories = () => {

    const {currentUser}=useContext(AuthContext);
    
  return (
    <div className='stories'>
        <div className="story">
            <img src={currentUser.profilePic} alt="" />
            <span>{currentUser.name}</span>
            <button>+</button>
        </div>
        {stories.map(story=>(
            <div className="story" key={story.id}>
                <img src={story.img} alt="" />
                <span>{story.name}</span>
            </div>
        ))}
    </div>
  )
}

export default Stories