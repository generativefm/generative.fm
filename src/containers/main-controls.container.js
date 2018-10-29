import { connect } from 'react-redux';
import MainControlsComponent from '../components/app/controls/main-controls';
import enableShuffle from '../store/actions/creators/enable-shuffle.creator';
import disableShuffle from '../store/actions/creators/disable-shuffle.creator';
import enableRepeat from '../store/actions/creators/enable-repeat.creator';
import disableRepeat from '../store/actions/creators/disable-repeat.creator';
import next from '../store/actions/creators/next.creator';
import previous from '../store/actions/creators/previous.creator';
import play from '../store/actions/creators/play.creator';
import stop from '../store/actions/creators/stop.creator';

const mapStateToProps = ({
  isPlaying,
  isShuffleActive,
  isRepeatActive,
  selectedPieceId,
}) => ({
  isPlaying,
  isShuffleActive,
  isRepeatActive,
  selectedPieceId,
});

const mapDispatchToProps = {
  enableShuffle,
  disableShuffle,
  enableRepeat,
  disableRepeat,
  onPreviousClick: previous,
  onNextClick: next,
  onStopClick: stop,
  onPlayClick: play,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainControlsComponent);
