"use client";

import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Add, Remove } from "@mui/icons-material";
import styles from "./index.module.scss";
import Header from "../../components/header";

const mockCartItems = [
  {
    id: 5,
    title: "Men's Harrington Jacket",
    price: 296.0,
    image: "/green-jacket.png",
    quantity: 2,
    category: "hoodies",
  },
  {
    id: 6,
    title: "Men's Coaches Jacket",
    price: 52.0,
    image: "/black-hoodie.png",
    quantity: 1,
    category: "hoodies",
  },
];

const Cart: FC = () => {
  const navigate = useNavigate();

  // For demonstration, we'll use a flag to toggle between empty and filled cart
  // In a real app, this would come from Redux
  const isCartEmpty = false; // Change to true to see empty cart

  const handleExploreCategories = () => {
    navigate("/categories");
  };

  const handlePlaceOrder = () => {
    // In a real app, this would dispatch an action to clear the cart
    navigate("/order-placed");
  };

  const handleRemoveAll = () => {
    console.log("Remove all items");
  };

  const handleRemoveItem = (id: number) => {
    // In a real app, this would dispatch an action to remove the item
    console.log(`Remove item ${id}`);
  };

  const handleIncreaseQuantity = (id: number) => {
    // In a real app, this would dispatch an action to increase quantity
    console.log(`Increase quantity for item ${id}`);
  };

  const handleDecreaseQuantity = (id: number) => {
    // In a real app, this would dispatch an action to decrease quantity
    console.log(`Decrease quantity for item ${id}`);
  };

  // Calculate subtotal
  const subtotal = mockCartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate tax (10%)
  const tax = subtotal * 0.1;

  // Calculate total
  const total = subtotal + tax;

  // Empty Cart View
  if (isCartEmpty) {
    return (
      <div className={styles.container}>
        <Header title="Cart" showBackButton={true} />

        <div className={styles.emptyCartContainer}>
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

  // Cart with Items View
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <Header title="Cart" showBackButton={true} />
        <button className={styles.removeAllButton} onClick={handleRemoveAll}>
          Remove All
        </button>
      </div>

      <div className={styles.cartItemsContainer}>
        <div className={styles.cartItems}>
          {mockCartItems.map((item) => (
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
            <span className={styles.summaryValue}>${subtotal.toFixed(2)}</span>
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
