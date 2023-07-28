import {useContext} from "react";
import { UserContext } from "../context/userContext";
import { Box, Button, IconButton, Paper, Stack } from "@mui/material";
import { Favorite as FavoriteIcon, HeartBroken as HeartBrokenIcon } from "@mui/icons-material/";

function FriendCard({username, profile_pic, breed, age, weight, fixed, bio, id}) {

  return (
    <Paper elevation={2} sx={{ height: "650px", display: "grid", gridTemplateRows: "60% 40%" }}>
      <img src={profile_pic} alt="profilePicture" style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }} />
      <Box p={2}>
        <h2>{username}</h2>
        <Stack direction="row" gap={2}>
          <span>{breed}</span>
          <span>{weight} lbs</span>
        </Stack>
        {/* <h5>{fixed}</h5> */}
        <h5>{age} years old</h5>
        <span> {bio} </span>
      </Box>
    </Paper>
  );
}

export default FriendCard

    // const {handleDislikeClick} = useContext(UserContext)

//     return (

//         <div>
//                 <img src={profile_pic} alt="profilePicture"/>
//                 <header>{username}</header>
//                 <h5>{id}</h5>
//                 <h5>{age} years old</h5>
//                 <h5>{breed}</h5>    
//                 <h5>{weight} lbs</h5>
//                 <h5> {bio}</h5>
//                 <h5>{fixed} fixed bool to string</h5>
//                 <button onClick={handleDislikeClick}>dislike</button>
//         </div>
//     )

// }