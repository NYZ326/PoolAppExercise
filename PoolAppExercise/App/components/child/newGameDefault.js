import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PlayerService from './../../services/playerServices';

import NewGamePlayerItems from './../../ui/newGamePlayerItems';

// New Game Default Page Component
class NewGameDefault extends Component {
    constructor(props) {
        super(props);

        // Instantiate Player Service
        this.playerService = new PlayerService();

        // Bind component handlers
        this.handleSelectedPlayers = this.handleSelectedPlayers.bind(this);
        this.setPlayers = this.setPlayers.bind(this);
        this.resetToDefaults = this.resetToDefaults.bind(this);

        // Component state properties
        this.state = {
            players: [],
            selectPlayerText: 'Select First Player',
            selectedPlayer: null,
            firstPlayer: null,
            secondPlayer: null,
            loading: true,
            firstPlayerSet: false,
            secondPlayerSet: false
        };
    }


    // *** After HTML rendering, receive players list ***
    componentDidMount() {
        this.getAllPlayers();
    }


    // *** Get players list call ***
    getAllPlayers() {
        var self = this;

        this.playerService.getAllPlayers().then(function (response) {
            self.setState({
                players: response.data,
                loading: false
            });
        });
    }


    // *** Handle Selected Players to assign both first and second players ***
    handleSelectedPlayers(player) {
        this.setState({
            selectedPlayer: player
        });
    }


    // *** Set first or second player based on what's selected
    setPlayers() {
        // Get selected player info
        let player = this.state.selectedPlayer;

        // Set appropriate player info based on flags (firstPlayerSet || secondPlayerSet)
        if (!this.state.firstPlayerSet) {
            this.setState({
                firstPlayer: player,
                firstPlayerSet: true,
                selectPlayerText: 'Select Second Player'
            });

            this.props.setGlobal('first', player);
        }
        else {
            this.setState({
                secondPlayer: player,
                secondPlayerSet: true,
                selectPlayerText: 'Start Game'
            });

            this.props.setGlobal('second', player);
        }

        // Set state properties
        this.setState({
            selectedPlayer: null
        });
    }


    // *** Reset default settings ***
    resetToDefaults() {
        this.setState({
            selectPlayerText: 'Select First Player',
            selectedPlayer: null,
            firstPlayer: null,
            secondPlayer: null,
            firstPlayerSet: false,
            secondPlayerSet: false
        });
    }


    // *** Page rendering ***
    render() {
        return (
            <div className="page-container new-game-container">
                <div className="container">
                    <h2 className="page-title game-page-title desktop-display">New Game</h2>

                    <div className="new-game-select-container">
                        <div className="selected-player-container first-player">
                            <h3>1st</h3>
                            <div className={"selected-player-image " + (this.state.firstPlayerSet ? 'first-set' : '')}>
                                <i className="fa fa-user"></i>
                            </div>
                            <div className="selected-player-info" title={this.state.firstPlayerSet
                                ? this.state.firstPlayer.FirstName + ' ' + this.state.firstPlayer.LastName + ' (' + this.state.firstPlayer.Username + ')'
                                : ''
                            }>
                                {this.state.firstPlayerSet
                                    ? this.state.firstPlayer.FirstName + ' ' + this.state.firstPlayer.LastName + ' (' + this.state.firstPlayer.Username + ')'
                                    : ''
                                }
                            </div>
                        </div>

                        <div className="select-player-list-container">
                            <NewGamePlayerItems
                                data={this.state.players}
                                handleSelectedPlayers={this.handleSelectedPlayers}
                                firstPlayer={this.state.firstPlayer}
                                secondPlayer={this.state.secondPlayer}
                            />
                        </div>

                        <div className="selected-player-container second-player">
                            <h3>2nd</h3>
                            <div className={"selected-player-image " + (this.state.secondPlayerSet ? 'second-set' : '')}>
                                <i className="fa fa-user"></i>
                            </div>
                            <div className="selected-player-info" title={this.state.secondPlayerSet
                                ? this.state.secondPlayer.FirstName + ' ' + this.state.secondPlayer.LastName + ' (' + this.state.secondPlayer.Username + ')'
                                : ''
                            }>
                                {this.state.secondPlayerSet
                                    ? this.state.secondPlayer.FirstName + ' ' + this.state.secondPlayer.LastName + ' (' + this.state.secondPlayer.Username + ')'
                                    : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="new-game-action-container">
                    <div className="container">
                        <div className="select-player-action">
                            <button type="button"
                                className={"btn btn-cancel " + (this.state.firstPlayerSet ? 'show' : '')}
                                onClick={this.resetToDefaults}>
                                Start Over
                            </button>

                            <h3>{this.state.selectPlayerText}</h3>

                            <button type="button"
                                className={"btn btn-blue btn-select " + (this.state.firstPlayerSet && this.state.secondPlayerSet
                                    ? 'hide'
                                    : '')} disabled={this.state.selectedPlayer == null}
                                onClick={this.setPlayers}>
                                Select
                            </button>
                            <Link to="/newgame/progress"
                                className={"btn btn-green btn-start " + (this.state.firstPlayerSet && this.state.secondPlayerSet
                                    ? 'show'
                                    : '')}
                                onClick={this.props.finalizeSelection}
                            >
                                Start Game
                            </Link>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}

export default NewGameDefault;