import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

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

    axios.post("http://localhost:8080/auth/login", loginData)
  .then(res => {
    const token = res.data.token;
    console.log("Received token:", token);  

    if (token) {
      localStorage.setItem("token", token);
      onLogin(name, token);
      alert("Login successful");
      navigate("/");
    } else {
      alert("Login failed, token not received");
    }
  })
  .catch(err => {
    console.error(err);  
    alert("Invalid credentials or server error");
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
