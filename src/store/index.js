import { applyMiddleware, createStore } from 'redux';
import { compose } from 'recompose';
import rootReducer from '../reducers';

// Logger with default options 
//import logger from 'redux-logger'
//const store = createStore(rootReducer, applyMiddleware(logger));

const middlewares = [];

if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`);

    middlewares.push(logger);
}

const store = compose(applyMiddleware(...middlewares))(createStore)(rootReducer);

export default store;