import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  // react-hook-form sets everything up for you
  const { register, handleSubmit } = useForm();

  // created by me --> used to render other messages to improve UX
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const attemptLogin = ({ username, password }) => {
    console.log("username", username);
    console.log("password", password);
    setIsLoading(true);
    setError("");
    axiosWithAuth()
      .post("/api/login", { username, password })
      .then((res) => {
        setTimeout(() => {
          setIsLoading(false);
          setError("");
          localStorage.setItem("token", res.data.payload);
          props.history.push("/protected");
        }, 1250);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        setError("Invalid Credentials");
      });
  };

  return (
    <div className='Login container'>
      <h3 style={{ color: "red" }}>{error}</h3>
      {isLoading ? (
        <h1>Attempting Login...</h1>
      ) : (
        // react-hook-form does validation in handleSubmit before attemptLogin
        <form
          onSubmit={handleSubmit(attemptLogin)}
          className='login-form container'
        >
          <h1>Login</h1>
          <div className='inputs'>
            <input
              type='text'
              name='username'
              placeholder='lambda'
              ref={register({ required: true })}
            />
            <input
              type='password'
              name='password'
              placeholder='school'
              ref={register({ required: true })}
            />
          </div>
          <input type='submit' />
        </form>
      )}
    </div>
  );
};

export default Login;
