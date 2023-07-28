import { Switch, Route, useHistory } from "react-router-dom";
import { useContext, useState } from "react";
import { Paper, Box, Stack, Button } from "@mui/material";
import { UserContext } from "../context/userContext";
import EditProfileForm from "./EditProfileForm";

function UserProfile() {
  const [seeForm, setSeeForm] = useState(false); //profile update
  const history = useHistory();

  const toggleForm = () => {
    setSeeForm((currentVal) => !currentVal);
  };

  const { currentUser, handleDelete, handleCurrentlyWalking } =
    useContext(UserContext);

  return (
    <Paper elevation={2} sx={{height:"800px", display:"grid", gridTemplateRows: "60% 40%"}}>
      <img src={currentUser.profile_pic} alt="profilePicture" style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }} />
      <Box p={2}>
      <h2>{currentUser.username}</h2>
      <Stack direction="row" gap={2}>
      
      <span>{currentUser.breed}</span>
      <span>{currentUser.weight} lbs</span>
      </Stack>
      <h5>{currentUser.age} years old</h5>
      {/* <h5>{currentUser.fixed} how to show bool to string</h5> */}
      <h5> {currentUser.bio} </h5>
      {currentUser.currently_walking ? (
        <Button onClick={handleCurrentlyWalking}> End Walking Status </Button>
      ) : (
        <Button onClick={handleCurrentlyWalking}> Start Walking Status </Button>
      )}
      <Button onClick={handleDelete}>Delete Profile</Button>
      <Button variant="secondary" onClick={toggleForm}>
        Edit your profile
      </Button>
      {seeForm ? <EditProfileForm toggleForm={toggleForm} /> : null}
      </Box>
    </Paper>
  );
}

export default UserProfile;
