import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function ViewAccount({ loggedInUser }) {
  const [accountDetails, setAccountDetails] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You must be logged in to view account details.");
      return;
    }

    axios
      .get("http://localhost:8080/api/accounts/view-account", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setAccountDetails(response.data);
      })
      .catch((err) => {
        console.error("Error fetching account details:", err);
        setError("Failed to load account details. Please check your token or login again.");
      });
  }, []);

  return (
    <div className="form-container">
      <h2>Account Details</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {accountDetails ? (
        <div className="account-info">
          <p><strong>Name:</strong> {accountDetails.accountHolderName}</p>
          <p><strong>Account Number:</strong> {accountDetails.accountNumber}</p>
          <p><strong>Email:</strong> {accountDetails.email}</p>
          <p><strong>Address:</strong> {accountDetails.address}</p>
          <p><strong>State:</strong> {accountDetails.state}</p>
        </div>
      ) : !error ? (
        <p>Loading account info...</p>
      ) : null}
    </div>
  );
}

export default ViewAccount;
