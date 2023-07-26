import {useContext} from "react";
import FriendCard from './FriendCard'
import { UserContext } from "../context/userContext";

    function FriendCollection ({filteredUserCategoryPosOne}){
        
    const { handleSignOutClick, currentUser } = useContext(UserContext);

// below statement checks for if filteredUserCategoryPosOne has anything and if it does then it maps it
    const mappedFriends = filteredUserCategoryPosOne && filteredUserCategoryPosOne.map(user => <FriendCard key={user.id} {...user}/>)

    return (
        <div> 
            <h1>friends</h1>
            {mappedFriends}
        </div>
    )
}

export default FriendCollection;