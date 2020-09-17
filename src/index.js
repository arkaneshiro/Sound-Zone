import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import configureStore from "./configureStore";

import App from "./App";
import "./index.css";

const preloadedState = {
    auth: {
        authToken: localStorage.getItem('soundzone-credentials'),
        currentUserId: localStorage.getItem('soundzone-user'),
        previewImgUrl: 'https://res.cloudinary.com/dgzcv1mcs/image/upload/v1589327406/Soundzone/default_avatar_avox09.jpg',
    },
    sound: {
        newWaveUrl: 'https://res.cloudinary.com/dgzcv1mcs/video/upload/fl_waveform,co_black,b_white/Soundzone/iudcrzymdneisc16tr7f.png'
    }
}

const store = configureStore(preloadedState);

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
