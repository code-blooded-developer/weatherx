import styles from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.headerContainer}>
      <h1 className={styles.title}>WeatherX</h1>
    </header>
  );
};

export default Header;
