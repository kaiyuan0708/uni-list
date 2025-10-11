import type { University } from "../api/universityApi";

interface UniversityItemProps {
  university: University;
}

export function UniversityItem({ university }: UniversityItemProps) {
  return (
    <li>
      <p>name: {university.name}</p>
      <p>country: {university.country}</p>
      {university.web_pages.map((web) => (
        <p>
          <a href={web} target="_blank" rel="noopener noreferrer">
            Website
          </a>
        </p>
      ))}
    </li>
  );
}
