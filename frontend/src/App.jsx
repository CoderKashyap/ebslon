import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./App.css";

import { loadUser } from "./actions/userAction";

import GuestLogin from "./component/Auth/guestLogin";
import GuestRegister from "./component/Auth/guestRegister";
import Home from "./pages/Home/Home";

function App() {
  const dispatch = useDispatch();

  const { error, isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/guestRegister" element={<GuestRegister />} />
        <Route path="/GuestLogin" element={<GuestLogin />} />
      </Routes>
    </>
  )
}

export default App
