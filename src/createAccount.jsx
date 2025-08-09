import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { API_BASE_URL } from "./config.jsx";

function CreateAccount() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");

  const navigate = useNavigate();

  const validatePassword = (password) => {
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const symbol = /[!@#$%^&*(),.?":{}|<>]/;
    
    return (
      password.length >= 8 &&
      uppercase.test(password) &&
      lowercase.test(password) &&
      symbol.test(password)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      alert("Password must be at least 8 characters, include uppercase, lowercase, and a special symbol.");
      return;
    }

    const accountData = {
      accountHolderName: name,
      password: password,
      balance: amount.toString(),
      email: email,
      address: address,
      state: state
    };

    axios.post(`${API_BASE_URL}/api/accounts`, accountData)
  .then((response) => {
    alert(`Account successfully created! Your Account Number is ${response.data.accountNumber}`);
    navigate("/login");
  })
      .catch((error) => {
        console.error("Error creating account:", error);
        alert("Failed to create account. Please try again.");
      });
  };

  return (
    <div className="form-container">
      <h2>Create New Account</h2>
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
        <input
          type="number"
          placeholder="Initial Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default CreateAccount;