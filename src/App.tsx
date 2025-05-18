import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Categories from "./pages/categories";
import CategoryProducts from "./pages/categoryProducts";
import ProductDetail from "./pages/productDetail";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Categories />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:category" element={<CategoryProducts />} />
          <Route
            path="/categories/:category/:productId"
            element={<ProductDetail />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
