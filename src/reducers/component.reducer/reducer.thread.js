import {
    SAVE_BROWSER_NAME
} from '../../constants/index';
// import Cookies from 'universal-cookie';

const initialState = {
    browserName: ""
};





export const threadReducer = (state = initialState, action) => {

    switch(action.type) {

        case SAVE_BROWSER_NAME:
            return {
                ...state,
                browserName: action.name
            }

        default:
            return {
                ...state
            }

    }

};