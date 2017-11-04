// / EDITOR ACTIONS

export const SET_SIZE = 'SET_SIZE';
export const SHOW_TOOLBAR = 'SHOW_TOOLBAR';
export const ADD_OBJECT = 'ADD_OBJECT';
export const UPDATE_OBJECT = 'UPDATE_OBJECT';
export const CLEAR_STATE = 'CLEAR_STATE';
export const CLEAR_TEMP = 'CLEAR_TEMP';
export const PUSH_TO_TEMP = 'PUSH_TO_TEMP';
export const POP_FROM_TEMP = 'POP_FROM_TEMP';


/* ---------------------- Set WorkSheet size --------------------- */
export function setSize(width, height) {
    return {
        type: SET_SIZE,
        width,
        height,
    };
}

/* ---------------------- Show Hide Toolbar --------------------- */
export function showToolBar(show, object = null) {
    return {
        type: SHOW_TOOLBAR,
        show,
        object,
    };
}

/* ------------------- Add new object to workSheet  */
export function addObject(type, object) {
    return {
        type: ADD_OBJECT,
        objectType: type,
        object,
    };
}

/* ---------------------- Update Object --------------------- */
export function updateObject(property, value) {
    return {
        type: UPDATE_OBJECT,
        property,
        value,
    };
}

/* ------------------- Set redux state to origin  */
export function clearState() {
    return {
        type: CLEAR_STATE,
    };
}

/* ------------------- Set temp to empty  */
export function clearTemp() {
    return {
        type: CLEAR_TEMP,
    };
}

/* ------------------- Push removed objects to temp  */
export function pushToTemp(object) {
    return {
        type: PUSH_TO_TEMP,
        object,
    };
}

/* ------------------- Pop removed objects from temp  */
export function popFromTemp() {
    return {
        type: POP_FROM_TEMP,
    };
}
