import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import { Provider } from "react-redux";
import Navigation from "./Components/Navigation";
import ProductsPage from "./Pages/ProductsPage";
import SingleProduct from "./Pages/SingleProduct";
import Cart from "./Pages/Cart";
import store from "./store/store";
import Register from "./auth/Register";
import Login from "./auth/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadUser } from "./store/authSlice";

store.dispatch(loadUser(null));

function App() {
  return (
    <div className="container mx-auto md:max-width: 768px">
      <Provider store={store}>
        <Router>
          <ToastContainer />
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/getpizza" exact element={<ProductsPage />} />
            <Route path="/getpizza/:_id" element={<SingleProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
