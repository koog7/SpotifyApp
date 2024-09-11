import {NavLink} from "react-router-dom";

const AlbumCard = () => {
    return (
        <div>
            <NavLink className="nav-link" to={`/album/${123}/${123}`} style={{textDecoration: 'none'}}>
                <div className="artist-card">
                    <img className="album-image" width="160px" src="http://localhost:8000/images/OliverAlbum.jpeg"
                         alt="Artist image"/>
                    <p className="artist-name">Ugly is beautiful</p>
                    <p className="artist-description"><span style={{marginRight: '5px', color: 'white'}}>2020 ·</span><span style={{margin:0, color:'white', fontSize:'14px'}}>21 Трек ·</span> Альбом
                    </p>
                </div>
            </NavLink>
        </div>
    );
};

export default AlbumCard;