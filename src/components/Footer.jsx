import React from "react";
import Logo from "../../public/Logo.png";

const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal bg-base-300  text-neutral-content flex flex-col items-center p-10">
        <img src={Logo} alt="" className="w-30" />
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved
          @TinderForGeeks
        </p>
      </footer>
    </div>
  );
};

export default Footer;
