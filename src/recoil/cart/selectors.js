import { selector } from "recoil";
import { cartState } from "./atom";

export const cartStatus = selector({
  key: "cartStatus",
  get: ({ get }) => {
    const cart = get(cartState);

    const totalSum = cart.reduce((tot, sum) => {
      const total = parseInt(sum.price);
      return tot + total;
    }, 0);

    return {
      totalSum,
    };
  },
});
