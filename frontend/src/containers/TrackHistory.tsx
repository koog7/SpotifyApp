import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../app/store.ts";
import {useNavigate} from "react-router-dom";

const TrackHistory = () => {


    const userData = useSelector((state: RootState) => state.Artist.user);
    const navigate = useNavigate();

    useEffect(() => {
        if(!userData){
            navigate('/login')
        }
    }, [userData , navigate]);

    return (
        <div>

        </div>
    );
};

export default TrackHistory;