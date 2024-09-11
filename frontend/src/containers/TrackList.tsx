import React from 'react';

const TrackList = () => {
    return (
        <div>
            <div style={{display:'flex', marginTop:'50px'}}>
                <div>
                    <img className="album-image" width="160px" src="http://localhost:8000/images/OliverAlbum.jpeg"
                         alt="Artist image"/>
                </div>
                <div style={{marginLeft:'20px', marginTop:'auto', marginBottom:'10px'}}>
                    <p style={{margin:'0'}}>Альбом</p>
                    <h3 style={{margin:'0'}}>Ugly is Beautiful: Shorter, Tricker & Uglier (Deluxe)</h3>
                    <p style={{margin:'0'}}>Oliver Tree · 2021 · 12 Трек</p>
                </div>
            </div>
            <div>
                <div className="tracklist-container">
                    <table className="tracklist-table">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Название трека</th>
                            <th>Длительность</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>Let me down</td>
                            <td>1:51</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Hurt</td>
                            <td>2:25</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>I'm Gone</td>
                            <td>3:05</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TrackList;