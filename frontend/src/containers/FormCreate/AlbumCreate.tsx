import React, {ChangeEvent, FormEvent, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store.ts";
import {postArtist} from "../Thunk/PostSlice/DataSlice.ts";

const AlbumCreate = () => {

    const [data, setData] = useState({
        name: '',
        info: ''
    });
    const urlFile = useRef(null)
    const [file, setFile] = useState<File | null>(null);
    const dispatch = useDispatch<AppDispatch>()

    const userData = useSelector((state: RootState) => state.User.user);
    const valueChecker = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({...prevData, [name]: value}));
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

        console.log('Submitting Artist:', {
            name: data.name,
            info: data.info,
            photo: file,
            token: userData?.token,
        });

        await dispatch(postArtist({name: data.name, info:data.info, photo : file , token:userData?.token}))
    }

    return (
        <div>
            <form className="form-container" onSubmit={onSubmitData}>
                <h2>Создание Артиста</h2>
                <input
                    type="text"
                    placeholder="Имя исполнителя"
                    className="input-field"
                    required
                    name="name"
                    onChange={valueChecker}
                />
                <input
                    type="text"
                    placeholder="Краткое инфо"
                    className="input-field"
                    required
                    name="info"
                    onChange={valueChecker}
                />
                <input type="file" required ref={urlFile} accept="image/*" onChange={onFileChange}/>
                <button type="submit" className="submit-button">Создать</button>
            </form>
        </div>
    );
};

export default AlbumCreate;