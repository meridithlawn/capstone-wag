
import {useContext} from "react";
import FoeCard from './FoeCard'
import { UserContext } from "../context/userContext";
import { Box } from "@mui/material";



function FoeCollection({filteredUserCategoryNegOne}) {
    const { handleSignOutClick, currentUser } = useContext(UserContext);
    

    const mappedFoes = filteredUserCategoryNegOne && filteredUserCategoryNegOne.map(user => <FoeCard key={user.id}{...user}/>)

    console.log(mappedFoes)

    return (
        <div>
            <h5>Foes</h5>
            <Box className="grid-container" sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5 }}>
            {mappedFoes}
            </Box>
        </div>
    )
}

export default FoeCollection;