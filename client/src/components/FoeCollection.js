
import {useContext} from "react";
import FoeCard from './FoeCard'
import { UserContext } from "../context/userContext";



function FoeCollection({filteredUserCategoryNegOne}) {
    const { handleSignOutClick, currentUser } = useContext(UserContext);
    

    const mappedFoes = filteredUserCategoryNegOne && filteredUserCategoryNegOne.map(user => <FoeCard key={user.id}{...user}/>)

    console.log(mappedFoes)

    return (
        <div>
            <h1>Foes</h1>
            {mappedFoes}
        </div>
    )
}

export default FoeCollection;