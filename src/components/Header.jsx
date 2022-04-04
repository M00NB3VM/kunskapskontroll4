import react from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.css";
import { cartState } from "../recoil/cart/atom";
import { tokenState } from "../recoil/token/atom";
import { userState } from "../recoil/user/atom";
import { roleState } from "../recoil/role/atom";
import { useRecoilValue, useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

function Header() {
  const cart = useRecoilValue(cartState);
  const [token, setToken] = useRecoilState(tokenState);
  const [user, setUser] = useRecoilState(userState);
  const [role, setRole] = useRecoilState(roleState);
  const navigate = useNavigate();

  function loginClick() {
    if (!token) {
      navigate("/login");
    } else {
      setToken("");
      setUser("");
      setRole("");
      navigate("/login");
    }
  }

  function myPageClick() {
    if (!token) {
      navigate("/login");
    } else {
      navigate("/mypage");
    }
  }

  return (
    <header>
      <div className={styles.nav}>
        <Link to="/">
          <img
            src={"/logo.png"}
            alt="Superfancy logo"
            className={styles.headerLogo}
          ></img>
        </Link>

        <div className={styles.loginLink} onClick={() => loginClick()}>
          {!token ? (
            <p className={styles.login}>Login / Sign up</p>
          ) : (
            <p className={styles.logout}>Log out</p>
          )}
        </div>

        <div onClick={() => myPageClick()}>
          {!token ? (
            <img
              className={styles.myPageIcon}
              src={"/person-icon-logged-out.png"}
              alt="My page"
            ></img>
          ) : (
            <img
              className={styles.myPageIcon}
              src={"/person-icon-logged-in.png"}
              alt="My page"
            ></img>
          )}
        </div>

        <Link to="/cart">
          {cart.length === 0 ? (
            <img className={styles.cart} alt="Cart" src={"/cart-empty.png"} />
          ) : (
            <img className={styles.cart} alt="Cart" src={"/cart-filled.png"} />
          )}
        </Link>
      </div>

      <ul className={styles.menu}>
        <li>
          <Link to="/products" className={styles.allLink}>
            All products
          </Link>
        </li>
        <li>
          <Link to="/products/women" className={styles.menuLink}>
            Women
          </Link>
        </li>

        <li>
          <Link to="/products/men" className={styles.menuLink}>
            Men
          </Link>
        </li>
        <li>
          <Link to="/products/jewelery" className={styles.menuLink}>
            Jewelery
          </Link>
        </li>
        <li>
          <Link to="/products/electronics" className={styles.menuLink}>
            Electronics
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
