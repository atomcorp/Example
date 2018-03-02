/**
 * This holds the state of the app,
 * If data not in cache, downloads from API endpoint
 * Can update state of course progression too
 */
import { fetchEverything } from './xhr-db.js';

const buildStore = cachedState => {
  const updateState = newState => {
    state = Object.assign({}, state, newState);
  };
  const fetchState = () => {
    // TODO: check if state is already cached
    return fetchEverything().then(res => {
      state = Object.assign(
        {},
        res.reduce((acc, val) => Object.assign({}, acc, val), {})
      );
      return state;
    });
  };
  const returnStore = () => {
    return state;
  };
  let state = {};
  return {
    updateState: updateState,
    fetchState: fetchState,
    returnStore: returnStore
  }
};

export const store = buildStore();

