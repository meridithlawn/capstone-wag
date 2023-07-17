
import {useContext} from "react";
import FoeCard from './FoeCard'
import { UserContext } from "../context/userContext";



function FoeCollection({allUsers}) {
    const { handleSignOutClick, currentUser } = useContext(UserContext);

    const filteredUserCategoryNegOne = allUsers.filter((user) =>
    currentUser.get_neg_interactions.includes(user.id)
  );
  console.log("foes", filteredUserCategoryNegOne);

    const mappedFoes = filteredUserCategoryNegOne.map(user => <FoeCard key={user.id}{...user}/>)

    console.log(mappedFoes)

    return (
        <div>
            <h1>Foes</h1>
            {mappedFoes}
        </div>
    )
}

export default FoeCollection;