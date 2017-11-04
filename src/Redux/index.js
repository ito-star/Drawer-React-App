import { combineReducers } from 'redux';

export * from './Firebase/actions';
export * from './Header/actions';
export * from './SideBar/actions';
export * from './ToolBar/actions';
export * from './Editor/actions';

import Common from './common_reducers';
import FireBaseUserReducer from './Firebase/reducers';
import HeaderStates from './Header/reducers';
import SideBarStates from './SideBar/reducers';
import ToolBarStates from './ToolBar/reducers';
import EditorStates from './Editor/reducers';


const rootReducer = combineReducers({
    common: Common,
    currentUser: FireBaseUserReducer,
    header: HeaderStates,
    sideBar: SideBarStates,
    toolBar: ToolBarStates,
    editor: EditorStates,
});

export default rootReducer;

