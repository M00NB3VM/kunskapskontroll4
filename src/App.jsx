import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import SingleProduct from "./pages/Singleproduct";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyPage from "./pages/MyPage";
import AdminPage from "./pages/AdminPage";
import CategoryMen from "./pages/CategoryMen";
import CategoryWomen from "./pages/CategoryWomen";
import CategoryJewelery from "./pages/CategoryJewelery";
import CategoryElectronics from "./pages/CategoryElectronics";
import UpdateProfile from "./pages/UpdateProfile";
import UpdateProduct from "./pages/UpdateProduct";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/products/:id" element={<SingleProduct />}></Route>
        <Route path="/products/women" element={<CategoryWomen />}></Route>
        <Route path="/products/men" element={<CategoryMen />}></Route>
        <Route path="/products/jewelery" element={<CategoryJewelery />}></Route>
        <Route
          path="/products/electronics"
          element={<CategoryElectronics />}
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/updateprofile" element={<UpdateProfile />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/admin-page" element={<AdminPage />}></Route>
        <Route path="/updateproduct" element={<UpdateProduct />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
