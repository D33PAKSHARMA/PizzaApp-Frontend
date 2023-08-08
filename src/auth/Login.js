import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loginUser } from "../store/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth._id) {
      toast.success("User login successfully", {
        autoClose: 2000,
      });
      navigate("/cart");
    }
  }, [auth._id, navigate]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmitform = (e) => {
    e.preventDefault();
    if (!user.email) {
      toast.error("Email is required!", {
        autoClose: 2000,
      });
    } else if (!user.password) {
      toast.error("Password is required!", {
        autoClose: 2000,
      });
    }

    dispatch(loginUser(user));
  };

  return (
    <form
      className="container mx-auto flex items-center justify-center "
      onSubmit={handleSubmitform}
      style={{ marginTop: "110px" }}
    >
      <div className="form">
        <div className="title">Welcome</div>
        <div className="subtitle">Let's create your account!</div>
        <div className="input-container ic2">
          <input
            id="lastname"
            className="input"
            type="email"
            placeholder=" "
            name="email"
            value={user.email}
            onChange={handleInput}
          />
          <div className="cut" />
          <label htmlFor="email" className="placeholder">
            Email
          </label>
        </div>
        <div className="input-container ic2">
          <input
            id="email"
            className="input"
            type="password"
            placeholder=" "
            name="password"
            value={user.password}
            onChange={handleInput}
          />
          <div className="cut cut-short" />
          <label htmlFor="password" className="placeholder">
            Password
          </label>
        </div>
        <button type="text" className="submit" style={{ marginTop: "40px" }}>
          Login
        </button>
        {auth.loginStatus === "rejected" ? (
          <p className="text-red-500 p-2 text-center">{auth.loginError}</p>
        ) : (
          ""
        )}
        {/* <p style={{ color: "white", marginTop: "20px" }}>
          Not Registered!{" "}
          <span style={{ marginLeft: "5px" }}>
            <Link to="/register">RegisterNow</Link>
          </span>
        </p> */}
      </div>
    </form>
  );
};

export default Login;
