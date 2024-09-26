import React, {ChangeEvent, FormEvent, useEffect, useRef, useState} from 'react';
import {postArtist, postTrack} from "../Thunk/PostSlice/DataSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store.ts";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const TrackCreate = () => {

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();
    const userData = useSelector((state: RootState) => state.User.user);
    const [data, setData] = useState({
        title: '',
        duration: '',
        albumId:'',
    });
    const [certainAlbums, setCertainAlbums] = useState([]);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await axios.get('http://localhost:8000/albums');
                setCertainAlbums(response.data);
            } catch (error) {
                console.error('Error fetching albums:', error);
            }
        };
        fetchAlbums();
    }, []);

    const valueChecker = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({...prevData, [name]: value}));
    };

    useEffect(() => {
        setData((prevData) => ({...prevData, albumId: certainAlbums[0]?._id,}));
    }, [certainAlbums]);

    const selectFollow = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setData((prevData) => ({...prevData, albumId: event.target.value}));
    };
    const onSubmitData = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(data)
        await dispatch(postTrack({title: data.title, duration:data.duration, albumId:data.albumId, token:userData?.token}))

        navigate('/')
    }

    return (
        <div style={{width: '475px'}}>
            <form className="form-container" onSubmit={onSubmitData}>
                <h2>Создание Трека</h2>
                <input
                    type="text"
                    placeholder="Название трека"
                    className="input-field"
                    required
                    name="title"
                    onChange={valueChecker}
                />
                <input
                    type="text"
                    placeholder="Длительность"
                    className="input-field"
                    required
                    name="duration"
                    onChange={valueChecker}
                />
                <div style={{display: "flex", flexDirection: "column", gap: '20px'}}>
                    <select id="my-select" onChange={selectFollow}>
                        {certainAlbums.map(option => (
                            <option key={option._id} value={option._id}>
                                {option.title}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="submit-button">Создать</button>
            </form>
        </div>
    );
};

export default TrackCreate;