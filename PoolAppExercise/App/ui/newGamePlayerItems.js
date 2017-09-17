import React, { Component } from 'react';
import ClassNames from 'classnames';

// New Game Player Selection Item Component
class NewGamePlayerItems extends Component {
    constructor(props) {
        super(props);

        this.selectPlayersForNewGame = this.selectPlayersForNewGame.bind(this);

        // Component state properties
        this.state = {
            activePlayer: {}
        }
    }


    // *** Select first and second player for new game ***
    selectPlayersForNewGame(player, event) {
        this.setState({
            activePlayer: player
        });

        // Trigger handler in parent component
        this.props.handleSelectedPlayers(player);
    }


    // *** Page rendering ***
    render() {
        const newGamePlayerItems = this.props.data.map((player, index) =>
            <li key={player.ID}
                className={ClassNames({
                    'selected': this.state.activePlayer == player,
                    'disabled': this.props.firstPlayer == player || this.props.secondPlayer == player
                })}
                onClick={this.selectPlayersForNewGame.bind(this, player)}>

                <div className="player-image">
                    <i className="fa fa-user"></i>
                </div>
                {player.FirstName + ' ' + player.LastName + ' (' + player.Username + ')'}

            </li>
        );

        return (
            <ul className="select-player-list">
                {newGamePlayerItems}
            </ul>
        );
    }
}

export default NewGamePlayerItems;