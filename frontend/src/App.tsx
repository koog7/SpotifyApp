import './App.css'
import {NavLink, Route, Routes} from "react-router-dom";
import Home from "./containers/Home.tsx";
import ListAlbums from "./containers/ListAlbums.tsx";
import TrackList from "./containers/TrackList.tsx";
import {useSelector} from "react-redux";
import {RootState} from "./app/store.ts";
import SignUp from "./containers/AuthPages/SignUp.tsx";
import SignIn from "./containers/AuthPages/SignIn.tsx";

const App = () => {
    const loader = useSelector((state: RootState) => state.Artist.loader);
    return(
        <>
            <div>
                <div style={{backgroundColor: '#404040', width: '1000px', minHeight: '50px', padding: '2px', display: 'flex'}}>
                    <h2 style={{marginLeft: '10px'}}>
                        <NavLink className="nav-link" to="/" style={{textDecoration: 'none', color: 'white'}}>Lite <span style={{color: 'limegreen'}}>Spotify</span></NavLink>
                    </h2>
                    <div style={{display: 'flex', alignItems: 'center', marginLeft: 'auto', gap:'20px', paddingRight:'30px', fontSize:'20px'}}>
                        <NavLink to={'/registration'} style={{color: '#b3b3b3', textDecoration:'none'}}>Sing In</NavLink>
                        <NavLink to={'/login'} style={{color: '#b3b3b3', textDecoration:'none'}}>Sing Up</NavLink>
                    </div>
                </div>
                <hr/>
            </div>
            <div id="loader-container" style={{display: loader ? 'block' : 'none'}}>
                <div className="loader"></div>
            </div>
            <div style={{marginLeft: '170px'}}>
                <Routes>
                    <Route path="/" element={(
                        <Home/>
                    )}/>
                    <Route path="/registration" element={(
                        <SignIn />
                    )}/>
                    <Route path="/album/:id" element={(
                        <ListAlbums/>
                    )}/>
                    <Route path="/tracks/:id" element={(
                        <TrackList/>
                    )}/>
                </Routes>
            </div>
        </>
    )
};

export default App
