import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import React from "react";

function WalkerCard({ username, profile_pic, id }) {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar src={profile_pic} alt="profilePicture" />
        </ListItemAvatar>
        <ListItemText primary={username} />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
  //   return (
  //     <div>
  //       <img src={profile_pic} alt="profilePicture" />
  //       <header>{username}</header>
  //       <h5>{id}</h5>
  //     </div>
  //   );
}
export default WalkerCard;
