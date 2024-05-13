import React, { useState } from 'react'; 
import FormDialog from '../clientScreen/FormDialog';
import './loginSite.css';
// Import CSS file for styling (if needed)

const LoginSite = () => {
    // const [showLoginForm, setShowLoginForm] = useState(false);
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');

    // const handleLoginButtonClick = () => {
    //     setShowLoginForm(true);
    // };

    // const handleLoginSubmit = (e) => {
    //     e.preventDefault();
    //     // Perform login logic here using username and password
    //     console.log('Login submitted:', { username, password });
    //     // Reset form fields and hide login form after submission
    //     setUsername('');
    //     setPassword('');
    //     setShowLoginForm(false);
    // };

    return (
        <div className="login-container">
            <h2>Hello Manager<br></br>
               Your Site is currently under construction Please Build It</h2>

               
            <FormDialog/>
            {/* {!showLoginForm ? (
                <button onClick={handleLoginButtonClick}>Login</button>
            ) : (
                <form onSubmit={handleLoginSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input type="submit" value="Login" />
                </form>
            )} */}
        </div>
    );
};

export default LoginSite;

