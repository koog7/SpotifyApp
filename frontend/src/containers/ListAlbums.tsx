import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../app/store.ts";
import {useEffect} from "react";
import {getAlbums} from "./Thunk/FetchSlice.ts";
import {useParams} from "react-router-dom";
import ArtistCard from "../components/ArtistCard.tsx";
import AlbumCard from "../components/AlbumCard.tsx";

const ListAlbums = () => {

    const {id} = useParams();

    const dispatch = useDispatch<AppDispatch>();
    const certainAlbums = useSelector((state: RootState) => state.Artist.certainAlbums);

    useEffect(() => {
        dispatch(getAlbums(id))

        console.log(certainAlbums)
    }, [dispatch]);


    return (

        <div style={{display: 'flex', gap: '20px', marginTop: '50px'}}>
            {certainAlbums.map((artist) => (artist ? (
                    <div key={artist._id}>
                        <AlbumCard title={artist.title} photo={artist.photo} _id={artist._id} dataRelease={artist.dataRelease}/>
                    </div>
                ) : <p>Loading</p>
            ))}
        </div>

    );
};

export default ListAlbums;