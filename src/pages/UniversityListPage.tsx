import { useEffect, useState } from "react";
import type { University } from "../api/universityApi";
import { fetchUniversities } from "../api/universityApi";
import { UniversityItem } from "../components/UniversityItem";
import { SearchInput } from "../components/SearchInput";
import { Button } from "../components/Button";
import { Pagination } from "../components/Pagination";
import styles from "./UniversityListPage.module.css";

export function UniversityListPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [page, setPage] = useState(0);
  const [limit] = useState(10);

  const [searchParams, setSearchParams] = useState<{
    name?: string;
    country?: string;
  }>({});

  useEffect(() => {
    setPage(0);
  }, [searchParams]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchUniversities({
          name: searchParams.name,
          country: searchParams.country,
          limit,
          offset: page * limit,
        });
        setUniversities(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch universities");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [searchParams, page]);

  const handleSearch = () => {
    setSearchParams({
      name: name || undefined,
      country: country || undefined,
    });
  };
  
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>University Search</h2>

      <div className={styles.searchBar}>
        <SearchInput
          value={name}
          placeholder="University name"
          onChange={setName}
        />
        <SearchInput
          value={country}
          placeholder="Country"
          onChange={setCountry}
        />
        <Button title="Search" disabled={loading} onClick={handleSearch} />
      </div>

      {/* 🔹 Loading / Error / Empty States */}
      {loading && <p className={styles.loading}>Loading universities...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}
      {!loading && !error && universities.length === 0 && (
        <p className={styles.empty}>No universities found</p>
      )}

      {/* 🔹 Results List */}
      {!loading && !error && universities.length > 0 && (
        <div className={styles.results}>
          <ul className={styles.list}>
            {universities.map((uni) => (
              <UniversityItem key={uni.name} university={uni} />
            ))}
          </ul>

          <div className={styles.paginationWrapper}>
            <Pagination
              page={page}
              hasNext={universities.length === limit}
              onPrev={() => setPage((prev) => Math.max(prev - 1, 0))}
              onNext={() => setPage((prev) => prev + 1)}
            />
          </div>
        </div>
      )}
    </section>
  );
}
