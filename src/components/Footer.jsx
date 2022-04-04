import styles from "./footer.module.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <Link to="/admin-page" className={styles.adminLink}>
        Admin Page
      </Link>

      <img src={"/logo.png"} alt="Logo" className={styles.footerLogo}></img>
    </footer>
  );
}

export default Footer;
