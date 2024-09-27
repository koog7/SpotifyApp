import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../app/store.ts";
import {deleteArtist, patchArtist} from "../containers/Thunk/PostSlice/DataSlice.ts";

interface Props {
    _id: string;
    name: string;
    photo: string;
    isPublished: boolean,
}

const ArtistCard: React.FC<Props> = ({ _id, name, photo, isPublished }) => {

    const userData = useSelector((state: RootState) => state.User.user);
    const dispatch = useDispatch<AppDispatch>()

    if (!userData && !isPublished) {
        return null;
    }

    if (userData && userData.role === 'user' && !isPublished) {
        return null;
    }

    const clickDelete = async (id: string) => {
        await dispatch(deleteArtist(id))
        await location.reload()
    }
    const clickPublish = async (id: string) => {
        await dispatch(patchArtist(id))
        await location.reload()
    }
    return (
        <div className="artist-card">
            <NavLink className="nav-link" to={`/album/${_id}`} style={{textDecoration: 'none'}}>
                <img className="artist-image" width="160px" src={`http://localhost:8000/images/${photo}`}
                     alt={`${name} image`}/>
                <p className="artist-name">{name}</p>
                <p className="artist-description">Исполнитель</p>
                {!isPublished && <div style={{fontSize: '12px', marginBottom: 0}}>Не опубликован</div>}
            </NavLink>

            {userData && userData.role === 'admin' && (
                <div>
                    <button onClick={() => clickDelete(_id)} style={{backgroundColor:'#d11a2a', border:"none"}}>Удалить</button>
                    {!isPublished && <button style={{marginLeft: '5px', backgroundColor:'#24a0ed', border:"none"}} onClick={() => clickPublish(_id)}>Опубликовать</button>}
                </div>
            )}
        </div>

    );
};

export default ArtistCard;