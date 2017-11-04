// / HEADER ACTIONS

export const ACTIVE_SUBMENU = 'ACTIVE_SUBMENU'; //  Show or Hidden subMenu
export const HEADER_STYLE = 'HEADER_STYLE'; //  Header style update


/* -------------------- Show or Hidden subMenu --------------------*/
export function activeSubMenu(active) {
    return {
        type: ACTIVE_SUBMENU,
        active,
    };
}

/* --------------------   Update header style   --------------------*/
export function updateHeaderStyle(style) {
    return {
        type: HEADER_STYLE,
        style,
    };
}
