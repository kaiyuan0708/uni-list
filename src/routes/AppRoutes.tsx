import { Routes, Route } from "react-router";
import { UniversityListPage } from "../pages/UniversityListPage";
import { FavoritesPage } from "../pages/FavoritesPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UniversityListPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
    </Routes>
  );
};
