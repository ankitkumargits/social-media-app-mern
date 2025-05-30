import User from "../models/User.js";

// READ

export const getUser = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        const userObject = user.toObject();
        delete userObject.password;
        res.status(200).json(userObject);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

export const getUserFriends = async(req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends?.map(({_id, firstName, lastName, occupation, location, picturePath}) => {
            return {_id, firstName, lastName, occupation, location, picturePath};
        });
        res.status(200).json(formattedFriends);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

// UPDATE

export const addRemoveFriend = async (req, res) => {
    try{
        const { id, friendId} = req.params;

        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter(id => id !== friendId);
            friend.friends = friend.friends.filter(friendId => friendId !== id);
        }else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();


        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends?.map(({_id, firstName, lastName, occupation, location, picturePath}) => {
            return {_id, firstName, lastName, occupation, location, picturePath};
        });

        res.status(200).json(formattedFriends);
        
    }catch(err){
        res.status(500).json({error: err.message});
    }
}