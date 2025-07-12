import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

function Withdraw({ loggedInUser }) {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleWithdraw = (e) => {
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

    const withdrawData = {
      amount: parseFloat(amount)
    };

    axios.post("http://localhost:8080/api/accounts/withdraw", withdrawData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        alert("Amount withdrawn successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Withdraw error:", error.response?.data || error.message);
        alert("Withdraw failed: " + (error.response?.data || "Check token or balance"));
      });
  };

  return (
    <div className="form-container">
      <h2>Hello {loggedInUser}, how much would you like to withdraw?</h2>
      <form onSubmit={handleWithdraw}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Withdraw</button>
      </form>
    </div>
  );
}

export default Withdraw;
