import { Link } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/User"


const Header = ({setSelectedTopic}) => {
    const { user, setUser } = useContext(UserContext);

    const handleLogout = () => {
        setUser('');
    };

    const handleClick = () => {
        setSelectedTopic('')
    }
    
    return (
        <div className="header">
            <div className="title">
                <Link to={`/`} onClick={handleClick}>
                    <h1>Nc News</h1>
                </Link>
                
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