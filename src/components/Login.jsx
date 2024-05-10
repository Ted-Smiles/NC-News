import { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom"
import { UserContext } from "../context/User";
import { getAllUSers } from "../api";

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  const goBack = () => {
    window.history.back();
  };

  useEffect(() => {
    getAllUSers().then(({ users }) => {
      setUsers(users);
    });
  }, []);

  return (
    <>
      <h2>Login</h2>

      <form
        className="comment-form"
        onSubmit={(e) => {
            handleSubmit(e);
        }}
      >
        <div>
          <label htmlFor="user">User</label>
          <select
            name="user"
            id="user"
            defaultValue={""}
            value={user}
            onChange={(e) => {
              setUser(e.target.value);
            }}
          >
            <option key={"blank"} value={""}></option>
            {users.map((userObj, index) => {
              return (
                <option key={index} value={userObj.username}>
                  {userObj.username}
                </option>
              );
            })}
          </select>
        </div>
        <Link to="#" onClick={goBack}>
          <button>Submit</button>
        </Link>
      </form>
    </>
  );
};

export default Login;
