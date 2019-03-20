import {
    combineReducers
} from 'redux';
import {
    homeReducer
} from './component.reducer/reducer.home';
import {
    threadReducer
} from "./component.reducer/reducer.thread";

/**
 * Rootreducer to map the reducer state with global state
 * @type {Reducer<any>}
 */
export const rootReducer = combineReducers({
    homeReducer,
    threadReducer
});