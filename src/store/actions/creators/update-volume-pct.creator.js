import UPDATE_VOLUME_PCT from '../types/update-volume-pct.type';

const updateVolumePct = pct => ({ type: UPDATE_VOLUME_PCT, payload: pct });

export default updateVolumePct;
