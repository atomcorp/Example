import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/reducers.js';
// import {getUserData} from '../../api.js';

// Example Of Initial State {
//   coursesStatuses: {},
//   moduleProgression: {},
//   assessmentStatuses: {},
//   status: {
//     id: '',
//     isLoggedIn: false,
//     email: '',
//     error: '',
//     isLoggingIn: false,
//   },
// };

// const initialState = firebase.default.currentUser | {};

const loggerMiddleware = createLogger();

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );
  // see Hot reloading reducers is now explicit:
  // https://github.com/reactjs/react-redux/releases/tag/v2.0.0
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/reducers.js', () => {
      const nextRootReducer = require('../reducers/reducers.js').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
};

export default configureStore;
