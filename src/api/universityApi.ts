export interface University {
  name: string;
  alpha_two_code: string;
  country: string;
  web_pages: string[];
  "state-province": string | null;
  domains: string[];
}

export interface UniversityQueryParams {
  name?: string;
  country?: string;
  limit?: number;
  offset?: number;
}

const BASE_URL = "http://universities.hipolabs.com/search";

/**
 * Fetch a list of universities with optional search filters
 * @param params Query parameters for name, country, limit, offset
 * @returns A promise resolving to an array of universities
 */
export async function fetchUniversities(
  params?: UniversityQueryParams
): Promise<University[]> {
  try {
    const query = new URLSearchParams();

    if (params) {
      const { name, country, limit, offset } = params;

      if (name) query.append("name", name);
      if (country) query.append("country", country);
      if (limit) query.append("limit", limit.toString());
      if (offset) query.append("offset", offset.toString());
    }

    const url = query.size > 0 ? `${BASE_URL}?${query}` : BASE_URL;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch universities");
    }
    const data = (await response.json()) as University[];
    return data;
  } catch (error) {
    throw new Error("Unexpected error fetching universities");
  }
}
