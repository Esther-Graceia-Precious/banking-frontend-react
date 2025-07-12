import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import CreateAccount from "./createAccount.jsx";
import Login from "./Login.jsx";
import HomePage from "./HomePage.jsx";
import Withdraw from "./Withdraw.jsx";
import Deposit from "./Deposit.jsx";
import DeleteAccount from "./DeleteAccount.jsx";
import TransferMoney from "./TransferMoney.jsx";
import ViewAccount from "./ViewAccount.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (name, token) => {
    setIsLoggedIn(true);
    setUsername(name);
    localStorage.setItem("token", token);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    localStorage.removeItem("token");
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage loggedInUser={username} handleLogout={handleLogout} />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
        <Route path="/transfer" element={<TransferMoney />} />
        <Route path="/view-account" element={<ViewAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
