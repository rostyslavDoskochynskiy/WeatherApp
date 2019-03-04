import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export const storeConfigs = app => (<Provider store={ store }>
        <BrowserRouter>
            { app }
        </BrowserRouter>
    </Provider>);