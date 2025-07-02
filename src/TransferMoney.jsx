import { useState } from "react";
import axios from "axios";

export default function TransferMoney() {

  const [senderName, setSenderName] = useState('');
  const [password, setPassword] = useState('');
  const [recipientAccountNumber, setRecipientAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleTransfer = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/accounts/transfer", {
        accountHolderName: senderName,
        password: password,
        recipientAccountNumber: recipientAccountNumber,
        amount: parseFloat(amount)
      });

      setMessage(response.data);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data);
      } else {
        setMessage("Transfer failed. Please try again.");
      }
    }
  };

  return (
    <div className="transfer-form-container">
      <h2>Transfer Money</h2>
      <form onSubmit={handleTransfer}>
        <input
          type="text"
          placeholder="Your Name"
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
          required
        /><br /><br />

        <input
          type="password"
          placeholder="Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />

        <input
          type="text"
          placeholder="Recipient's Account Number"
          value={recipientAccountNumber}
          onChange={(e) => setRecipientAccountNumber(e.target.value)}
          required
        /><br /><br />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        /><br /><br />

        <button type="submit">Transfer</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
