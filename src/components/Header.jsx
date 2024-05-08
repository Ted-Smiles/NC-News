import { Link } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/User"


const Header = () => {
    const { user, setUser } = useContext(UserContext);

    const handleLogout = () => {
        setUser(''); // Update the user state when logging out
    };
    
    return (
        <div className="header">
            <div className="title">
                <h1>Nc News</h1>
                {user !== '' ? (
                    <div className="votes">
                        <p>{user}</p>
                        <button onClick={handleLogout}>Log Out</button> 
                    </div>                
                ) :
                    <Link to={`/login`} >
                        <button>Login</button>
                    </Link>
                }

            </div>
        </div>
    )
}

export default Header