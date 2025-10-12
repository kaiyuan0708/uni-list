import { useState, useMemo } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { Pagination } from "../components/Pagination";
import { FavoritesItem } from "../components/FavoritesItem";
import styles from "./FavoritesPage.module.css";

const ITEMS_PER_PAGE = 10;

export function FavoritesPage() {
  const { favorites, removeFavorite, updateRemark } = useFavorites();
  const [page, setPage] = useState(0);

  const paginated = useMemo(() => {
    const start = page * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return favorites.slice(start, end);
  }, [favorites, page]);

  const hasNext = (page + 1) * ITEMS_PER_PAGE < favorites.length;

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Favorites Page</h2>

      {favorites.length === 0 ? (
        <p className={styles.empty}>No favorites yet.</p>
      ) : (
        <>
          <ul className={styles.list}>
            {paginated.map((fav) => (
              <FavoritesItem
                key={fav.name}
                name={fav.name}
                country={fav.country}
                remark={fav.remark}
                added_time={fav.added_time}
                onRemove={removeFavorite}
                onSaveRemark={updateRemark}
              />
            ))}
          </ul>

          <div className={styles.paginationWrapper}>
            <Pagination
              page={page}
              hasNext={hasNext}
              onPrev={() => setPage((p) => Math.max(0, p - 1))}
              onNext={() => setPage((p) => (hasNext ? p + 1 : p))}
            />
          </div>
        </>
      )}
    </div>
  );
}
