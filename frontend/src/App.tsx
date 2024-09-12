import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home.tsx";
import ListAlbums from "./containers/ListAlbums.tsx";
import TrackList from "./containers/TrackList.tsx";

const App = () => {

    return(
        <>
            <Routes>
                <Route path="/" element={(
                   <Home />
                )}/>
                <Route path="/album/:id" element={(
                    <ListAlbums/>
                )}/>
                <Route path="/tracks/:id" element={(
                    <TrackList/>
                )}/>
            </Routes>
        </>
    )
};

export default App
