import styles from "./login.module.css";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { tokenState } from "../recoil/token/atom";
import { useNavigate } from "react-router-dom";
import { userState } from "../recoil/user/atom";

function Login() {
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(tokenState);
  const [user, setUser] = useRecoilState(userState);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin() {
    await axios
      .post("https://k4backend.osuka.dev/auth/login", {
        username: username,
        password: password,
      })
      .catch((err) => {
        setErrorMessage(
          <p className={styles.error}>Wrong username or password</p>
        );
      })
      .then((res) => {
        setUser(res.data.userId);
        setToken(res.data.token);
        navigate("/mypage");
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className={styles.input}
          required
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
        <label>Password</label>
        <input
          type="password"
          className={styles.input}
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        {errorMessage}
        <button
          className={styles.loginButton}
          type="submit"
          onClick={handleLogin}
        >
          Login
        </button>
      </form>

      <div className={styles.register}>
        <Link to="/register" className={styles.registerLink}>
          Not a member? Sign up here
        </Link>
      </div>
    </div>
  );
}

export default Login;

/*User: johnd
Pwd: m38rmF$ */
