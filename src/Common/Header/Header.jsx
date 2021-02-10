import React, { useContext } from "react";
import Logo from "../../Assests/logo1-full-color.png";
import Styles from "./Styles.module.css";
import HeaderItemLi from "./HeaderItemLi";
import MoreLi from "./MoreLi";
import { Link } from "react-router-dom";
import Image from "../Image.component/Image";
import { CrisptvNonUserContext } from "../../Context_files/CrisptvNonUsers";

const Header = () => {
  const { img, paddingVertical, toggleOnHover } = Styles;

  const [{ headerItems }] = useContext(CrisptvNonUserContext);
  return (
    <div>
      <nav
        className={`navbar navbar-expand-md navbar-light bg-light fixed-top pl-5 ${paddingVertical}`}
      >
        <Link className="navbar-brand" to={"/"}>
          <Image
            src={Logo}
            alt="Crisp Logo"
            width="150px"
            height="50px"
            className={img}
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto">
            {headerItems &&
              headerItems.map((item, index) =>
                item !== "More" ? (
                  <HeaderItemLi key={index} item={item} />
                ) : (
                  <MoreLi
                    key={index}
                    item={item}
                    toggleOnHover={toggleOnHover}
                  />
                )
              )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
