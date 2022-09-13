import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutFunction } from "../../redux/apiCalls";

export default function Topbar() {
  // REDUX:
  const dispatch = useDispatch();
  const history = useHistory();

  // FUNCTION:
  const handleLogout = () => {
    logoutFunction(dispatch);
    history.push("/login");
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <span className="logo">Myslife admin</span>
          </Link>
        </div>
        <div className="topRight">
          <div className="accountSetting">
            <p className="logout" onClick={handleLogout}>
              Logout
            </p>
          </div>
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img
            src="https://static1.dienanh.net/upload/202207/99f01414-dc96-48a3-b714-94894db2e1d4.jpeg"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}
