import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Categories from "./pages/categories"

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Categories />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
