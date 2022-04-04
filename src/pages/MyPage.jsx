import styles from "./mypage.module.css";
import axios from "axios";
import { roleState } from "../recoil/role/atom";
import { userState } from "../recoil/user/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyPage() {
  const [role, setRole] = useRecoilState(roleState);
  const userId = useRecoilValue(userState);

  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");

  async function getUser() {
    await axios
      .get(`https://k4backend.osuka.dev/users/${userId}`)
      .then((res) => {
        setRole(res.data.role);
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

  return (
    <div className={styles.mypageInfo}>
      <h1>Welcome {username}!</h1>

      <h2>Personal info</h2>
      <p>
        Name: {firstname} {lastname}
      </p>
      <p>E-mail: {email}</p>
      <p>Phone: {phone}</p>

      <h2>Address</h2>
      <p>
        {street} {number}
      </p>
      <p>
        {zipcode} {city}
      </p>

      <Link to="/updateprofile" className={styles.updateInfoLink}>
        <p className={styles.updateP}>Change your personal info</p>
      </Link>
    </div>
  );
}

export default MyPage;

/* 
{
                id:X,
                email:'sample@gmail.com',
                username:'*namn*',
                password:'*****',
                (role: "user",)
                name:{
                    firstname:'*namn*',
                    lastname:'*namn*'
                },
                address:{
                    city:'Stad',
                    street:'Gata',
                    number: X,
                    zipcode:'XXX-XX',
                },
                phone:'070-XXXXXXX'
            } */
