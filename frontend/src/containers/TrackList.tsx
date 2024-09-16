import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../app/store.ts";
import {getTracks} from "./Thunk/FetchSlice.ts";

const TrackList = () => {

    const {id} = useParams();

    const dispatch = useDispatch<AppDispatch>();
    const allTracks = useSelector((state: RootState) => state.Artist.allTracks);

    useEffect(() => {
        dispatch(getTracks(id))
        console.log()
    }, [dispatch, id]);

    const getIdTrack = (id) => {
        console.log(id)
    }

    return (
        <div>
            <div style={{display:'flex', marginTop:'50px', marginLeft:'25px'}}>
                <div>
                    <img className="album-image" width="160px" src={`http://localhost:8000/images/${allTracks[0]? allTracks[0].album.photo: 'noimg.jpg'}`}
                         alt="Artist image"/>
                </div>
                <div style={{marginLeft:'20px', marginTop:'auto', marginBottom:'10px'}}>
                    <p style={{margin:'0'}}>Альбом</p>
                    <h3 style={{margin:'0'}}>{allTracks[0]? allTracks[0].album.title : 'Title'}</h3>
                    <p style={{margin:'0'}}>{allTracks[0]? allTracks[0].user.name : 'Nickname'} · {allTracks[0]? allTracks[0].album.dataRelease : 'Year'}</p>
                </div>
            </div>
            <div>
                <div className="tracklist-container">
                    <table className="tracklist-table">
                        <thead>
                        <tr>
                            <th></th>
                            <th>#</th>
                            <th>Название трека</th>
                            <th>Длительность</th>
                        </tr>
                        </thead>
                        <tbody>
                        {allTracks.map(track => track?  (
                            <tr key={track._id}>
                                <td>
                                    <button onClick={() => getIdTrack(track._id)}>Play</button>
                                </td>
                                <td>{track.numberTrack}</td>
                                <td>{track.title}</td>
                                <td>{track.duration}</td>
                            </tr>
                        ): (
                            <div>
                                <p>There are no tracks</p>
                            </div>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TrackList;