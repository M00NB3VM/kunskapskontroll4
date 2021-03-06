import styles from "./adminPage.module.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { productsState } from "../recoil/products/atom";
import { productState } from "../recoil/singleProduct/atom";
import { userListState } from "../recoil/userList/atom";
import { roleState } from "../recoil/role/atom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const navigate = useNavigate();
  const [product, setProduct] = useRecoilState(productState);
  const [products, setProducts] = useRecoilState(productsState);
  const [users, setUsers] = useRecoilState(userListState);
  const [userCarts, setUserCarts] = useState([]);
  const role = useRecoilValue(roleState);

  /* AXIOS */
  useEffect(() => {
    getUsers(), getProducts(), getUserCarts();
  }, []);

  async function getUsers() {
    const result = await axios.get("https://k4backend.osuka.dev/users");
    setUsers(result.data);
  }

  async function getProducts() {
    const res = await axios.get("https://k4backend.osuka.dev/products");
    setProducts(res.data);
  }

  async function getUserCarts() {
    const result = await axios.get("https://k4backend.osuka.dev/carts");
    setUserCarts(result.data);
  }

  if (users.length < 1 || userCarts.length < 1 || products.length < 1) {
    return <div>Loading</div>;
  }

  /* USERS */

  const userGrid = users.map((user) => {
    return (
      <tr key={user.id}>
        <td className={styles.cell}>{user.username}</td>
        <td className={styles.cell}>{user.name.firstname}</td>
        <td className={styles.cell}>{user.name.lastname}</td>
        <td className={styles.cell}>{user.email}</td>
      </tr>
    );
  });

  /* CARTS */

  const userCart = userCarts.map((cart) => {
    const user = users.find((x) => x.id === cart.userId);

    return (
      <tr key={cart.id}>
        <td className={styles.cell}>{cart.id}</td>
        <td className={styles.cell}>{user.username}</td>
        <td className={styles.cell}>
          {user.name.firstname} {user.name.lastname}
        </td>
        <td className={styles.cell}>
          <ul>
            {cart.products.map((i) => {
              const cartItem = products.find((y) => y.id === i.productId);
              return (
                <li key={i.productId} className={styles.cartLi}>
                  {cartItem ? cartItem.title : "Not found"}
                </li>
              );
            })}
          </ul>
        </td>
        <td className={styles.cell}>
          {cart.products.map((i) => {
            return <div>{i.quantity}</div>;
          })}
        </td>
      </tr>
    );
  });

  /* PRODUCTS*/

  async function deleteProduct(item) {
    await axios
      .delete(`https://k4backend.osuka.dev/products/${item.id}`, {})
      .then((res) => {
        console.log(res);
        removeProduct(res.data.id);
      })
      .catch((err) => console.log(err));
  }

  function removeProduct(product) {
    const newProducts = products.filter((i) => i.id !== product);
    setProducts(newProducts);
  }

  function updateProduct(item) {
    setProduct(item);
    navigate("/updateproduct");
  }

  const productGrid = products.map((product) => {
    return (
      <tr key={product.id}>
        <td className={styles.cell}>{product.id}</td>
        <td className={styles.cell}>{product.title}</td>
        <td className={styles.cell}>{product.price + "$"}</td>
        <td className={styles.cell}>{product.category}</td>
        <td className={styles.cell}>{product.description}</td>
        <td className={styles.cell}>
          <img className={styles.productImage} src={product.image}></img>
        </td>
        <td>
          <div className={styles.buttons}>
            <button
              className={styles.updateButton}
              onClick={() => {
                updateProduct(product);
              }}
            >
              Update
            </button>

            <button
              className={styles.deleteButton}
              onClick={() => deleteProduct(product)}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <div>
      {role !== "admin" || role === "" ? (
        <div className={styles.accessMessage}>
          <p>You do not have access to this page.</p>
        </div>
      ) : (
        <div>
          <div className={styles.adminIntro}>
            <h1>Welcome admin!</h1>
          </div>

          <div>
            <h2 className={styles.adminH2}>Users</h2>
            <ul className={styles.list}>
              <li key={userGrid}>
                <table className={styles.table}>
                  <thead className={styles.thead}>
                    <tr>
                      <th className={styles.cell}>User id</th>
                      <th className={styles.cell}>First name</th>
                      <th className={styles.cell}>Last name</th>
                      <th className={styles.cell}>E-mail</th>
                    </tr>
                  </thead>
                  <tbody>{userGrid}</tbody>
                </table>
              </li>
            </ul>
          </div>
          <div>
            <h2 className={styles.adminH2}>User carts</h2>
            <ul className={styles.list}>
              <li key={userCarts}>
                <table className={styles.table}>
                  <thead className={styles.thead}>
                    <tr>
                      <th className={styles.cell}>Cart id</th>
                      <th className={styles.cell}>Username</th>
                      <th className={styles.cell}>Name</th>
                      <th className={styles.cell}>Products</th>
                      <th className={styles.cell}>Quantity</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>{userCart}</tbody>
                </table>
              </li>
            </ul>
          </div>

          <div>
            <h2 className={styles.adminH2}>Products</h2>
            <ul className={styles.list}>
              <li key={products}>
                <table className={styles.table}>
                  <thead className={styles.thead}>
                    <tr>
                      <th className={styles.cell}>Id</th>
                      <th className={styles.cell}>Title</th>
                      <th className={styles.cell}>Price</th>
                      <th className={styles.cell}>Category</th>
                      <th className={styles.cell}>Description</th>
                      <th className={styles.cell}>Image</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>{productGrid}</tbody>
                </table>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
