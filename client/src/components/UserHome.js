import React, { useState, useEffect, useContext } from "react";
// import {useHistory} from 'react-router-dom'
import { UserContext } from "../context/userContext";
// import { ErrorContext } from "../context/errorContext";
import UserCard from "./UserCard";
import { Box, Grid } from "@mui/material";
import { ErrorContext } from "../context/errorContext";

function UserHome({ filteredCategoryNewNew }) {
  const { handleSignOutClick, currentUser } = useContext(UserContext);
  const { saveErrors } = useContext(ErrorContext);

  // const filteredUserCategoryNegOne = allUsers.filter((user) =>
  //   currentUser.get_neg_interactions.includes(user.id)
  // );
  // console.log("foes", filteredUserCategoryNegOne);

  // const filteredUserCategoryPosOne = allUsers.filter((user) =>
  //   currentUser.get_users_w_pos_interactions.includes(user.id)
  // );

  //   console.log("friends", filteredUserCategoryPosOne);

  // .find will have a true false boolean. returns the element if found, otherwise undefined
  // const filteredUserCategoryNew = allUsers
  //   .filter(
  //     (user) =>
  //       !currentUser.sent_interactions.find(
  //         (interaction) => interaction.receiver_id === user.id
  //       )
  //   )
  //   .filter((user) => user.id !== currentUser.id);
  // add filter to all users to remove interaction.relation_cat === -1 and then filteredUserCategoryNew on that list of users

  const mappedNewUsers = filteredCategoryNewNew.map((user) => <UserCard key={user.id} {...user} />);
  console.log("FILTERED CAT NEW", filteredCategoryNewNew);

  const showError = () => {
    saveErrors("test bad error should pop up");
  };

  return (
    <Box p={1}>
      <h2>Nice to see you, {currentUser.username}!</h2>
      {/* <button onClick={handleSignOutClick}>sign out</button> */}
      {/* <button onClick={showError}>test error</button> */}
      <h5>Find new friends</h5>

      {/* grid of 3 columns */}
      <Box className="grid-container" sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5 }}>
        {mappedNewUsers}
      </Box>
    </Box>
  );

  // render list of potential matches, render list of your friends side by side
}
export default UserHome;

// implemented since standup:
// currentuser.friends && currentuser.friends.map,
