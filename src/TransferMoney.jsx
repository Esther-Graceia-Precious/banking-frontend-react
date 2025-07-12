import { useState } from "react";
import axios from "axios";

function TransferMoney() {
  const [recipientAccountNumber, setRecipientAccountNumber] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransfer = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to transfer money.");
      return;
    }

    const transferData = {
      recipientAccountNumber,
      amount
    };

    axios.post("http://localhost:8080/api/accounts/transfer", transferData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        alert(response.data);
        setRecipientAccountNumber("");
        setAmount("");
      })
      .catch(error => {
        if (error.response && error.response.data) {
          alert(`Transfer failed: ${error.response.data}`);
        } else {
          alert("Transfer failed. Try again.");
        }
      });
  };

  return (
    <div className="form-container">
      <h2>Transfer Money</h2>
      <input
        type="text"
        placeholder="Recipient Account Number"
        value={recipientAccountNumber}
        onChange={e => setRecipientAccountNumber(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <button onClick={handleTransfer}>Transfer</button>
    </div>
  );
}

export default TransferMoney;
