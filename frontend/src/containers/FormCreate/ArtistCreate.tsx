import React, {ChangeEvent, FormEvent, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store.ts";
import {getArtists} from "../Thunk/FetchSlice.ts";
import {useNavigate} from "react-router-dom";
import {postAlbum} from "../Thunk/PostSlice/DataSlice.ts";

const ArtistCreate = () => {

    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(getArtists())
    }, [dispatch]);

    const allArtists = useSelector((state: RootState) => state.Artist.allArtists);
    const userData = useSelector((state: RootState) => state.User.user);
    const urlFile = useRef(null)
    const navigate = useNavigate();

    const [file, setFile] = useState<File | null>(null);
    const [data, setData] = useState({
        title: '',
        dataRelease: (new Date).getFullYear(),
        artistId: '',
    });

    useEffect(() => {
        setData((prevData) => ({...prevData, artistId: allArtists[0]?._id,}));
    }, [allArtists]);

    const valueChecker = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({...prevData, [name]: value}));
    };

    const selectFollow = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setData((prevData) => ({...prevData, artistId: event.target.value}));
    };
    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target.files

        if (fileInput && fileInput[0]) {
            setFile(fileInput[0])
        } else {
            setFile(null)
        }
    }

    const onSubmitData = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await dispatch(postAlbum({title: data.title, dataRelease: data.dataRelease, artistId:data.artistId, photo : file , token:userData?.token}))
        navigate('/')
    }

    return (
        <div>
            <form className="form-container" onSubmit={onSubmitData}>
                <h2>Создание Альбома</h2>
                <input
                    type="text"
                    placeholder="Название альбома"
                    className="input-field"
                    required
                    name="title"
                    onChange={valueChecker}
                />
                <div style={{display:"flex", flexDirection: "column", gap:'20px'}}>
                    <select id="my-select" onChange={selectFollow}>
                        {allArtists.map(option => (
                            <option key={option._id} value={option._id}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                    <input type="file" required ref={urlFile} accept="image/*" onChange={onFileChange}/>
                </div>
                <button type="submit" className="submit-button">Создать</button>
            </form>
        </div>
    );
};

export default ArtistCreate;