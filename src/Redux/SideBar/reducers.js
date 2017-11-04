import {
    ACTIVE_SIDEBAR,
    ACTIVE_SIDE_PANEL,
    LOAD_MORE_IMAGE,
} from './actions';


export default function (state = {
    active: false,
    panel: 'Templates',
    photos: [],
}, action) {
    switch (action.type) {
    case ACTIVE_SIDEBAR:
        return Object.assign({}, state, { active: action.active });
    case ACTIVE_SIDE_PANEL:
        return Object.assign({}, state, { panel: action.panel });
    case LOAD_MORE_IMAGE:
        return Object.assign({}, state, { photos: state.photos.concat(action.photos) });
    default:
        return state;
    }
}
