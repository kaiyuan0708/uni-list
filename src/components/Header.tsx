import { Link } from "react-router";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>
          🎓 UniFinder
        </Link>
        <Link to="/favorites" className={styles.link}>
          Favorites⭐
        </Link>
      </nav>
    </header>
  );
}
