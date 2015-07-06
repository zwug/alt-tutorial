const alt = require('../alt');
const LocationActions = require('../actions/LocationActions');

class LocationStore {
  constructor() {
    this.locations = [];

    this.bindListeners({
      handleUpdateLocations: LocationActions.UPDATE_LOCATIONS
    });
  }
  
  handleUpdateLocations(locations) {
    this.locations = locations;
  }
}

module.exports = alt.createStore(LocationStore, 'LocationStore');
