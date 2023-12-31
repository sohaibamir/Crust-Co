import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import "../styles/CheckoutForm.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../redux/cartSlice";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState(user.currentUser.user.name);
  const [address, setAddress] = useState("");
  const total = cart.total;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:4000/orders/", {
      customer: name,
      userId: user.currentUser.user._id,
      address,
      walletAddress: user.currentUser.user.walletAddress,
      total,
      status: 0,
      method: 1,
    });
    dispatch(reset());

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/orders/${res.data._id}`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <div className="checkoutContainer">
      <form id="payment-form" onSubmit={handleSubmit}>
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "1rem 0",
          }}
        >
          Shipping Details
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "450px",
            margin: "auto",
          }}
        >
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <label>Address</label>
          <input
            placeholder="Karachi"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "1rem 0",
          }}
        >
          Billing Details
        </h2>
        <PaymentElement id="payment-element" />
        <button
          disabled={isProcessing || !stripe || !elements}
          className="payNow"
        >
          <span id="button-text">
            {isProcessing ? "Processing ... " : "Pay now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div className="payment-message">{message}</div>}
      </form>
    </div>
  );
}
