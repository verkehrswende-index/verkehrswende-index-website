import styles from "./style.module.scss";

export default function Loading() {
  return (
    <div className="loading">
      <p>Lade Daten...</p>
      <ul className={styles["loading-wheel"]}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}
