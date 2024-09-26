import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../app/store.ts";

const SideBar = () => {

    const loader = useSelector((state: RootState) => state.Artist.loader);
    const userData = useSelector((state: RootState) => state.User.user);
    const navigate = useNavigate();

    const logOut = async () => {
        await localStorage.removeItem("persist:liteSpotify:Artist");
        await navigate('/')
        location.reload()
    }

    return (
        <div>
            <div style={{width: '200px', marginLeft: '-520px'}}>
                <div id="loader-container" style={{display: loader ? 'block' : 'none'}}>
                    <div className="loader"></div>
                </div>
                <div className="sidebar">
                    <h2>
                        <NavLink className="nav-link" to="/">Like <span>Spotify</span></NavLink>
                    </h2>
                    <div className="user-section">
                        {userData && userData.username ? (
                            <div style={{minHeight:'500px'}}>
                                <p className="welcome-message">Здравствуйте, {userData.username}!</p>
                                {userData.role && (<p style={{backgroundColor: userData.role === 'admin' ? '#ff4d4d' : userData.role === 'user' ? '#4caf50' : '#4dff4d', padding: '5px',borderRadius: '5px',}}>Роль - <span style={{fontSize:'20px'}}>{userData.role}</span></p>)}
                                <div style={{marginTop: '50px', display:'flex', flexDirection:'column'}}>
                                    <NavLink className={'trackH-btn'} to={'/track_history'}>Создать артиста</NavLink>
                                    <NavLink className={'trackH-btn'} to={'/track_history'}>Создать альбом</NavLink>
                                    <NavLink className={'trackH-btn'} to={'/track_history'}>Создать трек</NavLink>
                                    <NavLink className={'trackH-btn'} to={'/track_history'}>История прослушивания</NavLink>
                                    <a style={{marginTop:'250px'}} onClick={logOut} className={'logout'}>Выйти из аккаунта</a>
                                </div>
                            </div>
                        ) : (
                            <div className="auth-links">
                                <NavLink to="/login">Log In</NavLink>
                                <NavLink to="/registration">Sign Up</NavLink>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default SideBar;