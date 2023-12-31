import styles from "../../styles/Dashboard.module.css";
import PropTypes from "prop-types";

const Sidebar = ({ selectedOption, onOptionSelect }) => {
  return (
    <div className={styles.sidebar}>
      <h2 style={{ display: "flex", alignItems: "center", margin: "0 0 10px" }}>
        Admin Dashboard
      </h2>
      <ul>
        <li>
          <button
            className={selectedOption === "users" ? "selected" : ""}
            onClick={() => onOptionSelect("users")}
          >
            {"Users"}
          </button>
        </li>
        <li>
          <button
            className={selectedOption === "products" ? "selected" : ""}
            onClick={() => onOptionSelect("products")}
          ></button>
          {"Products"}
        </li>
        <li>
          <button
            className={selectedOption === "orders" ? "selected" : ""}
            onClick={() => onOptionSelect("orders")}
          ></button>
          {"Orders"}
        </li>
        <li>
          <button
            className={selectedOption === "rewards" ? "selected" : ""}
            onClick={() => onOptionSelect("rewards")}
          ></button>
          {"Rewards"}
        </li>
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  selectedOption: PropTypes.string,
  onOptionSelect: PropTypes.func,
};

export default Sidebar;
