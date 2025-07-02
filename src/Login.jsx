import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ViewAccount from "./ViewAccount";

function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginData = {
      accountHolderName: name,
      password: password
    };

    axios.post("http://localhost:8080/api/accounts/login", loginData)
      .then(() => {
        alert("Login Successful");
        onLogin(name, password);  // <== Pass username & password to App.jsx state
        navigate("/");
      })
      .catch(() => {
        alert("Invalid credentials");
      });
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Account Holder Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;