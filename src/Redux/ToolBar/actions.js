// / TOOLBAR ACTIONS

export const TOOLBAR_TYPE = 'TOOLBAR_TYPE'; //  Current active tool


/* -------------------- Change selected tool --------------------*/
export function toolBarType(barType) {
    return {
        type: TOOLBAR_TYPE,
        barType,
    };
}
