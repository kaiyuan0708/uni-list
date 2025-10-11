import { Link } from "react-router";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <h1 className={styles.logo}>🎓 UniFinder</h1>
        <div className={styles.links}>
          <Link to="/" className={styles.link}>
            Universities
          </Link>
          <Link to="/favorites" className={styles.link}>
            Favorites
          </Link>
        </div>
      </nav>
    </header>
  );
}
