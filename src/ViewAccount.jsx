import { useState } from "react";
import axios from "axios";

function ViewAccount({ accountHolderName, password }) {
  const [details, setDetails] = useState(null);

  const handleViewAccount = () => {
    axios.post("http://localhost:8080/api/accounts/view-account", {
      accountHolderName,
      password
    })
    .then((res) => {
      setDetails(res.data);
    })
    .catch(() => {
      alert("Failed to fetch account details");
    });
  };

  return (
    <div className="view-account-container">
      <h2>Your Account Details</h2>
      <button onClick={handleViewAccount}>View Your Account</button>

      {details && (
        <div className="account-details">
          <p><strong>Account Number:</strong> {details.accountNumber}</p>
          <p><strong>Name:</strong> {details.accountHolderName}</p>
          <p><strong>Email:</strong> {details.email}</p>
          <p><strong>Address:</strong> {details.address}</p>
          <p><strong>State:</strong> {details.state}</p>
        </div>
      )}
    </div>
  );
}

export default ViewAccount;
