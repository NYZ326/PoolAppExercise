import React, { Component } from 'react';
import Modal from 'react-modal';

import PlayerService from './../../services/playerServices';

// New Game Completion Component
class NewGameComplete extends Component {
    constructor(props) {
        super(props);

        // Instantiate Player Service
        this.playerService = new PlayerService();

        // Bind component handlers
        this.selectWinningPlayer = this.selectWinningPlayer.bind(this);
        this.confirmWinningPlayer = this.confirmWinningPlayer.bind(this);
        this.redirectToLeaderboard = this.redirectToLeaderboard.bind(this);

        // Component state properties
        this.state = {
            winnerConfirmed: false,
            winnerSelected: false,
            winner: {},
            loser: {}
        };
    }


    // *** Select the winning player ***
    selectWinningPlayer(winningPlayer) {
        let self = this;
        self.setState({
            winnerSelected: true
        });

        // Get the selected players
        let selectedPlayers = this.props.globalSelectedPlayers;

        // Loop through and assign the winner and the loser
        selectedPlayers.forEach(function (player) {
            if (winningPlayer == player) {
                self.setState({
                    winner: player
                });
            }
            else {
                self.setState({
                    loser: player
                });
            }
        });
    }


    // *** Confirm winning player and update their records ***
    confirmWinningPlayer() {
        let self = this;
        let resultsArray = [];

        // Get the winner and the loser
        let winPlayer = this.state.winner;
        let losePlayer = this.state.loser;

        // Update the wins and losses of each player and add to the results array
        winPlayer.Wins = winPlayer.Wins + 1;
        losePlayer.Losses = losePlayer.Losses + 1;

        resultsArray.push(winPlayer);
        resultsArray.push(losePlayer);

        // Update the backend with updated records
        this.playerService.updateMultiplePlayers(resultsArray).then(function (response) {
            self.setState({
                winnerConfirmed: true
            });
        });
    }


    // *** Redirect to Leaderboard ***
    redirectToLeaderboard() {
        window.location.pathname = '/';
    }


    // *** Page Rendering ***
    render() {
        let self = this;

        // Winner selection item component
        let winnerSelectionItems = this.props.globalSelectedPlayers.map(function (player, index) {
            return (
                <li key={player.ID} className={self.state.winner == player ? 'selected' : ''} onClick={self.selectWinningPlayer.bind(this, player)}>
                    {player.FirstName + ' ' + player.LastName + ' (' + player.Username + ')'}
                </li>
            )
        });

        return (
            <div className="page-container new-game-complete-container">
                <div className="container">
                    <h2 className="page-title game-page-title">Choose a Winner</h2>

                    <div className="winner-selection-container">
                        <ul className="players-list">
                            {winnerSelectionItems}
                        </ul>
                    </div>

                    <div className="confirm-button-container">
                        <button type="button" className="btn btn-green"
                            onClick={this.confirmWinningPlayer}
                            disabled={!this.state.winnerSelected}
                        >Confirm</button>
                    </div>
                </div>

                <Modal isOpen={this.state.winnerConfirmed}
                    contentLabel="Winner Confirmation Modal"
                    className="confirmation-modal"
                    overlayClassName="overlay-black"
                >
                    <div className="winner-player-icon">
                        <i className="fa fa-trophy"></i>
                    </div>
                    <h3>Congratulations, {this.state.winner.FirstName + ' ' + this.state.winner.LastName}!</h3>
                    <div className="modal-action-buttons-container">
                        <button type="button" className="btn btn-blue" onClick={this.redirectToLeaderboard}>Return to Leaderboard</button>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default NewGameComplete;