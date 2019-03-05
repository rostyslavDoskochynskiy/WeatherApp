import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { getLocationInfo } from "../../actions";
import Spinner from "../weather/Weather";
import { weatherStates } from "../../assets/weatherStates";
import Text from "../Text";

class CurrentLocation extends Component {
  state = {
    currentWeather: []
  };

  componentDidMount() {
    const { currentLocation, getLocationInfo } = this.props;
    if (currentLocation.country_name === "Ukraine")
      return getLocationInfo("Kiev");
    getLocationInfo(currentLocation.city);
  }

  componentWillReceiveProps(props) {
    this.setState({ currentWeather: props.selectedLocation });
  }

  renderWeatherForFiveDays = () => {
    const { consolidated_weather } = this.state.currentWeather;
    if (!consolidated_weather) return false;
    return consolidated_weather.map((e, i) => {
      let {
        applicable_date,
        weather_state_abbr,
        weather_state_name,
        max_temp,
        min_temp
      } = e;

      max_temp = max_temp.toFixed();
      min_temp = min_temp.toFixed();

      const now = new Date().toISOString().substring(0, 10);

      applicable_date = applicable_date === now ? "Today" : applicable_date;
      if (i === 1) applicable_date = "Tommorow";

      return (
        <tr key={i} className="weather__table-tr">
          <td className="weather__table-td">
            <Text className="date" text={applicable_date} />
          </td>
          <td className="weather__table-td">
            <div className="weather__img-wrapper">
              <img
                className="weather__icon"
                src={`${weatherStates[weather_state_abbr]}`}
                alt=""
              />
            </div>
            <Text className="description" text={weather_state_name} />
          </td>
          <td className="weather__table-td">
            <p className="high-temp">
              {max_temp}
              <sup>&deg;</sup>
            </p>
          </td>
          <td className="weather__table-td">
            <p className="low-temp">
              {min_temp}
              <sup>&deg;</sup>
            </p>
          </td>
        </tr>
      );
    });
  };

  renderData = () => {
    const { locationChecking } = this.props;
    const {
      country_code,
      country_name,
      city,
      latitude,
      longitude,
      state
    } = this.props.currentLocation;
    return locationChecking ? (
      <div className="weather__spinner">
        <Spinner />
      </div>
    ) : (
      <>
        <div className="current-location">
          <h1 className="current-location__title">Your location</h1>
          <ul className="current-location__data">
            <li className="current-location__item">
              Country CODE -{" "}
              <span className="current-location__data-item">
                {country_code}
              </span>
            </li>
            <li className="current-location__item">
              Country name -{" "}
              <span className="current-location__data-item">
                {country_name}
              </span>
            </li>
            <li className="current-location__item">
              City - <span className="current-location__data-item">{city}</span>
            </li>
            <li className="current-location__item">
              State -{" "}
              <span className="current-location__data-item">{state}</span>
            </li>
            <li className="current-location__item">
              Latitude -{" "}
              <span className="current-location__data-item">{latitude}</span>
            </li>
            <li className="current-location__item">
              Longitude -{" "}
              <span className="current-location__data-item">{longitude}</span>
            </li>
          </ul>
          <div className="weather">
            <h1 className="weather__title">The weather for five next days</h1>
            <table className="weather__table">
              <tbody>{this.renderWeatherForFiveDays()}</tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  render() {
    return <>{this.renderData()}</>;
  }
}

const mapStateToProps = ({ location }) => {
  return {
    currentLocation: location.currentLocation,
    selectedLocation: location.selectedLocation,
    locationChecking: location.loading
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getLocationInfo
    },
    dispatch
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CurrentLocation)
);
