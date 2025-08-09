import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "./config.jsx";

function DeleteAccount() {
  const navigate = useNavigate();

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    axios.delete(`${API_BASE_URL}/api/accounts/delete`, {
    headers: {
    Authorization: `Bearer ${token}`
    }
    })
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser"); 
        alert("Account deleted. You've been logged out.");
        navigate("/"); 
        window.location.reload(); 
      })
      .catch((error) => {
        alert("Failed to delete account");
        console.error("Delete error:", error);
      });
  };

  return (
    <div className="form-container">
      <h2>Delete Account</h2>
      <p>Are you sure you want to delete your account?</p>
      <button onClick={handleDelete} className="delete-btn">
        Delete Account
      </button>
    </div>
  );
}

export default DeleteAccount;
