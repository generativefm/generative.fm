import { connect } from 'react-redux';
import isRecordingGenerationInProgress from '@utils/is-recording-generation-in-progress';
import MainControlsComponent from '../components/app/controls/main-controls';
import enableShuffle from '../store/actions/creators/enable-shuffle.creator';
import disableShuffle from '../store/actions/creators/disable-shuffle.creator';
import next from '../store/actions/creators/next.creator';
import previous from '../store/actions/creators/previous.creator';
import play from '../store/actions/creators/play.creator';
import stop from '../store/actions/creators/stop.creator';

const mapStateToProps = ({
  isPlaying,
  isShuffleActive,
  generatedRecordings,
  timer,
}) => ({
  isPlaying,
  isShuffleActive,
  timer,
  isRecordingGenerationInProgress: isRecordingGenerationInProgress(
    generatedRecordings
  ),
});

const mapDispatchToProps = {
  enableShuffle,
  disableShuffle,
  onPreviousClick: previous,
  onNextClick: next,
  onStopClick: stop,
  onPlayClick: play,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainControlsComponent);
