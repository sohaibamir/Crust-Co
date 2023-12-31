import { useState, useEffect } from "react";
import "../../styles/UserData.css";
import axios from "axios";
import tokenContract from "../../RewardToken.json";
import { ethers } from "ethers";
import { toast } from "react-toastify";

const RewardData = () => {
  const [orders, setOrders] = useState([]);
  const [wallet, setWallet] = useState(null);
  const handleToken = async (id, walletAddress, total) => {
    if (wallet === null) {
      toast.error("Metamask not connected!");
      console.log("toasr");
    } else {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          tokenContract.address,
          tokenContract.abi,
          signer
        );

        const tx = await contract.rewardTokens(
          walletAddress,
          Math.floor(total * 0.5)
        );
        const receipt = await tx.wait();
        if (receipt.status === 1) {
          await axios.put(`http://localhost:4000/orders/rewardedOrders/${id}`, {
            isTokenized: true,
          });
          toast.success("Token awarded");
        } else {
          toast.error("Transaction Failed");
        }
      } catch (e) {
        toast.error("Error occurred");
      }
    }
  };
  const handleClick = async () => {
    if (typeof window.ethereum == "undefined") {
      toast.error("Metamask is not installed!!!");
    } else {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log(provider);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Connected account:", accounts[0]);
        setWallet(accounts[0]);
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/orders/rewardedOrders"
        );
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h2
        style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}
      >
        Rewards
      </h2>
      {wallet ? (
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
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Total</th>
            <th>Wallet Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.customer}</td>
              <td>Rs. {order.total}</td>
              <td>{order.walletAddress}</td>
              <td>
                <button
                  style={{
                    backgroundColor: "#0f9675",
                    color: "#fff",
                    border: "none",
                    padding: "6px 10px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    handleToken(order._id, order.walletAddress, order.total)
                  }
                >
                  Reward Tokens
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default RewardData;
