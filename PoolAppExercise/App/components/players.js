import React, { Component } from 'react';
import Modal from 'react-modal';

import PlayerService from './../services/playerServices';

import PlayerItems from './../ui/playerItems';

// Player Component
class Player extends Component {
    constructor(props) {
        super(props);

        // Instantiate Player Service
        this.playerService = new PlayerService();

        // Bind component handlers
        this.getAllPlayers = this.getAllPlayers.bind(this);
        this.deletePlayers = this.deletePlayers.bind(this);
        this.toggleNewPlayerModal = this.toggleNewPlayerModal.bind(this);
        this.toggleNotificationModal = this.toggleNotificationModal.bind(this);
        this.toggleConfirmationModal = this.toggleConfirmationModal.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleAddPlayerFormSubmit = this.handleAddPlayerFormSubmit.bind(this);
        this.resetFormValuesToDefault = this.resetFormValuesToDefault.bind(this);
        this.selectPlayers = this.selectPlayers.bind(this);

        // Component state properties
        this.state = {
            players: [],
            selectedPlayers: [],
            playerFirstName: '',
            playerLastName: '',
            playerUsername: '',
            formErrors: {
                playerFirstName: '',
                playerLastName: '',
                playerUsername: '',
            },
            notificationMessage: '',
            loading: true,
            showNewPlayerModal: false,
            showNotification: false,
            showConfirmationModal: false,
            firstNameValid: false,
            lastNameValid: false,
            userNameValid: false,
            formValid: false,
            formSubmitted: false
        };
    }


    // *** After HTML rendering, get players list ***
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


    // *** Delete player/players call ***
    deletePlayers() {
        var self = this;

        this.playerService.deletePlayers(this.state.selectedPlayers).then(function (response) {
            // Reset defaults
            self.setState({
                loading: true,
                showConfirmationModal: false,
                selectedPlayers: []
            });

            // Get new players list
            self.getAllPlayers();

            // Set state properties
            self.setState({
                notificationMessage: 'Selected Players Deleted'
            });

            // Toggle notification modal
            self.toggleNotificationModal();
        });
    }


    // *** Toggle Show/Hide Modal ***
    toggleNewPlayerModal() {
        this.setState({
            showNewPlayerModal: !this.state.showNewPlayerModal
        });

        // Reset form values to state default
        this.resetFormValuesToDefault();
    }


    // *** Toggle Show/Hide Notification Modal ***
    toggleNotificationModal() {
        this.setState({
            showNotification: !this.state.showNotification
        });
    }


    // *** Toggle Show/Hide Confirmation Modal ***
    toggleConfirmationModal() {
        this.setState({
            showConfirmationModal: !this.state.showConfirmationModal
        });
    }


    // *** Handle user input for any fields ***
    handleUserInput(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        }, () => { this.validateField(name, value) });
    }


    // *** Validate field on input and set appropriate flags to submit form ***
    validateField(fieldName, value) {
        // Get the current values to update
        let fieldValidationErrors = this.state.formErrors;
        let firstNameValid = this.state.firstNameValid;
        let lastNameValid = this.state.lastNameValid;
        let userNameValid = this.state.userNameValid;

        // Validate against each field of the form
        switch (fieldName) {
            case 'playerFirstName':
                firstNameValid = value.length > 0;
                fieldValidationErrors.playerFirstName = firstNameValid ? '' : 'Required';
                break;
            case 'playerLastName':
                lastNameValid = value.length > 0;
                fieldValidationErrors.playerLastName = lastNameValid ? '' : 'Required';
                break;
            case 'playerUsername':
                userNameValid = value.length > 0;
                fieldValidationErrors.playerUsername = userNameValid ? '' : 'Required';
                break;
            default:
                break;
        }

        // Set the state to the updated values after validation
        this.setState({
            formErrors: fieldValidationErrors,
            firstNameValid: firstNameValid,
            lastNameValid: lastNameValid,
            userNameValid: userNameValid
        }, this.validateForm);
    }


    // *** Set if the form is valid based on user input ***
    validateForm() {
        this.setState({ formValid: this.state.firstNameValid && this.state.lastNameValid && this.state.userNameValid });
    }


    // *** Handle the form submission after form is valid ***
    handleAddPlayerFormSubmit(event) {
        event.preventDefault();
        let self = this;

        // Set appropriate values for form submission
        self.setState({
            formSubmitted: true
        });

        let properties = {
            FirstName: this.state.playerFirstName,
            LastName: this.state.playerLastName,
            Username: this.state.playerUsername
        }

        // Add players, reset defaults and get new players list
        this.playerService.addPlayer(properties).then(function (response) {
            // Reset defaults
            self.setState({
                loading: true,
                showNewPlayerModal: false,
            });

            self.resetFormValuesToDefault();

            // Get new players list
            self.getAllPlayers();

            // Set state properties
            self.setState({
                notificationMessage: 'New Player Added'
            });

            // Toggle notification modal
            self.toggleNotificationModal();
        });
    }


    // *** Reset state values to default ***
    resetFormValuesToDefault() {
        this.setState({
            playerFirstName: '',
            playerLastName: '',
            playerUsername: '',
            formErrors: {
                playerFirstName: '',
                playerLastName: '',
                playerUsername: '',
            },
            firstNameValid: false,
            lastNameValid: false,
            userNameValid: false,
            formValid: false,
            formSubmitted: false
        })
    }


    // *** Handle selecting specific players ***
    selectPlayers(array) {
        this.setState({
            selectedPlayers: array
        });
    }


    // *** Page Render ***
    render() {
        return (
            <div className="page-container players-container">
                <div className="container">
                    <h2 className="page-title">Active Players</h2>
                    <p className="helper-text mobile-display">Select on any user to perform certain actions</p>
                    <div className="action-buttons-container">
                        <button type="button" className="btn btn-green w-logo" onClick={this.toggleNewPlayerModal}><i className="fa fa-plus"></i> New Player</button>
                    </div>
                    <div className="players-list-container">
                        <div className="column-headers">
                            <ul className="column-headers-list">
                                <li className="column-header-item player-column">Player</li>
                                <li className="column-header-item username-column">Username</li>
                                <li className="column-header-item wins-column">Wins</li>
                                <li className="column-header-item losses-column">Losses</li>
                            </ul>
                        </div>
                        <div className="table-data">
                            <PlayerItems data={this.state.players} handleSelectedPlayers={this.selectPlayers} selectedPlayers={this.state.selectedPlayers} />
                        </div>
                    </div>
                </div>

                <div className={"selected-action-container " + (this.state.selectedPlayers.length > 0 ? 'show' : '')}>
                    <div className="container">
                            <p className="selected-count-text"><span className="selected-count">{this.state.selectedPlayers.length}</span> player selected</p>
                            <button type="button" className="btn btn-red w-logo" disabled={this.state.selectedPlayers.length == 0} onClick={this.toggleConfirmationModal}><i className="fa fa-trash"></i> Delete Players</button>
                    </div>
                </div>

                <Modal
                    isOpen={this.state.showNewPlayerModal}
                    contentLabel="New Player Modal"
                    className="creation-modal"
                    overlayClassName="overlay-black">
                    <button type="button" className="close-icon" onClick={this.toggleNewPlayerModal}>
                        <i className="fa fa-close"></i>
                    </button>
                    <div className="add-player-form-container">
                        <div className="add-player-icon">
                            <i className="fa fa-user"></i>
                        </div>
                        <form className="add-player-form" name="add-player-form" id="add-player-form">
                            <div className="input-field-container">
                                <input className="input-field" type="text" name="playerFirstName" value={this.state.playerFirstName} onChange={(event) => this.handleUserInput(event)} />
                                <label htmlFor="playerFirstName">First Name *</label>
                                <div className="error-message">
                                    <span>{this.state.formErrors.playerFirstName}</span>
                                </div>
                            </div>
                            <div className="input-field-container">
                                <input className="input-field" type="text" name="playerLastName" value={this.state.playerLastName} onChange={(event) => this.handleUserInput(event)} />
                                <label htmlFor="playerLastName">Last Name *</label>
                                <div className="error-message">
                                    <span>{this.state.formErrors.playerLastName}</span>
                                </div>
                            </div>
                            <div className="input-field-container">
                                <input className="input-field" type="text" name="playerUsername" value={this.state.playerUsername} onChange={(event) => this.handleUserInput(event)} />
                                <label htmlFor="playerUsername">Username *</label>
                                <div className="error-message">
                                    <span>{this.state.formErrors.playerUsername}</span>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="add-button-container">
                        <button type="button" className="btn btn-blue btn-add" onClick={(event) => this.handleAddPlayerFormSubmit(event)} disabled={!this.state.formValid || this.state.formSubmitted}>Add Player</button>
                    </div>
                </Modal>

                <Modal
                    isOpen={this.state.showNotification}
                    contentLabel="New Player Notification Modal"
                    className="notification-modal"
                    overlayClassName="overlay-none"
                >
                    <button type="button" className="close-icon" onClick={this.toggleNotificationModal}>
                        <i className="fa fa-close"></i>
                    </button>
                    <p>{this.state.notificationMessage}</p>
                </Modal>

                <Modal
                    isOpen={this.state.showConfirmationModal}
                    contentLabel="Delete Confirmation Modal"
                    className="confirmation-modal"
                    overlayClassName="overlay-black"
                >
                    <div className="delete-player-icon">
                        <i className="fa fa-warning"></i>
                    </div> 
                    <p>Are you sure you want to delete the selected players?</p>
                    <div className="modal-action-buttons-container">
                        <button type="button" className="btn btn-cancel" onClick={this.toggleConfirmationModal}>Cancel</button>
                        <button type="button" className="btn btn-red" onClick={this.deletePlayers}>Delete</button>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Player;