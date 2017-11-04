import {
    ACTIVE_SUBMENU,
    HEADER_STYLE,
} from './actions';


export default function (state = null, action) {
    switch (action.type) {
    case ACTIVE_SUBMENU:
        return Object.assign({}, state, { active: action.active });
    case HEADER_STYLE:
        return Object.assign({}, state, { style: action.style });
    default:
        return state;
    }
}
