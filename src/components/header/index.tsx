import type { FC } from "react"
import { useNavigate } from "react-router-dom"
import { ShoppingCart, ArrowBack } from "@mui/icons-material"
import styles from "./index.module.scss"

interface HeaderProps {
  title?: string
  showBackButton?: boolean
  cartItemCount?: number
  onCartClick?: () => void
}

const Header: FC<HeaderProps> = ({ title, showBackButton = false, cartItemCount = 0, onCartClick }) => {
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate(-1)
  }

  const handleCartClick = () => {
    if (onCartClick) {
      onCartClick()
    } else {
      navigate("/cart")
    }
  }

  return (
    <div className={styles.header}>
      <div className={styles.leftSection}>
        {showBackButton && (
          <button className={styles.backButton} onClick={handleBackClick}>
            <ArrowBack />
          </button>
        )}
        {title && <h2 className={styles.title}>{title}</h2>}
      </div>

      <div className={styles.rightSection}>
        <div className={styles.cartIcon} onClick={handleCartClick}>
          <ShoppingCart />
          {cartItemCount > 0 && <span className={styles.cartBadge}>{cartItemCount}</span>}
        </div>
      </div>
    </div>
  )
}

export default Header
