import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { Modal, MusicListManager } from '../components';
import * as spotifyActionCreators from '../redux/actions/spotify';
import * as authActionCreators from '../redux/actions/auth';
import { toastr } from 'react-redux-toastr';

class RomanticContainer extends Component {
    constructor (props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleScroll =  this.handleScroll.bind(this);
    }

    componentDidMount () {
        this.getMusics();
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount () {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll () {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            this.getMusics();
        }
    }

    toggleModal (index) {
        if (index === null) {
            this.props.musicActions.showSelectedMusic([]);
        } else {
            this.props.musicActions.showSelectedMusic(this.props.musics[index]);
        }
    }

    getMusics () {
        if (!this.props.loading)
            this.props.musicActions.getMusics(this.props.offset);
    }

    logout () {
        this.props.authActions.logoutUser();
        toastr.success('LoveSpot', 'Your are now logged out!');
        localStorage.removeItem('token');
    }

    render () {
        const { musics, userName, selectedMusic, loading } = this.props;

        return (
            <div>
                <Modal music={selectedMusic} toggleModal={this.toggleModal} />
                <MusicListManager
                    musics={musics}
                    toggleModal={this.toggleModal}
                    userName={userName}
                    logout={this.logout}
                />
                { loading ? <div className="loading"/> : null}
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        musics: state.getIn(['spotify', 'list'], Immutable.List()).toJS(),
        selectedMusic: state.getIn(['spotify', 'selectedMusic'], Immutable.List()).toJS(),
        offset: state.getIn(['spotify', 'offset']),
        loading: state.getIn(['spotify', 'loading']),
        userName: state.getIn(['auth', 'name'])
    }
}

function mapDispatchToProps (dispatch) {
    return {
        musicActions: bindActionCreators(spotifyActionCreators, dispatch),
        authActions: bindActionCreators(authActionCreators, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(RomanticContainer);
