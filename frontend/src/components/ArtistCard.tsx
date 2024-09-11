import {NavLink} from "react-router-dom";

const ArtistCard = () => {
    return (
        <div>
            <NavLink className="nav-link" to={`/album/${123}`} style={{textDecoration: 'none'}}>
                <div className="artist-card">
                    <img className="artist-image" width="160px" src="http://localhost:8000/images/artistOliver.jpg"
                         alt="Artist image"/>
                    <p className="artist-name">Oliver tree</p>
                    <p className="artist-description">Исполнитель</p>
                </div>
            </NavLink>
        </div>
    );
};

export default ArtistCard;