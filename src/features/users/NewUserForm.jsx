import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAddNewUserMutation } from "./usersSlice";
import usePersist from "../../hooks/usePersist";

const NewUserForm = ({ username }) => {
  const navigate = useNavigate();

  const [addNewUser] = useAddNewUserMutation();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [persist, setPersist] = usePersist()

  const onUsernameChanged = (e) => setUserName(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const handleToggle = () => setPersist(prev => !prev)

  const canSave = [userName, password].every(Boolean);

  const onSignup = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        const newUser = { username: userName, password}
        await addNewUser(newUser).unwrap();

        setUserName("");
        setPassword("");

        navigate(`/app/${userName}`);
      } catch (error) {
        console.error("unable to sign up");
        console.log(error);
      }
    }
  };

  return (
    <div className="user-form__div">
      <form onSubmit={onSignup} className="user-form">
        <h3>Sign up</h3>
        <label htmlFor="username" className="user-form__username">
          Username:
        </label>
        <input
          autoComplete="off"
          className="user-form__usernameInput"
          id="username"
          name="username"
          onChange={onUsernameChanged}
          type="text"
        />
        <label htmlFor="password" className="user-form__password">
          Password:
        </label>
        <input
          autoComplete="off"
          className="user-form__passwordInput"
          id="password"
          name="password"
          onChange={onPasswordChanged}
          type="password"
        />

        <button className="user-form__button">Sign up</button>
        <Link to="/">back</Link>
        <label htmlFor="persist" className="form__persist">
          <input
            type="checkbox"
            className="form__checkbox"
            id="persist"
            onChange={handleToggle}
            checked={persist}
          />
          Sign up
        </label>
      </form>
    </div>
  );
};

export default NewUserForm;
