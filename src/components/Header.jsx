import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/User";
import { useLocation } from "react-router-dom";

const Header = ({ setSelectedTopic }) => {
  const { user, setUser } = useContext(UserContext);

  let location = useLocation();

  console.log(location);

  const handleLogout = () => {
    setUser("");
  };

  return (
    <div className="header">
      <div className="title">
        <Link to={`/articles`}>
          <h1>Nc News</h1>
        </Link>
        {location.pathname === "/" ||
        location.pathname === "/login" ? null : user !== "" ? (
          <div className="votes">
            <p>{user}</p>
            <button onClick={handleLogout}>Log Out</button>
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
