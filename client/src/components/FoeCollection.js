
import React from "react";
import FoeCard from './FoeCard'

function FoeCollection({mappedFoes}) {

    return (
        <div>
            <FoeCard mappedFoes={mappedFoes}/>
        </div>
    )
}

export default FoeCollection;