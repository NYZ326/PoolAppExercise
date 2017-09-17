import React, { Component } from 'react';
import { Switch, Route, Link, NavLink } from 'react-router-dom';

import Leaderboard from './leaderboard';
import Players from './players';
import NewGame from './newGame';

// Main controller of application
class App extends Component {
    constructor(props) {
        super(props);
    }

    // *** Page Rendering *** 
    render() {
        // SVG Style Properties
        const poolNumberSpotStyle = {
            fill: '#ffffff',
            fillOpacity: 1,
            stroke: 'none',
            strokeWidth: 1.62119472,
            strokeLineCap: 'butt',
            strokeMiterLimit: 4,
            strokeDashArray: 'none',
            strokeOpacity: 1
        }

        const ellipsisStripStyle = {
            fill: '#ffffff',
            fillOpacity: 1,
            stroke: 'none',
            strokeWidth: 1.27028024,
            strokeLineCap: 'butt',
            strokeMiterLimit: 4,
            strokeDashArray: 'none',
            strokeOpacity: 1
        }

        const redBallStyle = {
            fill: '#c7000f',
            fillOpacity: 1,
            stroke: 'none',
            strokeWidth: 2.05699992,
            strokeLineCap: 'butt',
            strokeMiterLimit: 4,
            strokeDashArray: 'none',
            strokeOpacity: 1
        }

        const blueBallStyle = {
            fill: '#28397f',
            fillOpacity: 1,
            stroke: 'none',
            strokeWidth: 2.05699992,
            strokeLineCap: 'butt',
            strokeMiterLimit: 4,
            strokeDashArray: 'none',
            strokeOpacity: 1
        }

        const blackBallStyle = {
            fill: '#000000',
            fillOpacity: 1,
            stroke: 'none',
            strokeWidth: 2.05699992,
            strokeLineCap: 'butt',
            strokeMiterLimit: 4,
            strokeDashArray: 'none',
            strokeOpacity: 1
        }

        return (
            <div className="app-container">
                <div className="app-header-content">
                    <div className="container">
                        <div className="home-link desktop-display">
                            <Link to="/">Pool Track</Link>
                        </div>
                        <svg
                            className="app-logo desktop-display"
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            viewBox="0 0 39.687499 39.687501"
                            height="150"
                            width="150">
                            <g transform="translate(0,-257.31248)">
                                <circle
                                    r="6.7751312"
                                    cy="269.16092"
                                    cx="19.618984"
                                    style={blackBallStyle} />
                                <circle
                                    r="6.7751317"
                                    cy="284.41302"
                                    cx="11.174151"
                                    style={redBallStyle} />
                                <circle
                                    r="6.7751317"
                                    cy="282.16531"
                                    cx="28.834446"
                                    style={blueBallStyle} />
                                <ellipse
                                    ry="1.4449333"
                                    rx="3.7889361"
                                    cy="276.80304"
                                    cx="28.898664"
                                    style={ellipsisStripStyle} />
                                <ellipse
                                    ry="1.4449333"
                                    rx="3.7889361"
                                    cy="287.55975"
                                    cx="28.834446"
                                    style={ellipsisStripStyle} />
                                <circle
                                    r="2.9861956"
                                    cy="282.19745"
                                    cx="27.068417"
                                    style={poolNumberSpotStyle} />
                                <circle
                                    r="2.9861956"
                                    cy="284.47726"
                                    cx="9.3760109"
                                    style={poolNumberSpotStyle} />
                                <circle
                                    r="2.9861956"
                                    cy="269.19302"
                                    cx="17.788733"
                                    style={poolNumberSpotStyle} />
                            </g>
                        </svg>
                        <Link to="/" className={"mobile-display " + (location.pathname == '/newgame/progress' ? 'no-events' : '')}>
                            <h2>Pool Track</h2>
                            <svg
                                className="app-logo"
                                xmlns="http://www.w3.org/2000/svg"
                                version="1.1"
                                viewBox="0 0 39.687499 39.687501"
                                height="150"
                                width="150">
                                <g transform="translate(0,-257.31248)">
                                    <circle
                                        r="6.7751312"
                                        cy="269.16092"
                                        cx="19.618984"
                                        style={blackBallStyle} />
                                    <circle
                                        r="6.7751317"
                                        cy="284.41302"
                                        cx="11.174151"
                                        style={redBallStyle} />
                                    <circle
                                        r="6.7751317"
                                        cy="282.16531"
                                        cx="28.834446"
                                        style={blueBallStyle} />
                                    <ellipse
                                        ry="1.4449333"
                                        rx="3.7889361"
                                        cy="276.80304"
                                        cx="28.898664"
                                        style={ellipsisStripStyle} />
                                    <ellipse
                                        ry="1.4449333"
                                        rx="3.7889361"
                                        cy="287.55975"
                                        cx="28.834446"
                                        style={ellipsisStripStyle} />
                                    <circle
                                        r="2.9861956"
                                        cy="282.19745"
                                        cx="27.068417"
                                        style={poolNumberSpotStyle} />
                                    <circle
                                        r="2.9861956"
                                        cy="284.47726"
                                        cx="9.3760109"
                                        style={poolNumberSpotStyle} />
                                    <circle
                                        r="2.9861956"
                                        cy="269.19302"
                                        cx="17.788733"
                                        style={poolNumberSpotStyle} />
                                </g>
                            </svg>
                        </Link>
                        <div className="desktop-nav-container">
                            <nav className="desktop-nav">
                                <ul className="desktop-nav-list">
                                    <li>
                                        <NavLink exact to="/" activeClassName="active">Leaderboard</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/players" activeClassName="active">Players</NavLink>
                                    </li>
                                </ul>
                            </nav>
                            <div className={"new-game-action " + (location.pathname.includes('/newgame') ? '' : 'show')}>
                                <Link to="/newgame" className="btn btn-green w-logo"><i className="fa fa-plus"></i>New Game</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="app-main-content">
                    <Switch>
                        <Route exact path='/' component={Leaderboard} />
                        <Route path='/players' component={Players} />
                        <Route path='/newgame' component={NewGame} />
                    </Switch>
                </div>

                <footer className="app-footer-content">
                    <svg
                        className="app-logo"
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        viewBox="0 0 39.687499 39.687501"
                        height="150"
                        width="150">
                        <g transform="translate(0,-257.31248)">
                            <circle
                                r="6.7751312"
                                cy="269.16092"
                                cx="19.618984"
                                style={blackBallStyle} />
                            <circle
                                r="6.7751317"
                                cy="284.41302"
                                cx="11.174151"
                                style={redBallStyle} />
                            <circle
                                r="6.7751317"
                                cy="282.16531"
                                cx="28.834446"
                                style={blueBallStyle} />
                            <ellipse
                                ry="1.4449333"
                                rx="3.7889361"
                                cy="276.80304"
                                cx="28.898664"
                                style={ellipsisStripStyle} />
                            <ellipse
                                ry="1.4449333"
                                rx="3.7889361"
                                cy="287.55975"
                                cx="28.834446"
                                style={ellipsisStripStyle} />
                            <circle
                                r="2.9861956"
                                cy="282.19745"
                                cx="27.068417"
                                style={poolNumberSpotStyle} />
                            <circle
                                r="2.9861956"
                                cy="284.47726"
                                cx="9.3760109"
                                style={poolNumberSpotStyle} />
                            <circle
                                r="2.9861956"
                                cy="269.19302"
                                cx="17.788733"
                                style={poolNumberSpotStyle} />
                        </g>
                    </svg>
                </footer>

                <div className={"mobile-nav-container mobile-display " + (location.pathname.includes('/progress') || location.pathname.includes('/complete') ? 'hide' : '')}>
                    <nav className="mobile-nav">
                        <ul className="mobile-nav-list">
                            <li className="mobile-nav-item leaderboard">
                                <NavLink exact to="/" activeClassName="active">
                                    <i className="fa fa-trophy"></i>
                                    <span>Leaderboard</span>
                                </NavLink>
                            </li>
                            <li className="mobile-nav-item players">
                                <NavLink to="/players" activeClassName="active">
                                    <i className="fa fa-users"></i>
                                    <span>Players</span>
                                </NavLink>
                            </li>
                            <li className="mobile-nav-item new-game">
                                <NavLink to="/newgame" activeClassName="disabled">
                                    <i className="fa fa-plus"></i>
                                    <span>New Game</span>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}

export default App;

