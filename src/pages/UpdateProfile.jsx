import styles from "./updateUser.module.css";
import { userState } from "../recoil/user/atom";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UpdateProfile() {
  const navigate = useNavigate();

  const userId = useRecoilValue(userState);
  const [error, setError] = useState(<div></div>);
  const [modal, setModal] = useState(<div> </div>);

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

  async function getUser() {
    await axios
      .get(`https://k4backend.osuka.dev/users/${userId}`)
      .then((res) => {
        setUsername(res.data.username);
        setFirstname(res.data.name.firstname);
        setLastname(res.data.name.lastname);
        setEmail(res.data.email);
        setPhone(res.data.phone);
        setStreet(res.data.address.street);
        setNumber(res.data.address.number);
        setZipcode(res.data.address.zipcode);
        setCity(res.data.address.city);
      });
  }

  useEffect(() => {
    getUser();
  }, []);

  async function updateUser() {
    await axios({
      method: "put",
      url: `https://k4backend.osuka.dev/users/${userId}`,
      data: {
        email: email,
        username: username,
        password: password,
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
        console.log(res);
        setModal(
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <p>Your information was updated!</p>
              <button
                className={styles.modalButton}
                onClick={() => {
                  navigate("/mypage");
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
        <p>Only change the information you want to update.</p>
        <label>E-mail</label>
        <input
          type="email"
          placeholder={email}
          className={styles.input}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <label>Username</label>
        <input
          type="text"
          placeholder={username}
          className={styles.input}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
        <label>Password</label>
        <input
          type="password"
          className={styles.input}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>

        <label>First name</label>
        <input
          type="text"
          placeholder={firstname}
          className={styles.input}
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
        ></input>
        <label>Last name</label>
        <input
          type="text"
          placeholder={lastname}
          className={styles.input}
          onChange={(e) => {
            setLastname(e.target.value);
          }}
        ></input>

        <h2>Adress</h2>
        <div className={styles.streetAndNumber}>
          <div className={styles.street}>
            <label>Street</label>
            <input
              type="text"
              placeholder={street}
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
              placeholder={number}
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
              placeholder={zipcode}
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
              placeholder={city}
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
          placeholder={phone}
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
            updateUser();
          }}
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateProfile;
