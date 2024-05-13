import { Link } from "react-router-dom";

const Homepage = () => {
   
  return (
    <div className="home">
      Homepage
      <Link to={`/login`}>
        <button>Login</button>
      </Link>
      <Link to={`/articles`}>
        <button>Browse as guest</button>
      </Link>
    </div>
  );
};

export default Homepage;
