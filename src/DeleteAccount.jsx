import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DeleteAccount({ loggedInUser, userPassword }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    const deleteData = {
      accountHolderName: loggedInUser,
      password: userPassword
    };

    axios.delete("http://localhost:8080/api/accounts/delete", { data: deleteData })
      .then(() => {
        alert("Account deleted successfully");
        navigate("/");
      })
      .catch(() => {
        alert("Failed to delete account. Check credentials.");
      });
  };

  return (
    <div className="form-container">
      <h2>Delete Account</h2>
      <p>Are you sure you want to delete your account, {loggedInUser}?</p>
      <button onClick={handleDelete} className="delete-btn">Delete Account</button>
    </div>
  );
}

export default DeleteAccount;
