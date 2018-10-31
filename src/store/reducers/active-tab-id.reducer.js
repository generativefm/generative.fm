import tabs from '../../components/app/tabs';
import SELECT_TAB from '../actions/types/select-tab.type';

const [DEFAULT_ACTIVE_TAB_ID] = Object.keys(tabs);

const activeTabIdReducer = (state = DEFAULT_ACTIVE_TAB_ID, action) => {
  if (action.type === SELECT_TAB) {
    return action.payload;
  }
  return state;
};

export default activeTabIdReducer;
