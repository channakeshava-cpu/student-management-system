import {useState} from "react";
import axios from "axios";



function LoginForm({ setLoggedIn}){
    const [username,setUsername] = useState("");
    const[password,setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
                {
                    username,
                    password,
                }
            );
            localStorage.setItem("token",response.data.token);

            console.log(response.data);

           setLoggedIn(true);
        } catch(error){
            alert("Login Failed!");
            console.error(error);
        }
    };

    return(
        <div>
            <h2>Login</h2>

            <input
                type ="text"
                placeholder="Username"
                value={username}
                onChange={(e)=> setUsername(e.target.value)}
                />

            <br /><br />

            <input
                type={"password"}
                placeholder="Password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                />

            <br /><br/>

            <button onClick={handleLogin}>
                Login
            </button>

            <p>Username: {username}</p>
            <p>Password:{password}</p>
        </div>
    );

}

export default LoginForm;