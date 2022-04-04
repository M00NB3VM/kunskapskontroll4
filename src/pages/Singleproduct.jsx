import { useRecoilValue, useRecoilState } from "recoil";
import { productsState } from "../recoil/products/atom";
import axios from "axios";
import { useEffect } from "react";
import styles from "./singleProduct.module.css";
import { useParams } from "react-router-dom";
import { cartState } from "../recoil/cart/atom";

function SingleProduct() {
  const params = useParams();
  const products = useRecoilValue(productsState);
  const product = products.find((item) => item.id === parseInt(params.id));

  const [cart, setCart] = useRecoilState(cartState);

  async function getProduct() {
    const res = await axios.get(
      `https://k4backend.osuka.dev/products/${params.id}`
    );
  }

  useEffect(() => {
    getProduct();
  }, []);

  function addToCart(item) {
    const inCart = cart.find((obj) => obj.id === item.id);

    if (inCart) {
      setCart(
        cart.map((i) =>
          i.id === item.id
            ? {
                ...inCart,
              }
            : i
        )
      );
    } else {
      const newCart = [
        ...cart,
        {
          ...item,
        },
      ];
      setCart(newCart);
    }
  }

  return (
    <div className={styles.singleProduct}>
      <img
        src={product.image}
        alt="Product image"
        className={styles.productImage}
      ></img>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>{product.price + " $"}</p>
      <div className={styles.addButton}>
        <button
          className={styles.addToCartButton}
          onClick={() => {
            addToCart(product);
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default SingleProduct;
