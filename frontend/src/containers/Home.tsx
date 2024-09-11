import ArtistCard from "../components/ArtistCard.tsx";
import {AppDispatch} from "../app/store.ts";
import {useDispatch} from "react-redux";
import {getArtists} from "./Thunk/FetchSlice.ts";
import {useEffect} from "react";

const Home = () => {

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getArtists())
    }, [dispatch]);


    return (
        <div>
            <ArtistCard/>
        </div>
    );
};

export default Home;