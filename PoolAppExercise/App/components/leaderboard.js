import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import { Link } from 'react-router-dom';

import PlayerService from './../services/playerServices';

import LeaderboardItems from './../ui/leaderboardItems';

// Dropdown Option Values
const dropdownOptions = [
    'Top 5',
    'Top 10'
];

// Leaderboard Component
class Leaderboard extends Component {
    constructor(props) {
        super(props);

        // Instantiate Player Services
        this.playerService = new PlayerService();

        // Bind component handlers
        this.selectTopPlayerOption = this.selectTopPlayerOption.bind(this);

        // Component state properties
        this.state = {
            loading: true,
            allPlayers: [],
            topPlayers: [],
            selected: dropdownOptions[0]
        }
    }


    // *** After HTML rendering, receive players list, sort them by wins and display top 5 players ***
    componentDidMount() {
        var self = this;

        this.playerService.getAllPlayers().then(function (response) {
            // Got data
            let players = response.data;

            // Sort players (Top 5) by most wins
            let topPlayers = players.sort((a, b) => b.Wins - a.Wins).slice(0, 5);

            // Set state properties
            self.setState({
                allPlayers: players,
                topPlayers: topPlayers,
                loading: false
            });
        });
    }


    // *** Select Top Players display option ***
    selectTopPlayerOption(option) {
        // Get players list
        let players = this.state.allPlayers;

        // Depending on the option passed, switch top players list
        switch (option.value) {
            case 'Top 5':
                players = players.sort((a, b) => b.Wins - a.Wins).slice(0, 5);

                this.setState({
                    topPlayers: players
                });
                break;
            case 'Top 10':
                players = players.sort((a, b) => b.Wins - a.Wins).slice(0, 10);

                this.setState({
                    topPlayers: players
                });
                break;
            default:
                break;
        }

        // Set state properties
        this.setState({
            selected: option
        });
    }

    // *** Page Render ***
    render() {
        const defaultOption = this.state.selected;

        return (
            <div className="page-container leaderboard-container">
                <div className="container">
                    <h2 className="page-title">Leaderboard</h2>
                    <Dropdown options={dropdownOptions} onChange={this.selectTopPlayerOption} value={defaultOption} className="top-players-filter" />
                    <div className="action-buttons-container">
                        <Link to="/players" className="btn btn-blue">Active Players</Link>
                    </div>
                    <div className="leaderboard-list-container">
                        <div className="table-data">
                            <LeaderboardItems data={this.state.topPlayers} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Leaderboard;