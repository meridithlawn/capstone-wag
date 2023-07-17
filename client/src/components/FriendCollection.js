import {useContext} from "react";
import FriendCard from './FriendCard'
import { UserContext } from "../context/userContext";

    function FriendCollection ({allUsers}){const { handleSignOutClick, currentUser } = useContext(UserContext);



    const filteredUserCategoryPosOne = allUsers.filter((user) =>
    currentUser.get_users_w_pos_interactions.includes(user.id)
  );
  console.log("friends", filteredUserCategoryPosOne);


    const mappedFriends = filteredUserCategoryPosOne.map(user => <FriendCard key={user.id} {...user}/>)

    return (
        <div> 
            <h1>friends</h1>
            {mappedFriends}
        </div>
    )
}

export default FriendCollection;