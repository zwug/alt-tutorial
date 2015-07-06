const alt = require('../alt');
const LocationFetcher = require('../utils/LocationFetcher');


class LocationActions {
  updateLocations(locations) {
    this.dispatch(locations);
  }

  fetchLocations() {
    this.dispatch();
    LocationFetcher.fetch().then((locations) => {
      this.actions.updateLocations(locations);
    }).catch((er) => {
      console.log(er);
      this.actions.locationsFailed(er);
    })
  }

  locationsFailed(errorMessage) {
    this.dispatch(errorMessage);
  }
}

module.exports = alt.createActions(LocationActions);
