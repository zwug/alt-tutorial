const React = require('react');
const LocationStore = require('./stores/LocationStore');
const LocationActions = require('./actions/LocationActions');

const App = React.createClass({
  getInitialState() {
    return LocationStore.getState();
  },

  componentDidMount() {
    LocationStore.listen(this.onChange);

    LocationActions.fetchLocations();
  },

  componentWillUnmount() {
    LocationStore.unlisten(this.onChange);
  },

  onChange(state) {
    this.setState(state);
  },

  render() {
    if (this.state.errorMessage) {
      return (
        <div>Something is wrong</div>
      );
    }

    if (!this.state.locations.length) {
      return (
        <div>
          <img src="https://www.ecisurveys.com/Images/spinner.gif" />
        </div>
      )
    }
    return (
      <ul>
        {this.state.locations.map((location) => {
          return (
            <li>{location.name}</li>
          );
        })}
      </ul>
    )
  }
});

module.exports = App;
