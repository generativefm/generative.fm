import { connect } from 'react-redux';
import VolumeComponent from '../components/app/controls/volume';
import updateVolumePct from '../store/actions/creators/update-volume-pct.creator';
import mute from '../store/actions/creators/mute.creator';
import unmute from '../store/actions/creators/unmute.creator';

const mapStateToProps = ({ volumePct, isMuted }) => ({ volumePct, isMuted });

const mapDispatchToProps = {
  mute,
  unmute,
  onChange: updateVolumePct,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VolumeComponent);
