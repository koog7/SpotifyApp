import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store.ts";
import {useNavigate} from "react-router-dom";
import {authorizationUser, loginUser} from "../Thunk/AuthSlice.ts";

const SignIn = () => {

    const dispatch = useDispatch<AppDispatch>();
    const error = useSelector((state: RootState) => state.User.error);

    const [login, setLogin] = useState({
        username: '',
        password: '',
    });
    const navigate = useNavigate()

    const getValueInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setLogin(prevState => ({...prevState, [name]: value}));
    };

    const submitData = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const resultAction = await dispatch(authorizationUser(login));
            if (authorizationUser.fulfilled.match(resultAction)) {
                navigate('/');
            }
        } catch (error) {
            console.log('Unexpected Error:', error);
        }

    };

    return (
        <div className="signin-container">
            <form className="signin-form" onSubmit={submitData}>
                <h2>Log <span style={{color:'limegreen'}}>In</span></h2>
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" placeholder="Enter your username" value={login.username} onChange={getValueInput} required/>
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>

                    <input type="password" name="password" placeholder="Enter your password" value={login.password} onChange={getValueInput} required/>
                    {error && (
                        <p style={{ color: 'red' }}>{error}</p>
                    )}
                </div>
                <button type="submit" className="signin-button">Sign In</button>
            </form>
        </div>
    );
};

export default SignIn;