import {NavLink} from "react-router-dom";

interface Props {
    _id: string;
    name: string;
    photo: string;
    isPublished: boolean,
}

const ArtistCard: React.FC<Props> = ({ _id, name, photo, isPublished }) => {
    return (
        <div>
            <NavLink className="nav-link" to={`/album/${_id}`} style={{textDecoration: 'none'}}>
                <div className="artist-card">
                    <img className="artist-image" width="160px" src={`http://localhost:8000/images/${photo}`}
                         alt={`${name} image`}/>
                    <p className="artist-name">{name}</p>
                    <p className="artist-description">Исполнитель</p>
                    {isPublished ? <></> : <div style={{fontSize:'12px', marginBottom: 0}}>Не опубликован</div>}
                </div>
            </NavLink>
        </div>
    );
};

export default ArtistCard;