import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state";


const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
}) => {

    const [isComments, setIsComments ] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector(s => s.token ?? 0);
    const loggedInUserId = useSelector(s => s.user._id ?? 0);
    const isLiked = Boolean(likes?.[loggedInUserId]);
    const likeCount = Object?.keys(likes ?? {})?.length ?? 0;

    const palette = useTheme();
    const main = palette?.neutral?.main;
    const primary = palette?.primary?.main;

    const patchLike = async() => {
        try{
            const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({userId: loggedInUserId})
            });
            const updatedPost = await response.json();
            dispatch(
                setPost({
                    post: updatedPost
                })
            );
        }catch(err){
            alert(err.message);
        }
    }


    return (
        <>
            <WidgetWrapper m="2rem 0">
                <Friend
                    friendId={postUserId}
                    name={name}
                    subTitle={location}
                    userPicturePath={userPicturePath}
                />
                <Typography color={main} mt="1rem">
                    {description}
                </Typography>
                {
                    picturePath && (
                        <img
                            width="100%"
                            height="auto"
                            alt="post"
                            style={{borderRadius:  "0.75rem", marginTop: "0.75rem"}}
                            src={`http://localhost:3001/assets/${picturePath}`}
                        />
                    )
                }
                <FlexBetween mt="0.25rem">
                    <FlexBetween gap="1rem">
                        {/* LIKE SECTION */}
                        <FlexBetween gap="0.3rem">
                            <IconButton onClick={patchLike}>
                                {
                                    isLiked ? (
                                        <FavoriteOutlined sx={{color: primary}} /> 
                                    ): (
                                        <FavoriteBorderOutlined />
                                    )
                                }
                            </IconButton>
                            <Typography>
                                {likeCount}
                            </Typography>
                        </FlexBetween>

                        {/* COMMENT SECTION */}
                        <FlexBetween gap="0.3rem">
                            <IconButton onClick={() => setIsComments(!isComments)}>
                                <ChatBubbleOutlineOutlined/>
                            </IconButton>
                            <Typography>
                                {comments.length}
                            </Typography>
                        </FlexBetween>

                    </FlexBetween>
                    <IconButton>
                        <ShareOutlined/>
                    </IconButton>
                </FlexBetween>

                {
                    isComments && (
                        <Box mt="0.5rem">
                            {
                                comments.map((comment, index) => (
                                    <Box key={index}>
                                        <Divider />
                                        <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                                            {comment}
                                        </Typography>
                                    </Box>
                                ))
                            }
                            <Divider />
                        </Box>
                    )
                }
            </WidgetWrapper>
        </>
    )
};


export default PostWidget;