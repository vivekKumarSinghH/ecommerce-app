import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import orderSuccessImage from "../../assets/order-success.png";
const OrderPlaced: FC = () => {
  const navigate = useNavigate();

  const handleExploreCategories = () => {
    navigate("/categories");
  };

  return (
    <div className={styles.container}>
      <div className={styles.illustrationContainer}>
        <img
          src={orderSuccessImage}
          alt="Order Success"
          className={styles.illustration}
        />
      </div>

      <div className={styles.contentContainer}>
        <h1 className={styles.title}>Order Placed Successfully</h1>
        <p className={styles.subtitle}>
          You will recieve an email confirmation
        </p>

        <div className={styles.actionContainer}>
          <p className={styles.continueText}>Continue Shopping</p>
          <button
            className={styles.exploreButton}
            onClick={handleExploreCategories}
          >
            Explore Categories
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPlaced;
