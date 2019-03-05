import React, { Component } from "react";
import { Redirect, withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCurrentLocation, getLocationInfo, logOutUser } from "../../actions";
import Header from "../header/Header";
import Weather from "../../components/weather/Weather";
import { ModalBasic } from "../../components/Modal";
import CurrentLocation from "../../components/currentLocation/CurrentLocation";

class Profile extends Component {
  state = {
    selectedLocation: null,
    error: false,
    showCurrentLocation: true
  };

  componentDidMount() {
    const { getCurrentLocation } = this.props;
    getCurrentLocation();
  }

  hideCurrentLocation = () => this.setState({ showCurrentLocation: false });
  showCurrentLocation = () => this.setState({ showCurrentLocation: true });

  cancelError = () => this.setState({ error: false });

  closeModal = () =>
    this.setState({ error: false, currentLocationScreen: <CurrentLocation /> });

  selectedLocation = selectedLocation => this.setState({ selectedLocation });

  componentWillReceiveProps({ locationError }) {
    if (!locationError) return false;
    this.setState({ error: locationError });
  }

  render() {
    const { user } = this.props.auth;
    if (!user) {
      return <Redirect to="/auth" />;
    } else {
      const { showCurrentLocation, selectedLocation, error } = this.state;
      const { locationError } = this.props;
      const currentLocationScreen = this.state.currentLocationScreen
        ? this.state.currentLocationScreen
        : "";
      const greetingModalText =
        "Please tap OK and allow app to get your current location. Thanks:)";
      return (
        <div className="profile" id="js-profile">
          <div className="profile__container">
            <Header
              showCurrentLocation={this.showCurrentLocation}
              hideCurrentLocation={this.hideCurrentLocation}
              selectedLocation={this.selectedLocation}
              {...this.props}
            />
            <div className="profile__content">
              <ModalBasic
                id=""
                classNameText="signup__title"
                className="signup__modal"
                closeModal={this.closeModal}
                container="js-profile"
                text={greetingModalText}
              />
              {showCurrentLocation ? (
                currentLocationScreen
              ) : error ? (
                <ModalBasic
                  id="modal"
                  closeModal={this.cancelError}
                  classNameText="signup__title"
                  className="signup__modal"
                  container="js-profile"
                  text={locationError}
                />
              ) : (
                <Weather
                  selectedLocation={selectedLocation ? selectedLocation : {}}
                  {...this.props}
                />
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = ({ auth, location }) => {
  return {
    auth,
    locationError: location.error
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCurrentLocation,
      logOutUser,
      getLocationInfo
    },
    dispatch
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Profile)
);
