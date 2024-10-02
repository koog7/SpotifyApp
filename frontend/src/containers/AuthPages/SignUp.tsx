import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store.ts";
import {useNavigate} from "react-router-dom";
import {googleLogin, loginUser} from "../Thunk/AuthSlice.ts";
import {GoogleLogin} from "@react-oauth/google";


const SignUp = () => {

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
            const resDispatch = await dispatch(loginUser(login));
            if (loginUser.fulfilled.match(resDispatch)) {
                await navigate('/');
            }
        } catch (error) {
            console.log('Unexpected Error:', error);
        }

    };

    const googleLoginHandler = async (credential: string) => {
        await dispatch(googleLogin(credential)).unwrap();
        navigate('/');
    };

    return (
        <div className="signin-container">
            <form className="signin-form" onSubmit={submitData}>
                <h2>Sign <span style={{color: 'limegreen'}}>Up</span></h2>
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" placeholder="Enter your username" value={login.username}
                           onChange={getValueInput} required/>
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Enter your password" value={login.password}
                           onChange={getValueInput} required/>
                </div>
                {error && (
                    <p style={{color: 'red'}}>{error}</p>
                )}
                <button type="submit" className="signin-button">Sign In</button>
                <div style={{marginTop: '10px', marginLeft: '70px'}}>
                    <GoogleLogin theme={"filled_black"} onSuccess={(credentialResponse) => {
                        if (credentialResponse.credential) {
                            void googleLoginHandler(credentialResponse.credential);
                        }
                    }}/>
                </div>
            </form>
        </div>
    );
};

export default SignUp;