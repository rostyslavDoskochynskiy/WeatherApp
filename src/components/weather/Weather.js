import React, { Component } from 'react';
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Spinner from "../spinner/Spinner";
import Text from "../Text";
import {weatherStates} from "../../assets/weatherStates";

class Weather extends Component {

    state = {
        cityName: '',
        currentWeatherFiveForecast: []
    };

    componentWillReceiveProps() {
        const { selectedLocation } = this.props.location;
        if(!selectedLocation) return false;

        const { consolidated_weather: currentWeatherFiveForecast, title: cityName } = this.props.location.selectedLocation;
        if(!cityName) return false;
        this.setState({ cityName });

        if(!currentWeatherFiveForecast) return false;
        return this.setState({ currentWeatherFiveForecast });
    }

    renderWeatherForFiveDays = () => {
        const { currentWeatherFiveForecast } = this.state;
        if (!currentWeatherFiveForecast) return false;
        return currentWeatherFiveForecast.map((e, i) => {
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

            applicable_date = applicable_date === now ? 'Today' : applicable_date;
            if(i === 1) applicable_date = 'Tommorow';

            return <tr key={i} className="weather__table-tr">
                <td className="weather__table-td"><Text className='date' text={applicable_date}/></td>
                <td className="weather__table-td">
                    <div className="weather__img-wrapper">
                        <img className="weather__icon" src={`${weatherStates[weather_state_abbr]}`} alt=""/>
                    </div>
                    <Text className='description' text={weather_state_name}/>
                </td>
                <td className="weather__table-td"><p className='high-temp'>{max_temp}<sup className='high-temp-icon'>&deg;</sup></p></td>
                <td className="weather__table-td"><p className='low-temp'>{min_temp}<sup className='low-temp-icon'>&deg;</sup></p></td>
            </tr>
        })
    };

    renderData = () => {
        const { locationChecking } = this.props;
        const { cityName } = this.state;
        return locationChecking ? <div className="weather__spinner"><Spinner/></div> : <>
            {!cityName ? '' : <Text className='weather__title' type='span' text={`5-day ${cityName} Weather Forecast`} />}
            <table className='weather__table'><tbody>{this.renderWeatherForFiveDays()}</tbody></table>
        </>;
    };

    render() {
        return <div className='weather'>
            {this.renderData()}
        </div>
    }
}

const mapStateToProps = ({ location }) => {
    return {
        location,
        locationChecking: location.loading,
        error: location.error
    };
};

export default withRouter(connect(mapStateToProps)(Weather));