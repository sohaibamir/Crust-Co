import styles from "../styles/Add.module.css";
import PropTypes from "prop-types";

const AddButton = ({ setClose }) => {
  return (
    <button className={styles.mainAddButton} onClick={() => setClose(false)}>
      Add New Product
    </button>
  );
};

AddButton.propTypes = {
  setClose: PropTypes.func.isRequired,
};

export default AddButton;
