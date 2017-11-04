// / COMMON ACTIONS

export const UPDATE_ERROR_MESSAGE = 'UPDATE_ERROR_MESSAGE';

export function updateErrorMessage(message) {
    return {
        type: UPDATE_ERROR_MESSAGE,
        message,
    };
}
