import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

function Deposit({ loggedInUser }) {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleDeposit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Login required.");
      return;
    }

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      alert("Enter a valid amount.");
      return;
    }

    const depositData = {
      amount: parseFloat(amount)
    };

    axios.post("http://localhost:8080/api/accounts/deposit", depositData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        alert("Amount deposited successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Deposit error:", error.response?.data || error.message);
        alert("Deposit failed: " + (error.response?.data || "Check token or server."));
      });
  };

  return (
    <div className="form-container">
      <h2>Hello {loggedInUser}, how much would you like to deposit?</h2>
      <form onSubmit={handleDeposit}>
        <input
          type="number"
          placeholder="Amount to deposit"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Deposit</button>
      </form>
    </div>
  );
}

export default Deposit;