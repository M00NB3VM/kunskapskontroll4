import { useRecoilState } from "recoil";
import { productsState } from "../recoil/products/atom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import styles from "./filteredProducts.module.css";

function CategoryWomen() {
  const [products, setProducts] = useRecoilState(productsState);

  const women = "women's clothing";

  async function getProducts() {
    const res = await axios.get(
      `https://k4backend.osuka.dev/products/category/${women}`
    );
    setProducts(res.data);
  }

  useEffect(() => {
    getProducts();
  }, []);

  const productGrid = products.map((product) => {
    return (
      <Link
        to={`/products/${product.id}`}
        className={styles.product}
        key={product.id}
      >
        <img className="productImg" src={product.image}></img>
        <h2 className={styles.productName}>{product.title}</h2>
        <p className={styles.productPrice}>{product.price + " $"}</p>
      </Link>
    );
  });

  return (
    <div>
      <h1>Products</h1>
      <div className={styles.productGrid}>{productGrid}</div>
    </div>
  );
}

export default CategoryWomen;
