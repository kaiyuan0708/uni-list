import { useEffect, useState } from "react";
import type { University } from "../api/universityApi";
import { fetchUniversities } from "../api/universityApi";
import { UniversityItem } from "../components/UniversityItem";
import { SearchInput } from "../components/SearchInput";
import { Button } from "../components/Button";
import { Pagination } from "../components/Pagination";

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

  const handleReset = () => {
    setName("");
    setCountry("");
    setUniversities([]);
    setSearchParams({});
    setPage(0);
  };

  return (
    <section style={{ padding: "16px" }}>
      <h2>University Search</h2>

      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
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
        <Button
          title="Reset"
          disabled={!universities.length && !name && !country}
          onClick={handleReset}
        />
      </div>

      {/* 🔹 Loading / Error / Empty States */}
      {loading && <p>Loading universities...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && !error && universities.length === 0 && (
        <p>No universities found</p>
      )}

      {/* 🔹 Results List */}
      {!loading && !error && universities.length > 0 && (
        <div>
          <ul style={{ padding: 0 }}>
            {universities.map((uni) => (
              <UniversityItem key={uni.name} university={uni} />
            ))}
          </ul>

          <Pagination
            page={page}
            hasNext={universities.length === limit}
            onPrev={() => setPage((prev) => Math.max(prev - 1, 0))}
            onNext={() => setPage((prev) => prev + 1)}
          />
        </div>
      )}
    </section>
  );
}
