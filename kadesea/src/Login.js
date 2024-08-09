import React from 'react'
import "./LandS.css"
function Login() {
    
    return (
        <div className="form-content">
            <form id="login-form" className="form active">
                <h2>Login</h2>
                <label for="login-email">Email:</label>
                <input type="email" id="login-email" name="login-email" required />
                <label for="login-password">Password:</label>
                <input type="password" id="login-password" name="login-password" required />
                <button type="submit">Login</button>
            </form>
            
            
        </div>
    )
}

export default Login
