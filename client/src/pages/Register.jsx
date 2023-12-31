import { useState, useEffect } from "react";
import "../styles/Register.css";
import axios from "axios";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../urlHandler";

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [walletAddress, setWalletAdress] = useState("");
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (typeof window.ethereum == "undefined") {
      console.log("error");
    } else {
      try {
        console.log("no error");
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log("000", provider);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        console.log({ accounts });
        console.log("Connected account:", accounts[0]);
        setWalletAdress(accounts[0]);
        console.log(walletAddress);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    console.log("shipping screen", walletAddress);
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        name,
        email,
        password,
        walletAddress,
      };

      await axios.post(`${BASE_URL}/api/v1/user/new`, newUser);

      navigate("/cart");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="signup-container">
        <h2>Create an Account</h2>
        <form className="form">
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="password" placeholder="Confirm Password" />
          {walletAddress ? (
            <button
              disabled
              style={{
                display: "block",
                marginBottom: "10px",
                alignItems: "center",
                backgroundColor: "#000",
                color: "#fff",
                padding: "0.5rem",
                borderRadius: "3px",
              }}
            >
              Metamask Connected
            </button>
          ) : (
            <button
              style={{
                display: "flex",
                marginBottom: "10px",
                alignItems: "center",
                gap: "0.75rem",
                justifyContent: "center",
                color: "#fff",
                backgroundColor: "#000",
                cursor: "pointer",
                padding: "0.5rem",
                border: "none",
                borderRadius: "3px",
              }}
              onClick={handleClick}
            >
              <img src="/img/fox.png" height="20" /> Connect Wallet
            </button>
          )}
          <button type="submit" className="btn-reg" onClick={handleRegister}>
            Sign Up
          </button>
        </form>
        <div className="login-link">
          <p>Already have an account?</p>
          <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
