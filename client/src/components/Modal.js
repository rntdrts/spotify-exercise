import React from 'react';

export default class Modal extends React.Component {
    render() {
        let { music, toggleModal } = this.props;

        return (
            <div className="modal" style={{display: music instanceof Array ? 'none' : 'block'}}>
                { music instanceof Array ? null :
                    <div className="modal-content">
                        <span onClick={() => toggleModal(null)} className="close">&times;</span>
                        <div className="modal-image">
                            <img src={music.track.album.images[0].url} />
                        </div>
                        <iframe
                            src={"https://open.spotify.com/embed?uri="+music.track.uri}
                            width="100%"
                            height="85"
                        />
                        <div className="modal-info">
                            { music.track.album.artists.map(artist =>
                                <div className="artist-info">
                                    <h3 className="artist-title">Artist</h3>
                                    <p>{artist.name}</p>
                                    <a target="_blank" href={artist.external_urls.spotify} >more...</a>
                                </div>
                            )}
                            <div className="music-info">
                                <h3 className="artist-title">Album</h3>
                                <p>{music.track.album.name}</p>
                                <a target="_blank" href={music.track.album.external_urls.spotify} >more...</a>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}