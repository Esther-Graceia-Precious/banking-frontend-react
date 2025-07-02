import { useState } from "react";
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
  const [loggedInUser, setLoggedInUser] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleLogin = (username, password) => {
    setLoggedInUser(username);
    setUserPassword(password);
  };

  const handleLogout = () => {
    setLoggedInUser("");
    setUserPassword("");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              loggedInUser={loggedInUser}
              userPassword={userPassword}
              handleLogout={handleLogout}
            />
          }
        />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/withdraw" element={<Withdraw loggedInUser={loggedInUser} userPassword={userPassword} />} />
        <Route path="/deposit" element={<Deposit loggedInUser={loggedInUser} userPassword={userPassword} />} />
        <Route path="/delete-account" element={<DeleteAccount loggedInUser={loggedInUser} userPassword={userPassword} />} />
        <Route path="/transfer" element={<TransferMoney />} />
        <Route path="/view-account" element={<ViewAccount accountHolderName={loggedInUser} password={userPassword} />} />


      </Routes>
    </Router>
  );
}

export default App;
