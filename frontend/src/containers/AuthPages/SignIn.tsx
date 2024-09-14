import React from 'react';

const SignIn = () => {
    return (
        <div className="signin-container">
            <form className="signin-form">
                <h2>Sign <span style={{color:'limegreen'}}>In</span></h2>
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" placeholder="Enter your username"/>
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter your password"/>
                </div>
                <button type="submit" className="signin-button">Sign In</button>
            </form>
        </div>
    );
};

export default SignIn;