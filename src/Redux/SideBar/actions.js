// / SIDEBAR ACTIONS

export const ACTIVE_SIDEBAR = 'ACTIVE_SIDEBAR'; // Show / Hidden sideBar.
export const ACTIVE_SIDE_PANEL = 'ACTIVE_SIDE_PANEL'; // Current active panel.
export const LOAD_MORE_IMAGE = 'LOAD_MORE_IMAGE';

/* --------------------  Show or Hidden sideBar --------------------*/
export function activeSideBar(active) {
    return {
        type: ACTIVE_SUBMENU,
        active,
    };
}

/* --------------------  Change selected panel  --------------------*/
export function activeSidePanel(panel) {
    return {
        type: ACTIVE_SIDE_PANEL,
        panel,
    };
}

/* --------------------  Change selected panel  --------------------*/
export function loadMoreImage(photos) {
    return {
        type: LOAD_MORE_IMAGE,
        photos,
    };
}
