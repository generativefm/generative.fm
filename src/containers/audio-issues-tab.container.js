import { connect } from 'react-redux';
import AudioIssuesTabComponent from '../components/app/audio-issues-tab';

const mapStateToProps = ({ version, isUpdateAvailable, isOnline }) => ({
  version,
  isUpdateAvailable,
  isOnline,
});

export default connect(mapStateToProps)(AudioIssuesTabComponent);
