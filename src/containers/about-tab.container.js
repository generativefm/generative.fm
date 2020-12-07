import { connect } from 'react-redux';
import AboutTabComponent from '../components/app/about-tab';

const mapStateToProps = ({ version }) => ({
  version,
});

export default connect(mapStateToProps)(AboutTabComponent);
