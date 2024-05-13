import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/User";

const Header = () => {
  const { user, setUser } = useContext(UserContext);

  let location = useLocation();

  const handleLogout = () => {
    setUser("");
  };

  return (
    <div className="header">
      <div className="title">
        <Link to={`/`}>
          <h1>Nc News</h1>
        </Link>
        {(location.pathname === "/" && user === "") ||
        location.pathname === "/login" ? null : user !== "" ? (
          <div className="votes">
            <p>{user}</p>
            <Link to="/">
              <button onClick={handleLogout}>Log Out</button>
            </Link>
          </div>
        ) : (
          <Link to={`/login`}>
            <button>Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
