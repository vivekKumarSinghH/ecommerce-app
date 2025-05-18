import { useEffect, type FC } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import Header from "../../components/header";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchCategories } from "../../redux/reducers/categoriesReducer";

const Categories: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    items: categories,
    loading,
    error,
  } = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/categories/${categoryName}`);
  };

  return (
    <>
      <Header />

      <div className={styles.content}>
        <h1 className={styles.title}>Shop by Categories</h1>

        {loading && <div className={styles.loading}>Loading categories...</div>}

        {error && <div className={styles.error}>Error: {error}</div>}

        {!loading && !error && (
          <div className={styles.categoriesList}>
            {categories.map((category, index) => (
              <div
                key={index}
                className={styles.categoryCard}
                onClick={() => handleCategoryClick(category)}
              >
                <div className={styles.categoryName}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Categories;
