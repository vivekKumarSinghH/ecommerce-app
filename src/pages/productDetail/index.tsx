import { useState, useEffect, type FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Add, Remove } from "@mui/icons-material";
import styles from "./index.module.scss";
import Header from "../../components/header";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchProductById } from "../../redux/reducers/productDetailReducer";

const ProductDetail: FC = () => {
  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [quantity, setQuantity] = useState(1);

  const {
    item: product,
    loading,
    error,
  } = useAppSelector((state) => state.product);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId]);

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToBag = () => {
    if (product && category) {
      navigate(`/categories/${category}`);
    }
  };

  const formatCategoryName = (name: string) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <>
      <Header
        title={category && formatCategoryName(category)}
        showBackButton={true}
        cartItemCount={2}
      />

      <div className={styles.content}>
        {loading && (
          <div className={styles.loading}>Loading product details...</div>
        )}

        {error && <div className={styles.error}>Error: {error}</div>}

        {!loading && !error && product && (
          <>
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
                <span className={styles.ratingValue}>4.0</span>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`${styles.star} ${
                        index < 4 ? styles.filled : ""
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className={styles.reviewCount}>(230)</span>
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

              <button
                className={styles.addToBagButton}
                onClick={handleAddToBag}
              >
                <span className={styles.totalPrice}>
                  ${(product.price * quantity).toFixed(0)}
                </span>
                <span className={styles.buttonText}>Add to Bag</span>
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
