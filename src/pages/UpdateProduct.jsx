import axios from "axios";
import { useRecoilState } from "recoil";
import { productsState } from "../recoil/products/atom";
import { useEffect } from "react";

function UpdateProduct() {
  const [products, setProducts] = useRecoilState(productsState);

  async function getProducts() {
    const res = await axios.get("https://k4backend.osuka.dev/products");
    setProducts(res.data);
  }

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    await axios({
      method: "put",
      url: `https://k4backend.osuka.dev/products/`,
      data: {
        title: "test product",
        price: 13.5,
        description: "lorem ipsum set",
        image: "https://i.pravatar.cc",
        category: "electronics",
      },
    }).then((res) => {
      console.log(res);
    });
  }

  return (
    <div>
      <form></form>
    </div>
  );
}

export default UpdateProduct;

/* ${productId}*/
