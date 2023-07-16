
import React from "react";
import FoeCard from './FoeCard'



function FoeCollection({filteredUserCategoryNegOne}) {

    const mappedFoes = filteredUserCategoryNegOne.map(user => <FoeCard key={user.id}{...user}/>)

    return (
        <div>
            <h1>Foes</h1>
            {mappedFoes}
        </div>
    )
}

export default FoeCollection;