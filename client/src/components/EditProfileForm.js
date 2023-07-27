import { useState, useContext } from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { ErrorContext } from "../context/errorContext";

function EditProfileForm({toggleForm}) {
  const history = useHistory();
  const { currentUser, saveUser, handleEditProfile, handleToggleForm } = useContext(UserContext);
  const { errors, saveErrors } = useContext(ErrorContext);

  const userSchema = yup.object({
    username: yup.string().required("Please enter a username"),
    breed: yup.string().required("Please enter your dog's breed"),
    age: yup.string().required("Please enter you dog's age"),
    weight: yup.string().required("Please enter your dog's weight"),
    fixed: yup
      .string()
      .required("Is your dog spayed/neutered? enter Yes or No"),
    profile_pic: yup.string().required("Please enter a photo url"),
    bio: yup.string().required("update your bio"),
  });

  const formik = useFormik({
    initialValues: {
      username: currentUser.username,
      breed: currentUser.breed,
      age: currentUser.age,
      weight: currentUser.weight,
      fixed: "yes or no",
      profile_pic: currentUser.profile_pic,
      bio: currentUser.bio,
    },
    // change bio back to currentUser.bio after updating database to avoid null errors from absent bio info
    validationSchema: userSchema,
    onSubmit: (values) => {
      handleEditProfile(values, saveErrors);
      toggleForm(false)
    },
  });
  return (
    <div>
      <p>{errors}</p>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="username">username:</label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.errors.username ? <div>{formik.errors.username}</div> : null}

        <label htmlFor="breed">Breed:</label>
        <input
          id="breed"
          name="breed"
          type="text"
          placeholder="breed"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.breed}
        />
        {formik.errors.breed ? <div>{formik.errors.breed}</div> : null}

        <label htmlFor="age">Age:</label>
        <input
          id="age"
          name="age"
          type="number"
          placeholder="age"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.age}
        />
        {formik.errors.age ? <div>{formik.errors.age}</div> : null}

        <label htmlFor="weight">Weight:</label>
        <input
          id="weight"
          name="weight"
          type="number"
          placeholder="weight lbs"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.weight}
        />
        {formik.errors.weight ? <div>{formik.errors.weight}</div> : null}

        <label htmlFor="fixed">Fixed:</label>
        <input
          id="fixed"
          name="fixed"
          type="text"
          placeholder="spay/neuter?"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.fixed}
        />
        {formik.errors.fixed ? <div>{formik.errors.fixed}</div> : null}

        <label htmlFor="profile_pic">Profile Picture URL:</label>
        <input
          id="profile_pic"
          name="profile_pic"
          type="text"
          placeholder="profile picture url"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.profile_pic}
        />
        {formik.errors.profile_pic ? <div>{formik.errors.profile_pic}</div> : null}


        <label htmlFor="bio">Bio:</label>
        <input
          id="bio"
          name="bio"
          type="text"
          placeholder="bio"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.bio}
        />

        {formik.errors.bio ? <div>{formik.errors.bio}</div> : null}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditProfileForm;
