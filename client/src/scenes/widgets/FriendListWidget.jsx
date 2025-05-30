import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import FlexBetween from "../../components/FlexBetween";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../state";


const FriendListWidget = ({userId}) => {

    const dispatch = useDispatch();
    const { palette } = useTheme();
    const token = useSelector(s => s.token ?? 0);
    const friends = useSelector(s => s?.user?.friends ?? []);

    const getFriends = async () => {
        try{
            const response = await fetch(`http://localhost:3001/users/${userId}/friends`, {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            });

            const data = await response.json();
            dispatch(
                setFriends({
                    friends: data
                })
            );
        }catch(err){
            alert(err.message);
        }
    }

    useEffect(() => {
        getFriends();
    }, []);
    return (
        <>
            <WidgetWrapper>
                <Typography
                    color={palette.neutral.dark}
                    variant="h5"
                    fontWeight="500"
                    sx={{
                        mb: "1.5rem"
                    }}
                >
                    Friend List
                </Typography>
                <Box display="flex" flexDirection="column" gap="1.5rem">
                    { friends.map((friend) => (
                        <Friend
                            key={friend._id}
                            friendId={friend._id}
                            name={`${friend.firstName} ${friend.lastName}`}
                            subTitle={friend.occupation}
                            userPicturePath={friend.picturePath}
                        />
                    ))}
                </Box>
            </WidgetWrapper>
        </>
    )
}


export default FriendListWidget;