import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

import { setCredentials } from "../auth/authSlice";
import { useLoginMutation } from "../auth/authApiSlice";
import usePersist from "../../hooks/usePersist";
import useAuth from "../../hooks/useAuth";

const LoginForm =  () => {



  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errMssg, setErrMssg] = useState("");
  const [persist, setPersist] = usePersist()

  const [login, { isLoading, isSuccess }] = useLoginMutation();

  useEffect(() => {
    setErrMssg("");
  }, [userName, password]);

  const onUsernameChanged = (e) => (
    setUserName(e.target.value), console.log(userName)
  );
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const handleToggle = () => setPersist(prev => !prev)


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(username);
    console.log(userName);

    try {
      const newUser = { username: userName, password: password };

      const { accessToken } = await login(newUser).unwrap();

      

      dispatch(setCredentials({ accessToken }));
      setUserName("");
      setPassword("");

      navigate(`/app/${userName}`);
    } catch (error) {
      console.log(error);
      if (!error.status) {
        setErrMssg("No Server Response");
      } else if (error.status === 400) {
        setErrMssg("Fill in all fields");
      } else if (error.status === 401) {
        setErrMssg("Unauthorized");
      } else {
        setErrMssg(error.data?.message);
      }
    }
  };

  if (isLoading) return <PulseLoader color={"#fff"} />;

  const form = (
    <div className="user-form__div">
      <form onSubmit={handleSubmit} className="user-form">
        <h2>
          New to myJournal? <Link to="/sign-up">Sign up</Link>
        </h2>
        <h3>Login</h3>
        <label htmlFor="username" className="user-form__username">
          Username:
        </label>
        <input
          autoComplete="off"
          className="user-form__usernameInput"
          id="username"
          name="username"
          onChange={onUsernameChanged}
          value={userName}
          type="text"
          required
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
          value={password}
          required
        />

        <button className="user-form__button">Login</button>
        <label htmlFor="persist" className="form__persist">
          <input
            type="checkbox"
            className="form__checkbox"
            id="persist"
            onChange={handleToggle}
            checked={persist}
          />
          Trust This Device
        </label>
      </form>
    </div>
  );

  return form;
};

export default LoginForm;
