import { BrowserRouter as Router, Routes, Route } from "react-router"
import { Header } from "./components/Header"
import { UniversityListPage } from "./pages/UniversityListPage"
import { FavoritesPage } from "./pages/FavoritesPage"

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<UniversityListPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
