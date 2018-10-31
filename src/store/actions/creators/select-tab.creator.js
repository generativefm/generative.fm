import SELECT_TAB from '../types/select-tab.type';

const selectTab = tabId => ({ type: SELECT_TAB, payload: tabId });

export default selectTab;
