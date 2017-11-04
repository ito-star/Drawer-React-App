import {
    UPDATE_ERROR_MESSAGE,
} from './common_actions';


export default function (state = null, action) {
    switch (action.type) {
    case UPDATE_ERROR_MESSAGE:
        return action.message;
    default:
        return state;
    }
}
