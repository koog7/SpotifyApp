import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home.tsx";
import ListAlbums from "./containers/ListAlbums.tsx";
import TrackList from "./containers/TrackList.tsx";
import SignIn from "./containers/AuthPages/SignIn.tsx";
import SignUp from "./containers/AuthPages/SignUp.tsx";
import SideBar from "./components/SideBar.tsx";
import TrackHistory from "./containers/TrackHistory.tsx";
import NotFound from "./components/NotFound.tsx";
import TrackCreate from "./containers/FormCreate/TrackCreate.tsx";
import AlbumsForm from "./containers/FormCreate/AlbumsForm.tsx";
import ArtistCreate from "./containers/FormCreate/ArtistCreate.tsx";

const App = () => {

    return(
        <>
            <div style={{display:'flex', flexDirection: 'row', marginRight:'auto'}}>
                <div>
                    <SideBar />
                </div>
                <div>
                    <Routes>
                        <Route path="/" element={(
                            <Home/>
                        )}/>
                        <Route path="/login" element={(
                            <SignIn/>
                        )}/>
                        <Route path="/registration" element={(
                            <SignUp/>
                        )}/>
                        <Route path="/track_history" element={(
                            <TrackHistory/>
                        )}/>
                        <Route path="/album/:id" element={(
                            <ListAlbums/>
                        )}/>
                        <Route path="/tracks/:id" element={(
                            <TrackList/>
                        )}/>
                        <Route path="/createAlbum" element={(
                            <ArtistCreate />
                        )}/>
                        <Route path="/createArtist" element={(
                            <AlbumsForm />
                        )}/>
                        <Route path="/createTrack" element={(
                            <TrackCreate />
                        )}/>
                        <Route path="*" element={(
                            <NotFound />
                        )}/>
                    </Routes>
                </div>
            </div>
        </>
    )
};

export default App
