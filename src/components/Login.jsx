import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/User";
import { getAllUSers } from "../api";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    getAllUSers().then(({ users }) => {
      setUsers(users);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(selectedUser);
    window.history.back();
  };

  const handleUserChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedUser(selectedValue);
  };

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
            value={selectedUser}
            onChange={(e) => {
              handleUserChange(e);
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

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Login;
