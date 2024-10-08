import './post.scss';
import { Link } from 'react-router-dom'
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useContext, useState } from 'react';
import Comments from '../comments/Comments';
import moment from 'moment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { AuthContext } from '../../context/authContext';

const Post = ({ post }) => {
    const [commentOpen, setCommentOpen] = useState(false);
    const [menuOpen, setMenuOpen]=useState(false);

    const {currentUser}=useContext(AuthContext);
    const liked=true;    

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (liked) => {
            if (liked) { return makeRequest.delete('/likes?postId='+post.id) }
            else { return makeRequest.post('/likes', {postId:post.id}) }
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['likes'] }) //basically for instantly fetching data again of key=posts
        },
    });

    const deletePostMutation = useMutation({
        mutationFn: (postId) => {
            return makeRequest.delete('/posts/'+postId)
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['posts'] }) //basically for instantly fetching data again of key=posts
        },
    });
    

    const { isPending, error, data } = useQuery({
        queryKey: ['likes', post.id],
        queryFn: () =>
            makeRequest.get("/likes?postId=" + post.id).then((res) => {
                return res.data;
            })
    });

    const handleClick=(e)=>{
        e.preventDefault();
        mutation.mutate(data.includes(currentUser.id));
    }

    const handleDelete=(e)=>{
        e.preventDefault();
        deletePostMutation.mutate(post.id)
    }

    return (
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img src={'../uploads/'+post.profilePic} alt="" />
                        <div className="details">
                            <Link
                                to={`/profile/${post.userId}`}
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <span className="name">{post.name}</span>
                            </Link>
                            <span className="date">{moment(post.createdAt).fromNow()}</span>
                        </div>
                    </div>
                    <MoreHorizIcon onClick={()=>setMenuOpen(!menuOpen)}/>
                    {menuOpen&&post.userId==currentUser.id&&<button onClick={handleDelete}>Delete</button>}
                </div>
                <div className="content">
                    <p>{post.desc}</p>
                    <img src={'../uploads/' + post.img} alt="" />
                    {/*files in the public directory are served at the root path.*/}
                </div>
                <div className="info">
                    <div className="item">
                        {isPending?"Loading":data.includes(currentUser.id)?<FavoriteOutlinedIcon style={{ color: "red" }} onClick={handleClick} /> :<FavoriteBorderOutlinedIcon onClick={handleClick} />}
                        {data?.length} Likes
                    </div>
                    <div className="item" onClick={() => setCommentOpen(prev => !prev)}>
                        <TextsmsOutlinedIcon />
                        {commentOpen?"Hide Comments":"See Comments"}
                    </div>
                    <div className="item">
                        <ShareOutlinedIcon />
                        Share
                    </div>
                </div>
                {commentOpen && <Comments postId={post.id}/>}
            </div>
        </div>
    )
}

export default Post