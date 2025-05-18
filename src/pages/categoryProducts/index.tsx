"use client";

import { useEffect, type FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import Header from "../../components/header";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchProductsByCategory } from "../../redux/reducers/productsReducer";

const CategoryProducts: FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    items: products,
    loading,
    error,
  } = useAppSelector((state) => state.products);

  // Fetch products when component mounts or category changes
  useEffect(() => {
    if (category) {
      dispatch(fetchProductsByCategory(category));
    }
  }, [dispatch, category]);

  const handleProductClick = (productId: number) => {
    navigate(`/categories/${category}/${productId}`);
  };

  // Format category name for display (capitalize first letter)
  const formatCategoryName = (name: string) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <>
      <Header showBackButton={true} cartItemCount={2} />

      <div className={styles.content}>
        {loading && <div className={styles.loading}>Loading products...</div>}

        {error && <div className={styles.error}>Error: {error}</div>}

        {!loading && !error && (
          <>
            <h1 className={styles.categoryTitle}>
              {category && formatCategoryName(category)}{" "}
              <span className={styles.itemCount}>({products.length})</span>
            </h1>

            <div className={styles.productGrid}>
              {products.map((product) => (
                <div
                  key={product.id}
                  className={styles.productCard}
                  onClick={() => handleProductClick(product.id)}
                >
                  <div className={styles.productImageContainer}>
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      className={styles.productImage}
                    />
                  </div>
                  <div className={styles.productInfo}>
                    <h3 className={styles.productTitle}>{product.title}</h3>
                    <p className={styles.productPrice}>
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CategoryProducts;
