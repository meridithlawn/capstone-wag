import React from "react";
import WalkerCard from "./WalkerCard";
import { Divider, List } from "@mui/material";

function CurrentlyWalking({ currentlyWalkingFriends }) {
  const mappedWalking = currentlyWalkingFriends && currentlyWalkingFriends.map((user) => <WalkerCard key={user.id} {...user} />);
  return (
    <div>
      <h5> Currently Walking</h5>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {mappedWalking}
        
       
        
        
      </List>
    </div>
  );
}

export default CurrentlyWalking;
