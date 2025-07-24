import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import slide1 from './Components/images/Customer.png';
import slide2 from './Components/images/Image2.png';
import slide3 from './Components/images/Image3.png';

function HomePage({ loggedInUser, userPassword, handleLogout }) {
  const [current, setCurrent] = useState(0);
  const images = [slide1, slide2, slide3];
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <header className="app-header">
        <div className="header-left">🏦 MyBank</div>
        <div className="header-right">
          <button className="link-btn">Contact Us</button>
          <button className="link-btn">Complaints</button>
        </div>
      </header>

      <div className="second-header">
        <div className="left-text">Welcome to MyBank</div>

        <div className="center-content">
          <input type="text" placeholder="Search..." />
        </div>

        <div className="right-buttons">
          {!loggedInUser ? (
            <>
              <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
              <button className="create-btn" onClick={() => navigate("/create-account")}>Create Account</button>
            </>
          ) : (
            <div className="profile-section" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Profile" className="profile-pic" />
              <span>Welcome, {loggedInUser}</span>
              <button className="create-btn" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>

      <main className="slideshow-wrapper">
        <div className="slideshow-container">
          <img src={images[current]} alt="Slideshow" className="slide-image" />
        </div>
      </main>

      <div className="action-buttons-container">
        <div className="action-button" onClick={() => navigate("/withdraw")}>
          <img src="https://cdn-icons-png.flaticon.com/512/126/126122.png" alt="Withdraw" className="icon-img" />
          <h4>Withdraw</h4>
          <p>Withdraw money from your account</p>
        </div>

        <div className="action-button" onClick={() => navigate("/deposit")}>
          <img src="https://cdn-icons-png.flaticon.com/512/126/126083.png" alt="Deposit" className="icon-img" />
          <h4>Deposit</h4>
          <p>Add money to your account</p>
        </div>

        <div className="action-button" onClick={() => navigate("/delete-account")}>
          <img src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png" alt="Delete Account" className="icon-img" />
          <h4>Delete Account</h4>
          <p>Remove your account permanently</p>
        </div>

        <div className="action-button" onClick={() => navigate("/view-account")}>
          <img src="https://cdn-icons-png.flaticon.com/512/709/709722.png" alt="View Account" className="icon-img" />
          <h4>View your Accounts</h4>
          <p>See your Account Details</p>
        </div>

        <div className="action-button" onClick={() => navigate("/transfer")}>
          <img src="https://cdn-icons-png.flaticon.com/512/219/219972.png" alt="Transfer Money" className="icon-img" />
          <h4>Transfer Money</h4>
          <p>Send money to another account</p>
        </div>
        
      </div>

      <footer className="footer">
        © 2025 MyBank. All Rights Reserved.
        <span style={{ marginLeft: "20px" }}>
          <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
        </span>
      </footer>
    </div>
  );
}

export default HomePage;
