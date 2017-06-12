import React, { PureComponent } from 'react';

export default class Music extends PureComponent {
    render() {
        let { music, toggleModal, i } = this.props;
        return (
            <div onClick={() => toggleModal(i)} className="romance-card">
                <img src={music.track.album.images[1].url} />
                <div className="romance-card-title">
                    <h3 className="artist"> {music.track.album.artists.map(artist => artist.name).join(', ')}</h3>
                    <h3 className="name"> {music.track.name}</h3>
                </div>
            </div>
        );
    }
}