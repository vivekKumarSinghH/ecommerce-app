import type { FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import Header from "../../components/header";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

const CategoryProducts: FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  const products: Product[] = [
    {
      id: 1,
      title: "Men's Fleece Pullover Hoodie",
      price: 100.0,
      image: "/green-hoodie.png",
    },
    {
      id: 2,
      title: "Fleece Pullover Skate Hoodie",
      price: 150.97,
      image: "/black-hoodie.png",
    },
    {
      id: 3,
      title: "Fleece Skate Hoodie",
      price: 110.0,
      image: "/yellow-hoodie.png",
    },
    {
      id: 4,
      title: "Men's Ice-Dye Pullover Hoodie",
      price: 128.97,
      image: "/tie-dye-hoodie.png",
    },
    {
      id: 5,
      title: "Patterned Pullover Hoodie",
      price: 115.5,
      image: "/patterned-hoodie.png",
    },
    {
      id: 6,
      title: "Light Gray Pullover Hoodie",
      price: 95.99,
      image: "/light-gray-hoodie.png",
    },
  ];

  const handleProductClick = (productId: number) => {
    navigate(`/categories/${category}/${productId}`);
  };

  return (
    <>
      <Header showBackButton={true} cartItemCount={2} />

      <div className={styles.content}>
        <h1 className={styles.categoryTitle}>
          {category && category.charAt(0).toUpperCase() + category.slice(1)}{" "}
          <span className={styles.itemCount}>(240)</span>
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
      </div>
    </>
  );
};

export default CategoryProducts;
