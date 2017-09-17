import React, { Component } from 'react';

// Players Item Component
class PlayerItems extends Component {
    constructor(props) {
        super(props);

        this.toggleSelectedPlayer = this.toggleSelectedPlayer.bind(this);

        // Add selected flag property to players data
        this.props.data.forEach(function (player) {
            player.selected = false;
        });
    }


    // *** Toggle selected player ***
    toggleSelectedPlayer(player, event) {
        event.stopPropagation();
        // Set player flag
        player.selected = !player.selected;

        // Copy state array of IDs and either remove or add depending on the selected flag
        let selectedPlayersArray = this.props.selectedPlayers;

        let index = selectedPlayersArray.indexOf(player.ID);

        if (index > -1) {
            selectedPlayersArray.splice(index, 1);
        }
        else {
            selectedPlayersArray.push(player.ID);
        }

        // Set updated info and pass it to the parent component for further actions (delete, copy, etc)
        this.props.handleSelectedPlayers(selectedPlayersArray);
    }

    render() {
        const playerItems = this.props.data.map((player, index) =>
            <li key={player.ID} className={player.selected ? 'selected': ''} onClick={this.toggleSelectedPlayer.bind(this, player)}>
                <div className="player-info">
                    <div className="select-button-container">
                        <span className={"select-button " + (player.selected ? 'selected' : '')}>
                            <i className="fa fa-check"></i>
                        </span>
                    </div>
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
            </li>
        );

        return (
            <ul className="table-data-list">
                {playerItems}
            </ul>
        );
    }
}

export default PlayerItems;