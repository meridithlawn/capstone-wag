import {useContext} from "react";
import FriendCard from './FriendCard'
import { UserContext } from "../context/userContext";
import { Box } from "@mui/material";

    function FriendCollection ({filteredUserCategoryPosOne}){
        
    const { handleSignOutClick, currentUser } = useContext(UserContext);

// below statement checks for if filteredUserCategoryPosOne has anything and if it does then it maps it
    const mappedFriends = filteredUserCategoryPosOne && filteredUserCategoryPosOne.map(user => <FriendCard key={user.id} {...user}/>)

    return (
        <div> 
            <h5>Friends</h5>
            <Box className="grid-container" sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5 }}>
            {mappedFriends}
            </Box>
        </div>
    )
}

export default FriendCollection;