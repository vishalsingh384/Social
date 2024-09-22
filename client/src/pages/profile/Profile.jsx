import React, { useContext, useState } from 'react'
import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from '../../components/posts/Posts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import Update from '../../components/Update/Update';

const Profile = () => {

  const { currentUser } = useContext(AuthContext);
  const userId = parseInt(useLocation().pathname.split("/")[2]);
  
  const [updateOpen, setUpdateOpen]=useState(false);

  const { isPending, error, data } = useQuery({
    queryKey: ['user'],
    queryFn: () =>
      makeRequest.get("/user/" + userId).then((res) => {
        return res.data;
      })
  });

  const { isPending: rIsPending, data: rData } = useQuery({
    queryKey: ['relationship'],
    queryFn: () =>
      makeRequest.get("/relationship?followedUserId=" + userId).then((res) => {
        return res.data;
      })
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
      mutationFn: (following) => {
          if (following) { return makeRequest.delete('/relationship?userId='+userId) }
          else { return makeRequest.post('/relationship', {userId}) }
      },
      onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries({ queryKey: ['relationship'] }) //basically for instantly fetching data again of key=posts
      },
  });
  

  const handleFollow = async (e) => {
    e.preventDefault();
    mutation.mutate(rData.includes(currentUser.id));
  }

  return (
    <div className="profile">
      {
        isPending ? "Loading profile" :
          (
            <>
              <div className="images">
                <img className='cover' src={'../uploads/'+data.coverPic} alt="" />
                <img className='profilePic' src={'../uploads/'+data.profilePic} alt="" />
              </div>
              <div className="profileContainer">
                <div className="uInfo">
                  <div className="left">
                    <a href="http://facebook.com">
                      <FacebookTwoToneIcon fontSize="small" />
                    </a>
                    <a href="http://facebook.com">
                      <InstagramIcon fontSize="small" />
                    </a>
                    <a href="http://facebook.com">
                      <TwitterIcon fontSize="small" />
                    </a>
                    <a href="http://facebook.com">
                      <LinkedInIcon fontSize="small" />
                    </a>
                    <a href="http://facebook.com">
                      <PinterestIcon fontSize="small" />
                    </a>
                  </div>
                  <div className="center">
                    <span>{data.name}</span>
                    <div className="info">
                      <div className="item">
                        <PlaceIcon />
                        <span>{data.city}</span>
                      </div>
                      <div className="item">
                        <LanguageIcon />
                        <span>{data.website}</span>
                      </div>
                    </div>
                    {rIsPending ? "loading" : userId === currentUser.id ? (<button onClick={()=>setUpdateOpen(true)}>Update</button>) : (<button onClick={handleFollow}>{rData.includes(currentUser.id) ? "Following" : "Follow"}</button>)}
                  </div>
                  <div className="right">
                    <EmailOutlinedIcon />
                    <MoreVertIcon />
                  </div>
                </div>
                <Posts userId={userId}/>
              </div>
            </>
          )
      }
      {updateOpen&&<Update setUpdateOpen={setUpdateOpen} user={data}/>}
    </div>
  )
}

export default Profile