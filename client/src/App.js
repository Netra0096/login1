import React, { useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  // const [usernameReg, setUsernameReg] = useState("");
  // const [passwordReg, setPasswordReg] = useState("");

  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const initialFormData = Object.freeze({
    username: "",
    password: "",
  });
  const [loginData, setLoginData] = useState(initialFormData);

  const [regData, setRegData] = useState({
    usernameReg: "",
    passwordReg: "",
  });

  const registerHandler = (e) => {
    setRegData({
      ...regData,
      [e.target.name]: e.target.value,
    });
  };

  const register = () => {
    Axios.post("http://localhost:5000/register", {
      username: regData.usernameReg,
      password: regData.passwordReg,
    }).then((response) => {
      if (response.statusText === "OK") {
        setLoginStatus(" One Records committed successfully!");
      } else {
        setLoginStatus(response.status);
      }
    });
  };

  const loginHandler = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/login", {
      username: loginData.username,
      password: loginData.password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(
          "Hi " +
            response.data[0].username +
            " you have logged in successfully!"
        );
      }
    });
  };

  return (
    <div className="App">
      <div className="registration">
        <h1>Registration</h1>
        <label>Username</label>
        <input
          type="text"
          name="usernameReg"
          value={regData.usernameReg}
          onChange={registerHandler}
          // onChange={(e) => {
          //   setUsernameReg(e.target.value);
          // }}
        />
        <label>Password</label>
        <input
          type="text"
          name="passwordReg"
          value={regData.passwordReg}
          onChange={registerHandler}
          // onChange={(e) => {
          //   setPasswordReg(e.target.value);
          // }}
        />
        <button onClick={register}>Registration</button>
      </div>

      <div className="login">
        <h1>Login</h1>
        <label>Username</label>
        <input
          type="text"
          placeholder="User Name..."
          name="username"
          value={loginData.username}
          onChange={loginHandler}
          // onChange={(e) => {
          //   setUsername(e.target.value);
          // }}
        />
        <label>Password</label>
        <input
          type="text"
          placeholder="Password..."
          name="password"
          value={loginData.password}
          onChange={loginHandler}
          // onChange={(e) => {
          //   setPassword(e.target.value);
          // }}
        />
        <button onClick={login}>Login</button>
      </div>
      <div>
        <h1>{loginStatus}</h1>
      </div>
    </div>
  );
}

export default App;
