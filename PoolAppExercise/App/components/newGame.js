import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import NewGameDefault from './child/newGameDefault';
import NewGameProgress from './child/newGameProgress';
import NewGameComplete from './child/newGameComplete';

// New Game Main Component
class NewGame extends Component {
    constructor(props) {
        super(props);

        // Bind component handlers
        this.setGlobalSelectedPlayers = this.setGlobalSelectedPlayers.bind(this);
        this.confirmSelectedPlayers = this.confirmSelectedPlayers.bind(this);

        // Component state properties
        this.state = {
            rootSelectedPlayers: [],
            rootFirstPlayer: null,
            rootSecondPlayer: null
        };
    }


    // *** Set up global selected players ***
    setGlobalSelectedPlayers(type, player) {
        // Depending on type, set selected players accordingly
        switch (type) {
            case 'first':
                this.setState({
                    rootFirstPlayer: player
                });
                break;
            case 'second':
                this.setState({
                    rootSecondPlayer: player
                });
                break;
            default:
                break;
        };
    }


    // *** After selecting players for a new game, finalize the list ***
    confirmSelectedPlayers() {
        // Get rootSelectedPlayers array
        let selectedArray = this.state.rootSelectedPlayers;

        // Push selected first and second players
        selectedArray.push(this.state.rootFirstPlayer);
        selectedArray.push(this.state.rootSecondPlayer);

        // Set state properties
        this.setState({
            rootSelectedPlayers: selectedArray
        });
    }


    // *** Page Rendering ***
    render() {
        return (
            <Switch>
                <Route exact path='/newgame' render={(props) => (
                    <NewGameDefault setGlobal={this.setGlobalSelectedPlayers} finalizeSelection={this.confirmSelectedPlayers} />
                )} />
                <Route path={this.props.match.url + '/progress'} component={NewGameProgress} />
                <Route path={this.props.match.url + '/complete'} render={(props) => (
                    <NewGameComplete globalSelectedPlayers={this.state.rootSelectedPlayers} />
                )} />
            </Switch>
        )
    }
}

export default NewGame;