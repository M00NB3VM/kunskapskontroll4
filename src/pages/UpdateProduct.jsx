import styles from "./updateProduct.module.css";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { productState } from "../recoil/singleProduct/atom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UpdateProduct() {
  const navigate = useNavigate();
  const product = useRecoilValue(productState);
  const [error, setError] = useState(<div></div>);
  const [modal, setModal] = useState(<div> </div>);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    getProduct();
  }, []);

  async function getProduct() {
    await axios
      .get(`https://k4backend.osuka.dev/products/${product.id}`)
      .then((res) => {
        setTitle(res.data.title);
        setPrice(res.data.price);
        setDescription(res.data.description);
        setImage(res.data.image);
        setCategory(res.data.category);
      });
  }

  async function updateProduct() {
    await axios({
      method: "put",
      url: `https://k4backend.osuka.dev/products/${product.id}`,
      data: {
        title: title,
        price: price,
        description: description,
        image: image,
        category: category,
      },
    }).then((res) => {
      console.log(res);
      setModal(
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>Product was updated!</p>
            <button
              className={styles.modalButton}
              onClick={() => {
                navigate("/admin-page");
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
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Title</label>
        <input
          className={styles.input}
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>

        <label>Price</label>
        <input
          className={styles.input}
          type="text"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        ></input>

        <label>Description</label>
        <input
          className={styles.input}
          type="text"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></input>

        <label>Image</label>
        <input
          className={styles.input}
          type="text"
          onChange={(e) => {
            setImage(e.target.value);
          }}
        ></input>

        <label>Category</label>
        <input
          className={styles.input}
          type="text"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        ></input>

        <button
          className={styles.submitButton}
          type="submit"
          onClick={() => {
            updateProduct();
          }}
        >
          Update
        </button>
        {error}
      </form>
    </div>
  );
}

export default UpdateProduct;
