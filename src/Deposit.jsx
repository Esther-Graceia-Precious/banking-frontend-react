import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

function Deposit({ loggedInUser, userPassword }) {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleDeposit = (e) => {
    e.preventDefault();

    const depositData = {
      accountHolderName: loggedInUser,
      password: userPassword,
      amount: parseFloat(amount)
    };

    axios.post("http://localhost:8080/api/accounts/deposit", depositData)
      .then(() => {
        alert("Amount deposited successfully!");
        navigate("/");
      })
      .catch(() => {
        alert("Failed to deposit. Check credentials.");
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
