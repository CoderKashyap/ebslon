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

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/register" element={<GuestRegister />} />
        <Route path="/login" element={<GuestLogin />} />
      </Routes>
    </>
  )
}

export default App
