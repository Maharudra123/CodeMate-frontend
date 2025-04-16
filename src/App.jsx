import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import appStore from "./utils/store/appStore";
import { ToastContainer, Bounce } from "react-toastify";

// Components
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import UpdateProfile from "./components/UpdateProfile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import GoPremium from "./components/GoPremium";
import Chat from "./components/Chat";
import Landing from "./components/Landing";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route index element={<Feed />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="connections" element={<Connections />} />
          <Route path="requests" element={<Requests />} />
          <Route path="gopremium" element={<GoPremium />} />
          <Route path="chat/:targetUserId" element={<Chat />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <Provider store={appStore}>
      <AppRoutes />
    </Provider>
  );
};

export default App;
