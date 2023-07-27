import React, { useEffect, useState, useContext } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { UserContext } from "../context/userContext";
import { ErrorContext } from "../context/errorContext";
import NavBar from "./NavBar";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import UserHome from "./UserHome";
import FoeCollection from "./FoeCollection";
import FriendCollection from "./FriendCollection";
import UserProfile from "./UserProfile";
import ReportForm from "./ReportForm";
import CurrentlyWalking from "./CurrentlyWalking"
import Error from "./Error";

function App() {
  // Code goes here!

  // if you don't want/need to use all of the values, you can destructure to just one ones you need in this component
  const { currentUser } = useContext(UserContext);
  // -> include whichever values you want to inherit in the curly braces to destructure
  const { saveErrors, errors } = useContext(ErrorContext);

  const [showSignInForm, setShowSignInForm] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  const handleToggleForm = () => {
    setShowSignInForm((currentVal) => !currentVal);
  };

  // IS THIS AUTHENTICATED CORRECTLY IF I CAN SEE THE CONSOLE LOG FOR THE ALL USERS FETCH WHEN NOT LOGGED IN
  // user error state here

  useEffect(() => {
    if (currentUser) {
      fetch("/api/v1/users")
        .then((response) => response.json())
        .then((data) => {
          setAllUsers(data);
        });
    }
    // .catch((error) => saveErrors(error))
  }, [currentUser]);

  console.log("all users,", allUsers);

  // filteredCategoryPosOne returns all of my user friends
  const filteredUserCategoryPosOne = currentUser && allUsers.filter((user) =>
    currentUser.get_users_w_pos_interactions.includes(user.id)
  );

  const currentlyWalkingFriends = currentUser && filteredUserCategoryPosOne.filter((user) =>
    user.currently_walking === true)
    console.log("Currently walking friends", currentlyWalkingFriends)

  // filteredUserCategoryNegOne returns all of the users that I disliked
  const filteredUserCategoryNegOne = currentUser && allUsers.filter((user) =>
    currentUser.get_neg_interactions.includes(user.id)
  );
  // console.log("foes", filteredUserCategoryNegOne);

  const filteredCategoryNewNew = currentUser && allUsers
    .filter(
      (user) => currentUser.get_users_w_pos_interactions && !currentUser.get_users_w_pos_interactions.includes(user.id)
    )
    .filter((user) => currentUser.get_neg_interactions && !currentUser.get_neg_interactions.includes(user.id))
    .filter(
      (user) =>
      currentUser.sent_interactions && !currentUser.sent_interactions.find(
          (interaction) => interaction.receiver_id === user.id
        )
    );

  if (!currentUser) {
    return (
      <>
        {errors && <Error />}
        <header>
          {!showSignInForm ? (
            <SignInForm handleToggleForm={handleToggleForm} />
          ) : (
            <SignUpForm handleToggleForm={handleToggleForm} />
          )}
        </header>
        <img
          src="https://barx.flywheelsites.com/wp-content/uploads/2021/08/english-springer-spaniel-pair-scaled-1-1024x768.jpeg"
          alt="!"
        />
      </>
    );
  }
  return (
    <div>
      <NavBar />
      {errors && <Error />}
      <Switch>
        <Route exact path="/">
          <UserHome filteredCategoryNewNew={filteredCategoryNewNew} />
          <CurrentlyWalking currentlyWalkingFriends={currentlyWalkingFriends}/>
        </Route>
        <Route path="/foes">
          <FoeCollection
            filteredUserCategoryNegOne={filteredUserCategoryNegOne}
          />
        </Route>
        <Route path="/friends">
          <FriendCollection
            filteredUserCategoryPosOne={filteredUserCategoryPosOne}
          />
        </Route>
        <Route path="/my-profile">
          <UserProfile />
        </Route>
        <Route path="/reports">
          <ReportForm />
        </Route>
        <Route path="/chat">
          <ChatEngine
            projectID="f2276eae-256e-4e25-ae18-9722533ca53c"
            userName="andresvillarreal"
            userSecret="andresvillarreal"
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
