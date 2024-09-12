import {NavLink} from "react-router-dom";

interface Props {
    name: string;
    photo: string;
}

const ArtistCard: React.FC<Props> = ({ name, photo }) => {
    return (
        <div>
            <NavLink className="nav-link" to={`/album/${123}`} style={{textDecoration: 'none'}}>
                <div className="artist-card">
                    <img className="artist-image" width="160px" src={`http://localhost:8000/images/${photo}`}
                         alt={`${name} image`}/>
                    <p className="artist-name">{name}</p>
                    <p className="artist-description">Исполнитель</p>
                </div>
            </NavLink>
        </div>
    );
};

export default ArtistCard;