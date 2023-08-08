import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/authSlice";

const Register = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth._id) {
      toast.success("User Register Successfully", {
        autoClose: 2000,
      });
      navigate("/");
    }
  }, [auth._id, navigate]);

  const [user, setUser] = useState({
    name: "",
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
    // console.log(user);

    if (!user.email) {
      toast.error("Email is Required!", {
        autoClose: 2000,
      });
    } else if (!user.password) {
      toast.error("Password is Required!", {
        autoClose: 2000,
      });
    }
    dispatch(registerUser(user));
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
        <div className="input-container ic1">
          <input
            id="firstname"
            className="input"
            type="text"
            placeholder=" "
            name="name"
            value={user.name}
            onChange={handleInput}
          />
          <div className="cut" />
          <label htmlFor="firstname" className="placeholder">
            First name
          </label>
        </div>
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
        <button type="text" className="submit">
          Register
        </button>
        {auth.registerStatus === "rejected" ? (
          <p className="text-red-500 p-1 text-center">{auth.registerError}</p>
        ) : (
          ""
        )}

        {/* <p style={{ color: "white", marginTop: "15px" }}>
          Already Registered!
          <span style={{ marginLeft: "10px" }}>
            <Link to="/login">LoginNow</Link>
          </span>
        </p> */}
      </div>
    </form>
  );
};

export default Register;
