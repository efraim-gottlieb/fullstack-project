import React, { useState } from "react";
import "./login.css"
type LoginInput = {
  name: string;
  password: string;
};

const Login = () => {
  const [loginInput, setLoginInput] = useState<LoginInput>({
    name: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
  }

  async function login() {
    const response = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: loginInput.name,
        password: loginInput.password,
      }),
    });
    const data = await response.json();
    localStorage.setItem("token", data.token);
  }
  return (
    <div>

        <div className="login-form">
          <label htmlFor="name">Agent Code</label>
          <input
            type="text"
            id="name"
            name="name"
            value={loginInput.name}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginInput.password}
            onChange={handleChange}
          />
        <button onClick={login}>Login</button>
        </div>

    </div>
  );
};

export default Login;
