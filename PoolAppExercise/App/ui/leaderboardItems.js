import React, { Component } from 'react';

// Leaderboard List Items Component
class LeaderboardItems extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        /* 
         * Render leaderboard items based on if the player is first place compared to other top players
         *
         * First place players renders their own UI
         * Other places renders list item UI
         * Appends column headers after First place player UI
        */
        const leaderboardItems = this.props.data.map((player, index) =>
            <li key={player.ID} className={index == 0 ? 'first-place-player' : ''}>
                { index == 0 
                    ?   <div className="first-place-container">
                            <div className="first-place-image">
                                <span className="mobile-rank first-place-color">1st</span>
                                <i className="fa fa-user"></i>
                            </div>
                            <div className="first-place-info">
                                <h3 className="full-name">{player.FirstName + ' ' + player.LastName}</h3>
                                <span className="username">{player.Username}</span>
                            </div>
                            <div className="first-place-stats">
                                <div className="rank-info">
                                    <h3 className="first-place-color">1st</h3>
                                    <span>Individual Rank</span>
                                </div>
                                <div className="wins-info">
                                    <h3 className={player.Wins > 0 ? 'wins-color' : ''}>{player.Wins}</h3>
                                    <span>Wins</span>
                                </div>
                                <div className="losses-info">
                                    <h3 className={player.Losses > 0 ? 'losses-color' : ''}>{player.Losses}</h3>
                                    <span>Losses</span>
                                </div>
                            </div>
                        </div>

                    : <div className="other-players-list">
                            {index == 1 &&
                                <div className="column-headers">
                                    <ul className="column-headers-list">
                                        <li className="column-header-item player-column">Player</li>
                                        <li className="column-header-item username-column">Username</li>
                                        <li className="column-header-item wins-column">Wins</li>
                                        <li className="column-header-item losses-column">Losses</li>
                                    </ul>
                                </div>
                            }
                            <div className="other-players-container">
                                <div className="rank-info">
                                    {index + 1}
                                </div>
                                <div className="player-info">
                                    <div className="player-image">
                                        <i className="fa fa-user"></i>
                                    </div>
                                    <div className="player-name">
                                        {player.FirstName + ' ' + player.LastName}
                                        <span className="mobile-display">{player.Username}</span>
                                    </div>
                                </div>
                                <div className="username-info">{player.Username}</div>
                                <div className={"wins-info " + (player.Wins > 0 ? 'wins-color' : '')}>{player.Wins}</div>
                                <div className={"losses-info " + (player.Losses > 0 ? 'losses-color' : '')}>{player.Losses}</div>
                            </div>
                        </div>
                }
            </li>
        );

        return (
            <ul className="table-data-list">
                {leaderboardItems}
            </ul>
        );
    }
}

export default LeaderboardItems;