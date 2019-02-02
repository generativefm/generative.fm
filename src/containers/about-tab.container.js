import { connect } from 'react-redux';
import AboutTabComponent from '../components/app/about-tab';

const mapStateToProps = ({ version, isUpdateAvailable }) => ({
  version,
  isUpdateAvailable,
});

export default connect(mapStateToProps)(AboutTabComponent);
