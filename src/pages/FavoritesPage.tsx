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
    return favorites.slice(start, start + ITEMS_PER_PAGE);
  }, [favorites, page]);

  const hasNext = (page + 1) * ITEMS_PER_PAGE < favorites.length;

  if (page > 0 && paginated.length === 0) {
    setPage(0);
  }

  return (
    <main className={styles.page}>
      <h2 className={styles.title}>My Favorite Universities</h2>

      {favorites.length === 0 ? (
        <p className={styles.empty}>
          No favorites yet. Add some from the list!
        </p>
      ) : (
        <>
          <ul className={styles.list}>
            {paginated.map((fav) => (
              <FavoritesItem
                key={`${fav.name}-${fav.country}`}
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
              onNext={() => (hasNext ? setPage((p) => p + 1) : null)}
            />
          </div>
        </>
      )}
    </main>
  );
}
