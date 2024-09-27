import {NavLink} from "react-router-dom";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../app/store.ts";
import {deleteAlbum, deleteArtist, patchAlbum, patchArtist} from "../containers/Thunk/PostSlice/DataSlice.ts";


interface Props{
    _id: string,
    title: string,
    dataRelease: number,
    photo: string,
    trackCount: number,
    isPublished: boolean,
}

const AlbumCard: React.FC<Props> = ({_id, title , dataRelease, photo , trackCount , isPublished}) => {

    const userData = useSelector((state: RootState) => state.User.user);
    const dispatch = useDispatch<AppDispatch>()

    if (!userData && !isPublished) {
        return null;
    }

    if (userData && userData.role === 'user' && !isPublished) {
        return null;
    }

    const clickDelete = async (id: string) => {
        await dispatch(deleteAlbum(id))
        await location.reload()
    }
    const clickPublish = async (id: string) => {
        await dispatch(patchAlbum(id))
        await location.reload()
    }

    return (
        <div className="artist-card">
            <NavLink className="nav-link" to={`/tracks/${_id}`} style={{textDecoration: 'none'}}>
                <div >
                    <img className="album-image" width="160px" src={`http://localhost:8000/images/${photo}`}
                         alt="Artist image"/>
                    <p className="album-name">{title}</p>
                    <p className="artist-description">
                        <span style={{marginRight: '5px', color: 'white'}}>{dataRelease} ·</span>
                        <span style={{margin: 0, color: 'white', fontSize: '14px'}}>{trackCount} Трек ·</span> Альбом
                    </p>
                    {!isPublished && <div style={{fontSize: '12px', marginBottom: 0}}>Не опубликован</div>}
                </div>
            </NavLink>

            {userData && userData.role === 'admin' && (
                <div>
                    <button style={{backgroundColor:'#d11a2a', border:"none"}} onClick={() => clickDelete(_id)}>Удалить</button>
                    {!isPublished && <button style={{marginLeft: '5px', backgroundColor:'#24a0ed', border:"none"}} onClick={() => clickPublish(_id)}>Опубликовать</button>}
                </div>
            )}
        </div>

    );
};

export default AlbumCard;