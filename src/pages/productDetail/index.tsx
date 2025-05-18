import { useState, type FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Add, Remove } from "@mui/icons-material";
import styles from "./index.module.scss";
import Header from "../../components/header";

const ProductDetail: FC = () => {
  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(2);

  const product = {
    id: productId,
    title: "Men's Harrington Jacket",
    price: 148,
    rating: 4.0,
    reviews: 230,
    description:
      "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    image: "/green-jacket.png",
    category: category,
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToBag = () => {
    // This will be implemented with Redux later
    console.log(`Added ${quantity} of ${product.title} to cart`);
    navigate(`/categories/${category}`);
  };

  return (
    <>
      <Header title={category} showBackButton={true} cartItemCount={2} />

      <div className={styles.content}>
        <div className={styles.productImageContainer}>
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            className={styles.productImage}
          />
        </div>

        <h1 className={styles.productTitle}>{product.title}</h1>

        <div className={styles.priceContainer}>
          <span className={styles.price}>${product.price}</span>
        </div>

        <div className={styles.ratingContainer}>
          <div className={styles.rating}>
            <span className={styles.ratingValue}>{product.rating}</span>
            <div className={styles.stars}>
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`${styles.star} ${
                    index < Math.floor(product.rating) ? styles.filled : ""
                  } ${
                    index === Math.floor(product.rating) &&
                    product.rating % 1 > 0
                      ? styles.halfFilled
                      : ""
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className={styles.reviewCount}>({product.reviews})</span>
          </div>
        </div>

        <p className={styles.description}>{product.description}</p>

        <div className={styles.actionsContainer}>
          <div className={styles.quantitySelector}>
            <span className={styles.quantityLabel}>Quantity</span>
            <div className={styles.quantityControls}>
              <button
                className={`${styles.quantityButton} ${styles.decreaseButton}`}
                onClick={handleDecreaseQuantity}
                disabled={quantity <= 1}
              >
                <Remove />
              </button>
              <span className={styles.quantityValue}>{quantity}</span>
              <button
                className={`${styles.quantityButton} ${styles.increaseButton}`}
                onClick={handleIncreaseQuantity}
              >
                <Add />
              </button>
            </div>
          </div>

          <button className={styles.addToBagButton} onClick={handleAddToBag}>
            <span className={styles.totalPrice}>
              ${(product.price * quantity).toFixed(0)}
            </span>
            <span className={styles.buttonText}>Add to Bag</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
