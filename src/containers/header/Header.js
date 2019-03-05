import React, { Component } from "react";
import DropdownComponent from "../../components/Dropdown";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { SearchInput } from "../../components/SingleInput";
import { getCities, getLocationInfo } from "../../actions";
import { Icon } from "antd";

class Header extends Component {
  state = {
    allCities: [],
    cities: [],
    error: "",
    stateTips: "none"
  };

  componentWillReceiveProps() {
    const { cities, allCities } = this.props.location;
    if (!cities) return false;
    let citiesName = [];
    for (const city of cities) {
      citiesName.push(city.title);
    }
    this.setState({ cities: citiesName });

    if (!allCities) return false;
    this.setState({ allCities });
  }

  render() {
    const { allCities, stateTips } = this.state;

    if (!allCities) return false;
    const renderCities = allCities.map((e, i) => {
      return (
        <li
          className="header__tips-items"
          onClick={e => handleChooseCity(e)}
          key={i}
        >
          {e.title}
        </li>
      );
    });

    const {
      logOutUser,
      disabledAutoComplete,
      showCurrentLocation
    } = this.props;
    const items = [
      {
        name: "Settings",
        action: ""
      },
      {
        name: "Logout",
        action: logOutUser
      }
    ];

    const clearInput = () => {
      const inputElem = document.getElementsByTagName("input")[0];
      return (inputElem.value = "");
    };

    const handleChooseCity = async e => {
      const { innerText: itemValue } = e.target;
      const {
        getLocationInfo,
        selectedLocation,
        hideCurrentLocation
      } = this.props;
      const { selectedLocation: data } = this.props.location;
      hideCurrentLocation();
      this.setState({ stateTips: "none" });
      await getLocationInfo(itemValue);
      selectedLocation(data);
      return clearInput();
    };

    const onSearch = async value => {
      const {
        getLocationInfo,
        selectedLocation,
        hideCurrentLocation
      } = this.props;
      const { selectedLocation: data } = this.props.location;
      if (!value) return false;
      this.setState({ stateTips: "none" });
      hideCurrentLocation();
      await getLocationInfo(value);
      selectedLocation(data);
      return clearInput();
    };

    const handleOnChange = async ({ target }) => {
      const { getCities } = this.props;
      if (target.value.length <= 0) {
        this.setState({ stateTips: "none" });
        return false;
      }
      this.setState({ stateTips: "block" });
      await getCities(target.value);
    };

    return (
      <div className="header" id="js-header">
        <div className="header__cities">
          <SearchInput
            style={{ width: "80%" }}
            placeholder="Search city"
            action={onSearch}
            onChange={handleOnChange}
            disabled={disabledAutoComplete}
            enterButton
          />
          <ul className="header__tips" style={{ display: stateTips }}>
            {renderCities}
          </ul>
        </div>
        <div className="header__action-wrapper">
          <img
            alt=""
            className="header__action-icon"
            onClick={() => showCurrentLocation()}
            src="https://img.icons8.com/color/48/000000/map-pin.png"
          />
          <DropdownComponent
            trigger={["click"]}
            overlay={items}
            container="js-header"
            href="/auth"
            content={<Icon className="header__drop" type="down" />}
            action={logOutUser}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ location }) => {
  return {
    location,
    disabledAutoComplete: location.disabledAutoComplete
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getLocationInfo,
      getCities
    },
    dispatch
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
