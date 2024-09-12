import {NavLink} from "react-router-dom";
import React from "react";


interface Props{
    _id: string,
    title: string,
    dataRelease: number,
    photo: string,
}

const AlbumCard: React.FC<Props> = ({_id, title , dataRelease, photo}) => {
    return (
        <div>
            <NavLink className="nav-link" to={`/tracks/${_id}`} style={{textDecoration: 'none'}}>
                <div className="artist-card">
                    <img className="album-image" width="160px" src={`http://localhost:8000/images/${photo}`}
                         alt="Artist image"/>
                    <p className="album-name">{title}</p>
                    <p className="artist-description"><span style={{marginRight: '5px', color: 'white'}}>{dataRelease} ·</span><span style={{margin:0, color:'white', fontSize:'14px'}}>21 Трек ·</span> Альбом
                    </p>
                </div>
            </NavLink>
        </div>
    );
};

export default AlbumCard;