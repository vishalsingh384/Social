import './comments.scss';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import moment from 'moment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';

const Comments = ({ postId }) => {

    const queryClient = useQueryClient();
    const { currentUser } = useContext(AuthContext);
    const [comment, setComment] = useState("");

    const { isPending, error, data } = useQuery({
        queryKey: ['comments', postId],
        queryFn: () =>
            makeRequest.get("/comments?postId=" + postId).then((res) => {
                return res.data;
            })
    });


    const mutation = useMutation({
        mutationFn: (newComment) => { return makeRequest.post('/comments', newComment) },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['comments'] }) //basically for instantly fetching data again of key=posts
        },
    });

    const handleClick = async (e) => {
        e.preventDefault();
        mutation.mutate({ comment, postId });
        setComment("");
    }    

    return (
        <div className="comments">
            <div className="write">
                <img src={currentUser.profilePic} alt="" />
                <input type="text" placeholder='write a comment' value={comment} onChange={(e) => setComment(e.target.value)} />
                <button onClick={handleClick}>Send</button>
            </div>
            {isPending ? "Loading Comments" : data.map((comment) => (
                <div className="comment" key={comment.id}>
                    <img src={comment.profilePic} alt="" />
                    <div className="info">
                        <span>{comment.name}</span>
                        <p>{comment.desc}</p>
                    </div>
                    <span className='date'>{moment(comment.createdAt).fromNow()}</span>
                </div>
            ))}
        </div>
    )
}

export default Comments