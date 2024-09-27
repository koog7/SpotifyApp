import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../app/store.ts";
import {getTracks} from "./Thunk/FetchSlice.ts";
import {postTrack} from "./Thunk/TrackHistorySlice.ts";
import {deleteTracks, patchTrack} from "./Thunk/PostSlice/DataSlice.ts";

const TrackList = () => {

    const {id} = useParams();

    const dispatch = useDispatch<AppDispatch>();
    const allTracks = useSelector((state: RootState) => state.Artist.allTracks);
    const userData = useSelector((state: RootState) => state.User.user);


    useEffect(() => {
        dispatch(getTracks(id))
    }, [id]);

    const getIdTrack = async (id) => {
        await dispatch(postTrack({token: userData.token , trackId: id}))
        await location.reload()
    }


    const clickDelete = async (id: string) => {
        await dispatch(deleteTracks(id))
        await location.reload()
    }
    const clickPublish = async (id: string) => {
        await dispatch(patchTrack(id))
        await location.reload()
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
                            {userData && (
                                <th></th>
                            )}
                            <th>#</th>
                            <th>Название трека</th>
                            <th>Длительность</th>
                            <th>Статус</th>

                            {userData && userData.role === 'admin' && allTracks.length > 0 && (
                                <th>
                                    Функционал
                                </th>
                            )}
                        </tr>
                        </thead>
                        <tbody>
                        {allTracks.filter(track => {if (!userData) return track.isPublished; return userData.role !== 'user' || track.isPublished;}).map(track => track?  (
                            <tr key={track._id}>
                                {userData && (
                                    <td>
                                        <button onClick={() => getIdTrack(track._id)}>Play</button>
                                    </td>
                                )}
                                <td>{track.numberTrack}</td>
                                <td>{track.title}</td>
                                <td>{track.duration}</td>

                                <td>
                                    {track.isPublished ? "Опубликован" : "Не опубликован"}
                                </td>
                                {userData && userData.role === 'admin' && allTracks.length > 0 && (
                                    <td style={{display:'flex', minHeight:'50px'}}>
                                        <button style={{backgroundColor:'#d11a2a', border:"none" , height:'25px'}} onClick={() => clickDelete(track._id)}>Удалить</button>
                                        {!track.isPublished && <button style={{marginLeft: '5px', backgroundColor:'#24a0ed', border:"none", height:'25px'}} onClick={() => clickPublish(track._id)}>Опубликовать</button>}
                                    </td>
                                )}
                            </tr>
                        ) : (
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