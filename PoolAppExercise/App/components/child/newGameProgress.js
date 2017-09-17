import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// New Game Progress Component
class NewGameProgress extends Component {
    constructor(props) {
        super(props);
    }

    // *** Page rendering *** 
    render() {
        return (
            <div className="page-container new-game-progress-container">
                <div className="new-game-progress-center">
                    <h2 className="page-title game-page-title">Game In Progress</h2>

                    <div className="progress-loader">
                        <div className="dot dot-1"></div>
                        <div className="dot dot-2"></div>
                        <div className="dot dot-3"></div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                        <defs>
                            <filter id="goo">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7" />
                            </filter>
                        </defs>
                    </svg>

                    <div className="end-game-button">
                        <Link to="/newgame/complete" className="btn btn-red">End Game</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewGameProgress;