import Axios from 'axios';
import qs from 'qs';

class PlayerServices {
    // Get All Players service call
    getAllPlayers() {
        return Axios.get(GLOBAL_BASE_URL + 'players/all')
            .then(function (data) {
                return data;
            })
            .catch(function (error) {
                console.error(error);
            });
    }


    // Get player service call
    getPlayer(id) {

    }


    // Add player service call
    addPlayer(player) {
        return Axios.post(GLOBAL_BASE_URL + 'players/add', qs.stringify(player))
            .then(function (data) {
                return data;
            })
            .catch(function (error) {
                console.error(error);
            })
    }


    // Update player service call
    updatePlayer(player) {

    }


    // Update multiple players service call
    updateMultiplePlayers(playersList) {
        return Axios.put(GLOBAL_BASE_URL + 'players/update/multiple', playersList)
            .then(function (data) {
                return data;
            })
            .catch(function (error) {
                console.error(error);
            });
    }


    // Delete multiple players service call
    deletePlayers(selectedIds) {
        return Axios.delete(GLOBAL_BASE_URL + 'players/delete/multiple', {
            headers: {
                'Content-Type': 'application/json'
            },
            data: selectedIds
        })
            .then(function (data) {
                return data;
            })
            .catch(function (error) {
                console.error(error);
            });
    }
}

export default PlayerServices;