import ArtistCard from "../components/ArtistCard.tsx";
import {AppDispatch, RootState} from "../app/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {getArtists} from "./Thunk/FetchSlice.ts";
import {useEffect} from "react";

const Home = () => {

    const dispatch = useDispatch<AppDispatch>();
    const allArtists = useSelector((state: RootState) => state.Artist.allArtists);

    useEffect(() => {
        dispatch(getArtists())
    }, [dispatch]);


    return (
        <div style={{marginLeft:'150px'}}>
            <h1>Хиты этой осени!</h1>
            <div style={{display: 'grid',gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px', marginTop: '50px'}}>
                {allArtists.map((artist) => (artist ? (
                        <div key={artist._id}>
                            <ArtistCard name={artist.name} photo={artist.photo} _id={artist._id}/>
                        </div>
                    ) : <p>Loading</p>
                ))}
            </div>
        </div>
    );
};

export default Home;