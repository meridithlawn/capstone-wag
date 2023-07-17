import React, { useState, useEffect, useContext } from "react";
// import {useHistory} from 'react-router-dom'
import { UserContext } from "../context/userContext";
import UserCard from "./UserCard";


function UserHome({allUsers}) {
  const { handleSignOutClick, currentUser } = useContext(UserContext);


//   const filteredUserCategoryNegOne = allUsers.filter((user) =>
//     currentUser.get_neg_interactions.includes(user.id)
//   );
//   console.log("foes", filteredUserCategoryNegOne);

//   const filteredUserCategoryPosOne = allUsers.filter((user) =>
//     currentUser.get_users_w_pos_interactions.includes(user.id)
//   );
//   console.log("friends", filteredUserCategoryPosOne);

  // maybe need to iterate through currentUser.sent_interactions then compare to all users. maybe below method is backwards?

  // const filteredUserCategoryNew = allUsers.filter((user) => {
  //     const newList = []
  //     if (currentUser.sent_interactions.receiver_id !== (user.id)) {
  //         newList.push(user)
  //     }
  //     return newList
  // })

// .find will have a true false boolean. returns the element if found, otherwise undefined
  const filteredUserCategoryNew = allUsers.filter(
    (user) => !currentUser.sent_interactions.find(interaction => interaction.receiver_id === user.id)).filter((user) => user.id !== currentUser.id)


  const mappedNewUsers = filteredUserCategoryNew.map((user) => (
    <UserCard key={user.id} {...user} />
  ));
  console.log("FILTERED CAT NEW", filteredUserCategoryNew);

  return (
    <>
      <h1>Nice to see you, {currentUser.username}!</h1>
      <button onClick={handleSignOutClick}>sign out</button>
      <h2>find new friends</h2>
      <div>{mappedNewUsers}</div>
     
    </>
  );

  // render list of potential matches, render list of your friends side by side
}
export default UserHome;
