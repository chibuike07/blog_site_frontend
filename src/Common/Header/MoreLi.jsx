import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import MoreItemsLi from "./MoreItemsLi";
import { Link } from "react-router-dom";
import Lists from "../List.component/List";
import { CrisptvNonUserContext } from "../../Context_files/CrisptvNonUsers";

const MoreLi = ({ toggleOnHover, item, history }) => {
  const [{ moreItems }] = useContext(CrisptvNonUserContext);

  return (
    <div className="nav-item dropdown">
      <div className={toggleOnHover}>
        <Lists
          text={
            <Link to={"/"} className="nav-link dropdown-toggle">
              {item}
            </Link>
          }
        />
        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          {moreItems &&
            moreItems.map((item, index) => (
              <MoreItemsLi key={index} item={item} />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default withRouter(MoreLi);
