import React, {ChangeEvent, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store.ts";
import {useNavigate} from "react-router-dom";
import {googleLogin, loginUser} from "../Thunk/AuthSlice.ts";
import {GoogleLogin} from "@react-oauth/google";


const SignUp = () => {

    const dispatch = useDispatch<AppDispatch>();
    const error = useSelector((state: RootState) => state.User.error);

    const urlFile = useRef(null)
    const [file, setFile] = useState<File | null>(null);

    const [login, setLogin] = useState({
        username: '',
        password: '',
        displayName:'',
    });
    const navigate = useNavigate()

    const getValueInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setLogin(prevState => ({...prevState, [name]: value}));
    };

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target.files

        if (fileInput && fileInput[0]) {
            setFile(fileInput[0])
        } else {
            setFile(null)
        }
    }

    const submitData = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // noinspection TypeScriptValidateTypes
            const resDispatch = await dispatch(loginUser({
                username: login.username,
                password: login.password,
                displayName: login.displayName,
                photo: file,
            }));
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
                <div className="input-group">
                    <label htmlFor="displayName">Display name</label>
                    <input type="text" name="displayName" placeholder="Enter your name" value={login.displayName}
                           onChange={getValueInput} required/>
                </div>
                <div>
                    <p style={{color:'black', marginLeft:'-20px'}}>Choice your avatar</p>
                    <input ref={urlFile} accept="image/*" onChange={onFileChange} type={"file"}
                           style={{marginBottom: '20px', marginLeft: '50px' , color:'black'}} required/>
                </div>

                {error && (
                    <p style={{color: 'red'}}>{error}</p>
                )}
                <button type="submit" className="signin-button">Sign In</button>
                <div style={{marginTop: '10px', marginLeft: '70px' }}>
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