import { useEffect, useState } from "react";
import type { University } from "../api/universityApi";
import { fetchUniversities } from "../api/universityApi";
import { UniversityItem } from "../components/UniversityItem";
import { SearchInput } from "../components/SearchInput";
import { Button } from "../components/Button";

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
    // Only fetch when we have searchParams (after user clicks Search)
    if (!searchParams.name && !searchParams.country) return;

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

  return (
    <div>
      <p>University List Page</p>
      <SearchInput value={name} placeholder="Uni name" onChange={setName} />
      <SearchInput
        value={country}
        placeholder="Country"
        onChange={setCountry}
      />
      <Button
        title="Search"
        disabled={loading || (!name && !country)}
        onClick={() => {
          setSearchParams({
            name: name || undefined,
            country: country || undefined,
          });
        }}
      />
      <Button
        title="Reset"
        disabled={!universities.length && !name && !country}
        onClick={() => {
          setName("");
          setCountry("");
          setUniversities([]);
          setSearchParams({});
          setPage(0);
        }}
      />
      {loading && <p>Loading universities...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && universities.length === 0 && (
        <p>No universities found</p>
      )}
      {!loading && !error && universities.length > 0 && (
        <div>
          <ul>
            {universities.map((uni) => (
              <UniversityItem key={uni.name} university={uni} />
            ))}

            <div>
              <Button
                title="Previous"
                disabled={page === 0}
                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              />
              <Button
                title="Next"
                disabled={universities.length < limit} // disable next if less than limit
                onClick={() => setPage((prev) => prev + 1)}
              />
            </div>
          </ul>
        </div>
      )}
    </div>
  );
}
