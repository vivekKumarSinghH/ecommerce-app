import type { FC } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./index.module.scss"
import Header from "../../components/header"

const Categories: FC = () => {
  const navigate = useNavigate()

  const categories = [
    { id: 1, name: "Hoodies", image: "/cozy-hoodie.png" },
    { id: 2, name: "Accessories", image: "/stylish-sunglasses.png" },
    { id: 3, name: "Shorts", image: "/various-shorts.png" },
    { id: 4, name: "Shoes", image: "/diverse-sneaker-collection.png" },
    { id: 5, name: "Bags", image: "/placeholder-384q6.png" },
  ]

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/categories/${categoryName.toLowerCase()}`)
  }

  return (
    <>
      <Header cartItemCount={2} />

      <div className={styles.content}>
        <h1 className={styles.title}>Shop by Categories</h1>

        <div className={styles.categoriesList}>
          {categories.map((category) => (
            <div key={category.id} className={styles.categoryCard} onClick={() => handleCategoryClick(category.name)}>
              <div className={styles.categoryImageContainer}>
                <img src={ "/vite.svg"} alt={category.name} className={styles.categoryImage} />
              </div>
              <div className={styles.categoryName}>{category.name}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Categories
