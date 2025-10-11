import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface Favorite {
  name: string;
  country: string;
  remark?: string;
  added_time: number;
}

interface FavoritesContextType {
  favorites: Favorite[];
  addFavorite: (fav: Omit<Favorite, "added_time">) => void;
  removeFavorite: (name: string) => void;
  updateRemark: (name: string, remark: string) => void;
}

// 🔹 Create context
const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

// 🔹 Provider component
export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Favorite[]>(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Persist to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (fav: Omit<Favorite, "added_time">) => {
    setFavorites((prev) => {
      const exists = prev.find((f) => f.name === fav.name);
      if (exists) return prev;
      return [...prev, { ...fav, added_time: Date.now() }];
    });
  };
  

  const removeFavorite = (name: string) => {
    setFavorites((prev) => prev.filter((f) => f.name !== name));
  };

  const updateRemark = (name: string, remark: string) => {
    setFavorites((prev) =>
      prev.map((f) => (f.name === name ? { ...f, remark } : f))
    );
  };

  const value = { favorites, addFavorite, removeFavorite, updateRemark };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

// 🔹 Hook to consume context
export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error("useFavorites must be used within FavoritesProvider ");
  return context;
};

// 🔹 Optional default export to help HMR
export default FavoritesProvider;
