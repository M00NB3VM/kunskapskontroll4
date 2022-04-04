import styles from "./register.module.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  const [modal, setModal] = useState(<div> </div>);
  const [error, setError] = useState(<div></div>);

  function checkValues() {
    if (
      email.length > 0 &&
      username.length > 0 &&
      password.length > 0 &&
      firstname.length > 0 &&
      lastname.length > 0 &&
      street.length > 0 &&
      number.length > 0 &&
      zipcode.length > 0 &&
      city.length > 0 &&
      phone.length > 0
    ) {
      handleRegister();
    }
  }

  async function handleRegister() {
    await axios({
      method: "post",
      url: "https://k4backend.osuka.dev/users",
      data: {
        email: email,
        username: username,
        password: password,
        role: "user",
        name: {
          firstname: firstname,
          lastname: lastname,
        },
        address: {
          city: city,
          street: street,
          number: number,
          zipcode: zipcode,
        },
        phone: phone,
      },
    })
      .catch((err) => {
        setError(<p>Something went wrong, please try again.</p>);
      })
      .then((res) => {
        setModal(
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <p>Registration successful, welcome!</p>
              <p>Log in to get access to my page.</p>
              <button
                className={styles.modalButton}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Close
              </button>
            </div>
          </div>
        );
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div>
      {modal}
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>User info</h2>
        <label>E-mail</label>
        <input
          type="email"
          required
          className={styles.input}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <label>Username</label>
        <input
          type="text"
          required
          className={styles.input}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
        <label>Password</label>
        <input
          type="password"
          required
          className={styles.input}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>

        <label>First name</label>
        <input
          type="text"
          required
          className={styles.input}
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
        ></input>
        <label>Last name</label>
        <input
          type="text"
          required
          className={styles.input}
          onChange={(e) => {
            setLastname(e.target.value);
          }}
        ></input>

        <h2>Address</h2>
        <div className={styles.streetAndNumber}>
          <div className={styles.street}>
            <label>Street</label>
            <input
              type="text"
              required
              className={styles.input}
              onChange={(e) => {
                setStreet(e.target.value);
              }}
            ></input>
          </div>
          <div className={styles.number}>
            <label>Number</label>
            <input
              type="text"
              required
              className={styles.input}
              onChange={(e) => {
                setNumber(e.target.value);
              }}
            ></input>
          </div>
        </div>

        <div className={styles.zipAndCity}>
          <div className={styles.zipcode}>
            <label>Zipcode</label>
            <input
              type="text"
              required
              className={styles.input}
              onChange={(e) => {
                setZipcode(e.target.value);
              }}
            ></input>
          </div>
          <div className={styles.city}>
            <label>City</label>
            <input
              type="text"
              required
              className={styles.input}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            ></input>
          </div>
        </div>

        <label>Phone</label>
        <input
          type="text"
          required
          className={styles.input}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        ></input>

        {error}
        <button
          type="submit"
          className={styles.submitButton}
          onClick={() => {
            checkValues();
          }}
        >
          Join
        </button>
      </form>

      <p className={styles.required}>* All fields are required.</p>
    </div>
  );
}

export default Register;
