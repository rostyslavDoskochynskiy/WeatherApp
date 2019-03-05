import {
  ALL_CITIES,
  CURRENT_LOCATION,
  GET_LOCATION,
  GET_SELECTED_LOCATION_FAILED,
  GET_SELECTED_LOCATION_START,
  GET_SELECTED_LOCATION_SUCCESS
} from "../actions/types";

const initialState = {
  cities: [],
  selectedLocation: {},
  error: null,
  loading: false,
  disabledAutoComplete: false
};

const reducer = (state = initialState, action) => {
  const { type, payload, error } = action;
  switch (type) {
    case CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: { ...payload }
      };
    case ALL_CITIES:
      return {
        ...state,
        allCities: [...payload]
      };
    case GET_LOCATION:
      return {
        ...state,
        cities: [...state.cities, ...payload]
      };
    case GET_SELECTED_LOCATION_START:
      return {
        ...state,
        loading: true,
        disabledAutoComplete: true,
        error: ""
      };
    case GET_SELECTED_LOCATION_FAILED:
      return {
        ...state,
        loading: false,
        disabledAutoComplete: false,
        error
      };
    case GET_SELECTED_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        disabledAutoComplete: false,
        error: null,
        selectedLocation: { ...payload }
      };
    default:
      return state;
  }
};

export default reducer;
