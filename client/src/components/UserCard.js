import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Box, Button, IconButton, Paper, Stack } from "@mui/material";
import { Favorite as FavoriteIcon, HeartBroken as HeartBrokenIcon } from "@mui/icons-material/";

/** @typedef {{ id, username, profile_pic, breed, age, weight, fixed, bio }} IUser */

function UserCard({ id, username, profile_pic, breed, age, weight, fixed, bio }) {
  const { handleLikeClick, handleDislikeClick } = useContext(UserContext);

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
        <Stack direction="row" gap={2}>
          <IconButton onClick={() => handleLikeClick({ receiver_id: id })}>
            <FavoriteIcon />
          </IconButton>

          <IconButton onClick={() => handleDislikeClick({ receiver_id: id })}>
            <HeartBrokenIcon />
          </IconButton>
        </Stack>
      </Box>
    </Paper>
  );
}

export default UserCard;
