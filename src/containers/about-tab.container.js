import { connect } from 'react-redux';
import AboutTabComponent from '../components/app/about-tab';

const mapStateToProps = ({ version, isUpdateAvailable, isOnline }) => ({
  version,
  isUpdateAvailable,
  isOnline,
});

export default connect(mapStateToProps)(AboutTabComponent);
