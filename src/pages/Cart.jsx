import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartState } from "../recoil/cart/atom";
import { cartStatus } from "../recoil/cart/selectors";
import styles from "./cart.module.css";

function Cart() {
  const [cart, setCart] = useRecoilState(cartState);
  const { totalSum } = useRecoilValue(cartStatus);

  function removeItem(product) {
    const newCart = cart.filter((i) => i.id !== product);
    setCart(newCart);
  }

  return (
    <div>
      {cart.length === 0 ? (
        <h1 className={styles.yourCart}>Your cart is empty</h1>
      ) : (
        <h1 className={styles.yourCart}>Your cart</h1>
      )}

      {cart.map((product) => (
        <div className={styles.cartItem} key={product.id}>
          <div className={styles.cartItemContent}>
            <button
              className={styles.removeButton}
              onClick={() => removeItem(product.id)}
            >
              Remove
            </button>

            <div className={styles.cartProductInfo}>
              <img className={styles.cartImg} src={product.image} />
              <div className={styles.cartProductDetails}>
                <h3>{product.title}</h3>
                <p>{product.price + " $"}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className={styles.orderInfo}>
        <p>Grand total: {totalSum} $</p>
        <button className={styles.checkoutButton}>Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
