import { useContext } from "react";
import { UserContext } from "../context/userContext";

function FoeCard({ username, id, profile_pic, breed, age, weight, bio, fixed }) {
  const { handleLikeClick } = useContext(UserContext);

  return (
    <div>
      <img src={profile_pic} alt="profilePicture" />
      <header>{username}</header>
      <h5>{age} years old</h5>
      <h5>{breed}</h5>
      <h5>{weight} lbs</h5>
      <h5> {bio}</h5>
      <h5>{fixed} fixed bool to string</h5>
      <button onClick={() => handleLikeClick({ receiver_id: id })}>like</button>
    </div>
  );
}

export default FoeCard;
