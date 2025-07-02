import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

function Withdraw({ loggedInUser, userPassword }) {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleWithdraw = (e) => {
    e.preventDefault();

    const withdrawData = {
      accountHolderName: loggedInUser, // Case-sensitive: matches backend DTO
      password: userPassword,
      amount: parseFloat(amount)
    };

    axios.post("http://localhost:8080/api/accounts/withdraw", withdrawData)
      .then(() => {
        alert("Amount withdrawn successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Withdraw error:", error.response?.data || error.message);
        alert("Failed to withdraw. Check balance or credentials.");
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