import './App.css'
import {NavLink, Route, Routes} from "react-router-dom";
import Home from "./containers/Home.tsx";
import ListAlbums from "./containers/ListAlbums.tsx";
import TrackList from "./containers/TrackList.tsx";
import {useSelector} from "react-redux";
import {RootState} from "./app/store.ts";

const App = () => {
    const loader = useSelector((state: RootState) => state.Artist.loader);
    return(
        <>
            <div>
                <div style={{backgroundColor: '#404040', width: '1000px', minHeight: '50px', padding: '2px'}}>
                    <h2 style={{marginLeft: '10px'}}><NavLink className="nav-link" to="/"
                                                              style={{textDecoration: 'none', color: 'white'}}>Lite
                        Spotify</NavLink></h2>
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
