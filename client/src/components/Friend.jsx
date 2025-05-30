import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setFriends } from "../state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";


const Friend = ({ friendId, name, subTitle, userPicturePath}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector(s => s.user ?? {});
    const token = useSelector(s => s.token ?? 0);
    const friends = useSelector(s => s.user.friends ?? []);
    
    const palette = useTheme();
    const primaryLight = palette?.primary?.light;
    const primaryDark = palette?.primary?.dark;
    const main = palette?.neutral?.main;
    const medium = palette?.neutral?.medium;
    
    const isFriend = friends?.find(({_id}) => _id === friendId);

    const patchFriend = async () => {
        try{
            const response = await fetch(`http://localhost:3001/users/${_id}/${friendId}`, {
                method: "PATCH",
                headers: { Authorization : `Bearer ${token}`, "Content-Type": "application/json"}
            });
            const data = await response.json();
            dispatch(
                setFriends({
                    friends: data
                })
            );
        }catch(err){
            alert(err.message, "alert catch ankit");
        }
    }

    return (
        <>
            <FlexBetween>
                <FlexBetween gap="1rem">
                    <UserImage
                        image={userPicturePath}
                        size="55px"
                    />
                    <Box
                        onClick={() => {
                                navigate(`/profile/${friendId}`)
                                navigate(0)
                            }
                        }
                    >
                        <Typography
                            color={main}
                            variant="h5"
                            fontWeight="500"
                            sx={{
                                "&:hover": {
                                    color: palette?.primary?.light,
                                    cursor: "pointer"
                                }
                            }}
                        >
                            {name}
                        </Typography>
                        <Typography color={medium} fontSize="0.75rem" variant="subtitle1">
                            {subTitle}
                        </Typography>
                    </Box>
                </FlexBetween>
                {
                    _id !== friendId && (
                        <IconButton
                            onClick={() => patchFriend()}
                            sx={{
                                backgroundColor: primaryLight, p: "0.6rem"
                            }}
                        >
                            {
                                isFriend ? (
                                    <PersonRemoveOutlined sx={{ color: primaryDark }} />
                                ) : (
                                    <PersonAddOutlined sx={{ color: primaryDark }} />
                                )
                            }
                        </IconButton>
                    )
                }
            </FlexBetween>
        </>
    )
}

export default Friend;