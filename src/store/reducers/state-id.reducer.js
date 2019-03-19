import uuid from 'uuid';

const idReducer = (state = uuid()) => state;

export default idReducer;
