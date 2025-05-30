import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";


const PostsWidget = ({ userId, isProfile = false }) => {

    const dispatch = useDispatch();
    const posts = useSelector(s => s.posts ?? []); 
    const token = useSelector(s => s.token ?? 0);

    const getPosts = async() => {
        try{
            const response = await fetch(`http://localhost:3001/posts`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}`}
            });
            const data = await response.json();
            dispatch(
                setPosts({
                    posts: data
                })
            );
        }catch(err){
            alert(err.message);
        }
    }

    const getUserPosts = async() => {
        try{
            const response = await fetch(`http://localhost:3001/posts/${userId}/posts`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}`}
            });
            const data = await response.json();
            dispatch(
                setPosts({
                    posts: data
                })
            );
        }catch(err){
            alert(err.message);
        }
    }

    useEffect(() => {
        if(isProfile){
            getUserPosts();
        }else {
            getPosts();
        }
    }, []);
    return (
        <>
            {
                posts.map(({
                    _id, 
                    userId, 
                    firstName, 
                    lastName, 
                    description, 
                    location, 
                    picturePath, 
                    userPicturePath, 
                    likes, 
                    comments
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        location={location}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        comments={comments}
                    />
                ))
            }
        </>
    )
};


export default PostsWidget;