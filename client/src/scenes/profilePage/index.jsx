import Navbar from "../navbar";
import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import FriendListWidget from "../widgets/FriendListWidget";
import CreatePostWidget from "../widgets/CreatePostWidget";
import PostsWidget from "../widgets/PostsWidget";
import UserWidget from "../widgets/UserWidget";


const ProfilePage = () => {
    
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const { _id } = useSelector(s => s.user ?? {});
    const token = useSelector(s => s.token ?? null);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const getUser = async() => {
        try{
            const response = await fetch(`http://localhost:3001/users/${userId}`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}`}
            });

            const data = await response.json();
            setUser(data);
        }catch(err){
            alert(err.message);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    if(!user) return null;

    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                p="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="2rem"
                justifyContent="center"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined }>
                    <UserWidget 
                        userId={userId}
                        picturePath={user.picturePath}
                    />
                    <Box m="2rem 0" />
                    <FriendListWidget
                        userId={userId}
                    />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined }
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    {/* MY POST WIDGET */ }
                    {
                        _id === userId && (
                            < CreatePostWidget
                                picturePath={user.picturePath}
                            />
                        )
                    }

                    <Box m="2rem 0" />
                    {/* SEE ALL POSTS */}
                    
                    <PostsWidget
                        userId={userId}
                        isProfile
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default ProfilePage;