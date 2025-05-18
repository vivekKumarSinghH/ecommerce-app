import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Add, Remove, ShoppingCart } from "@mui/icons-material";
import styles from "./index.module.scss";
import Header from "../../components/header";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  removeFromCart,
  updateQuantity,
  removeAll,
  clearCart,
} from "../../redux/reducers/cartReducer";

const Cart: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { items: cartItems, totalAmount } = useAppSelector(
    (state) => state.cart
  );

  const isCartEmpty = cartItems.length === 0;

  const handleExploreCategories = () => {
    navigate("/categories");
  };

  const handlePlaceOrder = () => {
    dispatch(clearCart());
    navigate("/order-placed");
  };

  const handleRemoveAll = () => {
    dispatch(removeAll());
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleIncreaseQuantity = (id: number) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      dispatch(updateQuantity({ id, quantity: item.quantity + 1 }));
    }
  };

  const handleDecreaseQuantity = (id: number) => {
    const item = cartItems.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      dispatch(updateQuantity({ id, quantity: item.quantity - 1 }));
    }
  };

  const tax = totalAmount * 0.1;

  const total = totalAmount + tax;

  if (isCartEmpty) {
    return (
      <div className={styles.container}>
        <Header title="Cart" showBackButton={true} hideCartIcon={true} />

        <div className={styles.emptyCartContainer}>
          <div className={styles.emptyCartIcon}>
            <ShoppingCart fontSize="large" />
          </div>
          <h2 className={styles.emptyCartTitle}>Your cart is empty</h2>
          <p className={styles.emptyCartText}>
            Looks like you haven't added any items to your cart yet.
          </p>
          <button
            className={styles.exploreCategoriesButton}
            onClick={handleExploreCategories}
          >
            Explore Categories
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <Header title="Cart" showBackButton={true} hideCartIcon={true} />
        <div className={styles.removeAllButtonContainer}>
          <button onClick={handleRemoveAll}>Remove All</button>
        </div>
      </div>

      <div className={styles.cartItemsContainer}>
        <div className={styles.cartItems}>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.itemImageContainer}>
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className={styles.itemImage}
                />
              </div>
              <div className={styles.itemInfo}>
                <div className={styles.itemDetails}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <span className={styles.itemPrice}>
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                <div className={styles.itemActions}>
                  <button
                    className={`${styles.quantityButton} ${styles.addButton}`}
                    onClick={() => handleIncreaseQuantity(item.id)}
                  >
                    <Add fontSize="small" />
                  </button>
                  <span className={styles.quantityValue}>{item.quantity}</span>
                  <button
                    className={`${styles.quantityButton} ${styles.removeButton}`}
                    onClick={() => handleDecreaseQuantity(item.id)}
                  >
                    <Remove fontSize="small" />
                  </button>
                  <button
                    className={styles.removeItemButton}
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.footerContainer}>
        <div className={styles.orderSummary}>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Subtotal</span>
            <span className={styles.summaryValue}>
              ${totalAmount.toFixed(2)}
            </span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Tax (10%)</span>
            <span className={styles.summaryValue}>${tax.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Total</span>
            <span className={styles.summaryValue}>${total.toFixed(2)}</span>
          </div>
        </div>

        <button className={styles.placeOrderButton} onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
