import React from 'react';
import { Link } from 'react-router';

export default class App extends React.Component {
  render() {
    return (
        <div>
            <div className="content">
                <Link to="/" className="logo">
                    <div className="lovespot">
                        <div className="bar bar-dark"/>
                        <div className="bar bar-med"/>
                        <div className="bar bar-light"/>
                        <h1 className="lovespot-logo"><div className="love">Love</div>Spot</h1>
                    </div>
                </Link>
                {this.props.children}
            </div>
        </div>
    );
  }
}
