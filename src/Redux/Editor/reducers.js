import {
    SET_SIZE,
    SHOW_TOOLBAR,
    ADD_OBJECT,
    UPDATE_OBJECT,
    CLEAR_STATE,
    CLEAR_TEMP,
    PUSH_TO_TEMP,
    POP_FROM_TEMP,
} from './actions';


export default function (
    state = {
        width: 0,
        height: 0,
        toolBar: false,
        barType: '',
        newObject: null,
        updateObject: null,
        tempObject: null,
        tempGroup: null,
        temp: [],
    }, action) {
    const newState = Object.assign({}, state);
    switch (action.type) {
    case SET_SIZE:
        return Object.assign({}, state, { width: action.width, height: action.height });
    case SHOW_TOOLBAR:
        return Object.assign({}, state, { toolBar: action.show, object: action.object });
    case ADD_OBJECT:
        return Object.assign({}, state,
            {
                newObject: {
                    type: action.objectType,
                    data: action.object,
                },
            });
    case UPDATE_OBJECT:
        return Object.assign({}, state, { updateObject: { property: action.property, value: action.value } });
    case CLEAR_STATE:
        newState.newObject = null;
        newState.tempObject = null;
        newState.updateObject = null;
        localStorage.setItem('editor', JSON.stringify(newState));
        return newState;
    case CLEAR_TEMP:
        return Object.assign({}, state, { temp: [] });
    case PUSH_TO_TEMP:
        newState.temp.push(action.object);
        return newState;
    case POP_FROM_TEMP:
        newState.tempObject = newState.temp.pop();
        return newState;
    default:
        return newState;
    }
}
