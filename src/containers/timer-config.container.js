import { connect } from 'react-redux';
import TimerConfigComponent from '@components/app/controls/main-controls/timer-config';
import startTimer from '@store/actions/creators/start-timer.creator';
import updateTimer from '@store/actions/creators/update-timer.creator';
import cancelTimer from '@store/actions/creators/cancel-timer.creator';

const mapStateToProps = ({ timer }) => {
  const { lastDurationsMS, remainingMS } = timer;
  return { lastDurationsMS, remainingMS };
};

export default connect(
  mapStateToProps,
  { startTimer, updateTimer, cancelTimer }
)(TimerConfigComponent);
