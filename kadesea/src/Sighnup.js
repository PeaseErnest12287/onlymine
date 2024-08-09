import React from 'react'
import "./LandS.css"

function Sighnup() {
    

    return (
        <div>
            <div class="form-wrapper">
                
                <div class="form-content">
                    
                    <form id="signup-form" class="form">
                        <h2>Signup</h2>
                        <label for="signup-email">Email:</label>
                         <input type="email" id="signup-email" name="signup-email" required/>
                            <label for="signup-password">Password:</label>
                            <input type="password" id="signup-password" name="signup-password" required/>
                            <label for="signup-confirm-password">Confirm Password:</label>
                            <input type="password" id="signup-confirm-password" name="signup-confirm-password" required/>
                            <button type="submit">Signup</button>
                    </form>
                </div>
            </div>
        </div>
                       
     )
}

export default Sighnup
