import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/store/appStore";
import Feed from "./components/Feed";
import UpdateProfile from "./components/UpdateProfile";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import GoPremium from "./components/GoPremium";
import Chat from "./components/Chat";
import Landing from "./components/Landing";

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          {/* Main Layout */}
          <Route path="/" element={<Body />}>
            <Route index element={<Feed />} /> {/* Use 'index' for default */}
            <Route path="/landing" element={<Landing />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
            <Route path="connections" element={<Connections />} />
            <Route path="requests" element={<Requests />} />
            <Route path="gopremium" element={<GoPremium />} />
            <Route path="chat/:targetUserId" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>

      {/* Toast Notifications */}
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
    </Provider>
  );
};

export default App;
