import {
    TOOLBAR_TYPE,
} from './actions';


export default function (state = null, action) {
    switch (action.type) {
    case TOOLBAR_TYPE:
        return Object.assign({}, state, { barType: action.barType });
    default:
        return state;
    }
}
