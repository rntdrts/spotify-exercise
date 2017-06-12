import React, { PureComponent } from 'react';
import Music from './Music';

export default class MusicListManager extends PureComponent {
    render() {
        let { musics, toggleModal, logout, userName } = this.props;
        return (
            <div>
                <div className="auth-logout">
                    <h5>Welcome back {userName}! <span onClick={logout}>Logout</span></h5>
                </div>
                <div className="content">
                    {musics.map((music, key) =>
                        <Music
                            key={key}
                            i={key}
                            toggleModal={toggleModal}
                            music={music}
                        />
                    )}
                </div>
            </div>
        );
    }
}
