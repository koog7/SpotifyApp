import {NavLink} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../app/store.ts";


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

    if (!userData && !isPublished) {
        return null;
    }

    if (userData && userData.role === 'user' && !isPublished) {
        return null;
    }

    return (
        <div>
            <NavLink className="nav-link" to={`/tracks/${_id}`} style={{textDecoration: 'none'}}>
                <div className="artist-card">
                    <img className="album-image" width="160px" src={`http://localhost:8000/images/${photo}`}
                         alt="Artist image"/>
                    <p className="album-name">{title}</p>
                    <p className="artist-description"><span style={{marginRight: '5px', color: 'white'}}>{dataRelease} ·</span><span style={{margin:0, color:'white', fontSize:'14px'}}>{trackCount} Трек ·</span> Альбом
                    </p>
                    {isPublished ? <></> : <div style={{fontSize:'12px', marginBottom: 0}}>Не опубликован</div>}
                </div>
            </NavLink>
        </div>
    );
};

export default AlbumCard;