import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../app/store.ts";
import {useNavigate} from "react-router-dom";
import {getTrack} from "./Thunk/TrackHistorySlice.ts";

const TrackHistory = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const userData = useSelector((state: RootState) => state.User.user);
    const tracksHistoryData = useSelector((state: RootState) => state.TrackHistory.allTracks);


    useEffect(() => {
        if (!userData || !userData.token) {
            navigate('/login');
        }
    }, [userData , navigate]);

    useEffect(() => {

        if(userData){
            dispatch(getTrack(userData.token))
        }

    }, [dispatch , userData]);

    return (
        <div>
            <div>
                <h1>Недавно прослушаные треки</h1>
            </div>
            <div className="tracklist-container">
                <table className="tracklist-table">
                    <thead>
                    <tr>
                        <th style={{width:'100px'}}>Название трека</th>
                        <th>Имя певца</th>
                        <th>Длительность</th>
                        <th>Время прослушивания</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tracksHistoryData && tracksHistoryData.length > 0 ? (
                        tracksHistoryData.map(track => (
                            <tr key={Math.random()}>
                                <td>{track.title}</td>
                                <td>{track.artistName}</td>
                                <td>{track.trackDuration}</td>
                                <td>{track.listenedAt.replace('T', ' ').replace('Z', ' ').slice(0, -5)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td>There are no tracks</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TrackHistory;