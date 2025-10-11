export interface University {
  name: string;
  alpha_two_code: string;
  country: string;
  web_pages: string[];
  "state-province": string | null;
  domains: string[];
}

/**
 * Fetch universities from API
 * @param params Optional search parameters: { name?, country?, limit?, offset? }
 */
export async function fetchUniversities(params?: {
  name?: string;
  country?: string;
  limit?: number;
  offset?: number;
}): Promise<University[]> {
  const query = new URLSearchParams();

  if (params?.name) query.append("name", params.name);
  if (params?.country) query.append("country", params.country);
  if (params?.limit) query.append("limit", params.limit.toString());
  if (params?.offset) query.append("offset", params.offset.toString());

  const url = query.toString()
    ? `http://universities.hipolabs.com/search?${query.toString()}`
    : "http://universities.hipolabs.com/search";

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch universities");
  }
  return response.json();
}
